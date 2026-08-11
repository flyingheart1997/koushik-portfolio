import gsap from 'gsap';
import { SolarSystemScene } from '../components/SolarSystemScene';

export type NavState = 'IDLE' | 'UNMORPHING' | 'FOCUSING' | 'HOLDING' | 'MORPHING' | 'TYPING' | 'READY';
export type CoreBriefChangeHandler = (open: boolean, planetIndex: number) => void;

export class NavigationManager {
    private readonly sceneManager: SolarSystemScene;
    private readonly onPlanetChange?: (index: number) => void;
    private readonly onCoreBriefChange?: CoreBriefChangeHandler;
    private readonly navigationState = { progress: 0 };
    private navigationTween: gsap.core.Tween | null = null;
    private targetProgress = 0;
    private currentStep = -1;
    private navState: NavState = 'IDLE';
    private coreBriefStage: 'idle' | 'open' | 'restored' = 'idle';
    private inputLocked = false;
    private wheelIntent = 0;
    private wheelResetId: number | null = null;
    private lastWheelStepAt = 0;
    private activePlanetIndex: number;
    private isDragging = false;
    private readonly pressedKeys = new Set<string>();
    private keyFrameId: number | null = null;
    private unmorphTimerId: number | null = null;
    private contentTimerId: number | null = null;
    private holdTimerId: number | null = null;
    private morphTimerId: number | null = null;

    private readonly handlePointerMove = (event: PointerEvent) => {
        const canvas = this.sceneManager.getRendererElement();
        const bounds = canvas.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        const y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
        this.sceneManager.setPointer(x, y, true);

        if (this.isDragging) {
            event.preventDefault();
            this.sceneManager.dragInteraction(event.clientX, event.clientY);
        }
    };

    private readonly handlePointerLeave = () => {
        if (this.isDragging) return;
        this.sceneManager.setPointer(10, 10, false);
    };

    private readonly handlePointerDown = (event: PointerEvent) => {
        if (event.button !== 0 && event.pointerType === 'mouse') return;

        const canvas = this.sceneManager.getRendererElement();
        const bounds = canvas.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        const y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
        this.isDragging = true;
        canvas.setPointerCapture(event.pointerId);
        this.sceneManager.beginInteraction(x, y, event.clientX, event.clientY);
    };

    private readonly handlePointerUp = (event: PointerEvent) => {
        if (!this.isDragging) return;

        const canvas = this.sceneManager.getRendererElement();
        this.isDragging = false;
        if (canvas.hasPointerCapture(event.pointerId)) {
            canvas.releasePointerCapture(event.pointerId);
        }

        const clickedPlanetIndex = this.sceneManager.endInteraction();
        if (clickedPlanetIndex === -1) return;

        // If input is locked or in middle of animation sequence, ignore click
        if (this.inputLocked || (this.navState !== 'IDLE' && this.navState !== 'READY')) {
            return;
        }

        const step = this.sceneManager.getFocusStepForPlanetIndex(clickedPlanetIndex);
        if (step !== null) {
            this.startPlanetSequence(step);
        }
    };

    private readonly handleWheel = (event: WheelEvent) => {
        event.preventDefault();

        // Lock input during animation lifecycle (UNMORPHING, FOCUSING, HOLDING, MORPHING, TYPING)
        if (this.inputLocked || (this.navState !== 'IDLE' && this.navState !== 'READY')) {
            return;
        }

        const modeMultiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : 1;
        const rawDelta = event.deltaY * modeMultiplier;
        const direction = Math.sign(rawDelta);
        if (direction === 0) return;

        this.wheelIntent += rawDelta;

        if (this.wheelResetId !== null) {
            window.clearTimeout(this.wheelResetId);
        }
        this.wheelResetId = window.setTimeout(() => {
            this.wheelIntent = 0;
            this.wheelResetId = null;
        }, 200);

        const threshold = event.ctrlKey || event.metaKey ? 45 : 120;
        if (Math.abs(this.wheelIntent) < threshold) return;

        const now = performance.now();
        if (now - this.lastWheelStepAt < 650) {
            this.wheelIntent = 0;
            return;
        }

        const stepDirection = Math.sign(this.wheelIntent);
        this.lastWheelStepAt = now;
        this.wheelIntent = 0;
        if (this.wheelResetId !== null) {
            window.clearTimeout(this.wheelResetId);
            this.wheelResetId = null;
        }

        this.navigateByDirection(stepDirection);
    };

    private navigateByDirection(stepDirection: number) {
        const lastStep = this.sceneManager.getFocusStepCount() - 1;

        // Invert direction: up scrolls forward, down scrolls backward
        stepDirection = -stepDirection;

        if (stepDirection > 0) {
            // Scroll Up / Forward
            if (this.currentStep === -1 || this.navState === 'IDLE') {
                this.startPlanetSequence(0);
            } else if (this.currentStep < lastStep) {
                this.startPlanetSequence(this.currentStep + 1);
            } else {
                // Wrap around back to solar system overview
                this.resetToOverview();
            }
        } else {
            // Scroll Down / Backward
            if (this.currentStep > 0) {
                this.startPlanetSequence(this.currentStep - 1);
            } else {
                // Back to initial landing overview
                this.resetToOverview();
            }
        }
    }

    private startPlanetSequence(targetStep: number) {
        this.clearTimers();
        this.inputLocked = true;

        const isCardOpen = this.coreBriefStage === 'open';
        const stepDistance = Math.abs(targetStep - this.currentStep);
        // Direct jump if > 2 steps away OR jumping from overview
        const isDirectJump = stepDistance > 2 || this.currentStep === -1;

        const runTravelAndMorph = () => {
            this.navState = 'FOCUSING';
            const previousStep = this.currentStep;
            this.currentStep = targetStep;

            const targetProgress = this.sceneManager.getProgressForFocusStep(targetStep);

            // Set active planet immediately for direct jumps so UI focus updates cleanly
            const targetPlanetIndex = this.sceneManager.getPlanetIndexForFocusStep(targetStep);
            if (targetPlanetIndex !== -1 && targetPlanetIndex !== this.activePlanetIndex) {
                this.activePlanetIndex = targetPlanetIndex;
                this.onPlanetChange?.(targetPlanetIndex);
            }

            // Direct jumps: faster (1.0s), Smooth sequential: slower (1.4s)
            const travelDuration = isDirectJump ? 1.0 : 1.4;

            this.setNavigationProgress(targetProgress, travelDuration, () => {
                // Camera Arrived -> Step 2: HOLDING_PLANET (1.2s Calm focus pause)
                this.navState = 'HOLDING';

                this.holdTimerId = window.setTimeout(() => {
                    // Step 3: MORPHING_TO_CARD (3D Scale Emergence Morphing ~1.3s)
                    this.navState = 'MORPHING';
                    this.sceneManager.morphPlanetToCard(targetStep, 1.3);
                    this.sceneManager.animateCoreDive(1, 1.3);

                    this.morphTimerId = window.setTimeout(() => {
                        // Step 4: TYPING_CONTENT (Real-time Typewriter & Badge Generation)
                        this.navState = 'TYPING';
                        this.openCoreBrief();
                    }, 1300);
                }, 1200);
            }, isDirectJump);
        };

        if (isCardOpen) {
            // Un-morph current card back into 3D planet sphere first (1000ms)
            this.navState = 'UNMORPHING';
            this.sceneManager.unmorphPlanetFromCard(this.activePlanetIndex, 1.0);
            this.closeCoreBrief('restored');
            this.unmorphTimerId = window.setTimeout(() => {
                runTravelAndMorph();
            }, 1000);
        } else {
            runTravelAndMorph();
        }
    }

    public onContentReady = () => {
        // Called when typewriter and badge creation finishes in SolarExplorer.tsx
        this.navState = 'READY';
        this.inputLocked = false;
    };

    private resetToOverview() {
        this.clearTimers();
        this.inputLocked = true;

        const isCardOpen = this.coreBriefStage === 'open';

        const runOverviewTravel = () => {
            this.navState = 'FOCUSING';
            this.currentStep = -1;

            if (this.activePlanetIndex !== -1) {
                this.activePlanetIndex = -1;
                this.onPlanetChange?.(-1);
            }

            // Direct jump back to overview (1.0s instead of 1.2s)
            this.setNavigationProgress(0, 1.0, () => {
                this.navState = 'IDLE';
                this.inputLocked = false;
            }, true);
        };

        if (isCardOpen) {
            this.navState = 'UNMORPHING';
            this.sceneManager.unmorphPlanetFromCard(this.activePlanetIndex, 0.6);
            this.closeCoreBrief('restored');
            this.unmorphTimerId = window.setTimeout(() => {
                runOverviewTravel();
            }, 620);
        } else {
            runOverviewTravel();
        }
    }

    private clearTimers() {
        if (this.unmorphTimerId !== null) {
            window.clearTimeout(this.unmorphTimerId);
            this.unmorphTimerId = null;
        }
        if (this.contentTimerId !== null) {
            window.clearTimeout(this.contentTimerId);
            this.contentTimerId = null;
        }
        if (this.holdTimerId !== null) {
            window.clearTimeout(this.holdTimerId);
            this.holdTimerId = null;
        }
        if (this.morphTimerId !== null) {
            window.clearTimeout(this.morphTimerId);
            this.morphTimerId = null;
        }
    }

    private readonly handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        if (!['w', 'a', 's', 'd', 'q', 'e', 'c'].includes(key)) return;

        this.pressedKeys.add(key);
        this.startKeyboardLoop();
    };

    private readonly handleKeyUp = (event: KeyboardEvent) => {
        this.pressedKeys.delete(event.key.toLowerCase());
    };

    constructor(
        sceneManager: SolarSystemScene,
        onPlanetChange?: (index: number) => void,
        onCoreBriefChange?: CoreBriefChangeHandler
    ) {
        this.sceneManager = sceneManager;
        this.onPlanetChange = onPlanetChange;
        this.onCoreBriefChange = onCoreBriefChange;
        this.activePlanetIndex = sceneManager.getActivePlanetIndex();
        this.applyProgress(0);
        this.initInteractivity();
    }

    private applyProgress(progress: number, suppressEvents = false) {
        const planetIndex = this.sceneManager.setScrollProgress(progress);

        if (!suppressEvents && planetIndex !== this.activePlanetIndex) {
            this.activePlanetIndex = planetIndex;
            this.onPlanetChange?.(planetIndex);
            if (planetIndex === -1) {
                this.closeCoreBrief('idle');
            } else {
                this.coreBriefStage = 'idle';
            }
        }
    }

    private setNavigationProgress(progress: number, duration = 1.25, onComplete?: () => void, isDirectJump = false) {
        this.targetProgress = gsap.utils.clamp(0, 1, progress);
        this.navigationTween?.kill();
        this.sceneManager.setNavigationActive(true);

        // For direct jumps > 2 steps, instantly jump to target without animating through planets
        if (isDirectJump) {
            this.navigationState.progress = this.targetProgress;
            this.applyProgress(this.targetProgress, true);

            // Then animate the camera/morph only
            this.navigationTween = gsap.to({}, {
                duration: 0.8, // Faster animation for just the morph, not the travel
                ease: 'sine.inOut',
                onComplete: () => {
                    this.navigationState.progress = this.targetProgress;
                    this.applyProgress(this.targetProgress, false);
                    this.sceneManager.setNavigationActive(false);
                    this.navigationTween = null;
                    onComplete?.();
                }
            });
        } else {
            // For adjacent planets, smooth sequential animation
            this.navigationTween = gsap.to(this.navigationState, {
                progress: this.targetProgress,
                duration,
                ease: 'sine.inOut',
                overwrite: true,
                onUpdate: () => this.applyProgress(this.navigationState.progress, false),
                onComplete: () => {
                    this.navigationState.progress = this.targetProgress;
                    this.applyProgress(this.targetProgress, false);
                    this.sceneManager.setNavigationActive(false);
                    this.navigationTween = null;
                    onComplete?.();
                }
            });
        }
    }

    private openCoreBrief() {
        if (this.coreBriefStage === 'open') return;

        this.coreBriefStage = 'open';
        this.sceneManager.animateCoreDive(1, 1.1);
        this.onCoreBriefChange?.(true, this.activePlanetIndex);

        if (this.contentTimerId !== null) {
            window.clearTimeout(this.contentTimerId);
        }
        this.contentTimerId = window.setTimeout(() => {
            this.onContentReady();
        }, 1600);
    }

    private closeCoreBrief(nextStage: 'idle' | 'restored') {
        if (this.coreBriefStage !== 'open') {
            this.coreBriefStage = nextStage;
            this.sceneManager.animateCoreDive(0, 0.6);
            return;
        }

        this.coreBriefStage = nextStage;
        this.sceneManager.animateCoreDive(0, 0.6);
        this.onCoreBriefChange?.(false, this.activePlanetIndex);
    }

    public navigateFromSurfaceScroll(deltaY: number) {
        const direction = Math.sign(deltaY);
        if (direction === 0) return;
        if (this.inputLocked || (this.navState !== 'IDLE' && this.navState !== 'READY')) return;

        this.navigateByDirection(direction);
    }

    public restoreFromSurface() {
        if (this.navState !== 'READY') return;

        this.resetToOverview();
    }

    private startKeyboardLoop() {
        if (this.keyFrameId) return;

        const tick = () => {
            if (this.pressedKeys.size === 0) {
                this.keyFrameId = null;
                return;
            }

            const orbitStep = 0.026;
            if (this.pressedKeys.has('a')) this.sceneManager.orbitBy(-orbitStep, 0);
            if (this.pressedKeys.has('d')) this.sceneManager.orbitBy(orbitStep, 0);
            if (this.pressedKeys.has('w')) this.sceneManager.orbitBy(0, -orbitStep * 0.72);
            if (this.pressedKeys.has('s')) this.sceneManager.orbitBy(0, orbitStep * 0.72);
            if (this.pressedKeys.has('q')) this.sceneManager.dolly(-0.52);
            if (this.pressedKeys.has('e')) this.sceneManager.dolly(0.52);
            if (this.pressedKeys.has('c')) {
                this.sceneManager.resetView();
                this.pressedKeys.delete('c');
            }

            this.keyFrameId = requestAnimationFrame(tick);
        };

        this.keyFrameId = requestAnimationFrame(tick);
    }

    private initInteractivity() {
        const canvas = this.sceneManager.getRendererElement();
        canvas.addEventListener('pointerdown', this.handlePointerDown);
        canvas.addEventListener('pointermove', this.handlePointerMove);
        canvas.addEventListener('pointerup', this.handlePointerUp);
        canvas.addEventListener('pointercancel', this.handlePointerUp);
        canvas.addEventListener('pointerleave', this.handlePointerLeave);
        canvas.addEventListener('wheel', this.handleWheel, { passive: false });
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    public dispose() {
        const canvas = this.sceneManager.getRendererElement();
        canvas.removeEventListener('pointerdown', this.handlePointerDown);
        canvas.removeEventListener('pointermove', this.handlePointerMove);
        canvas.removeEventListener('pointerup', this.handlePointerUp);
        canvas.removeEventListener('pointercancel', this.handlePointerUp);
        canvas.removeEventListener('pointerleave', this.handlePointerLeave);
        canvas.removeEventListener('wheel', this.handleWheel);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        if (this.keyFrameId) {
            cancelAnimationFrame(this.keyFrameId);
        }
        this.pressedKeys.clear();
        if (this.wheelResetId !== null) {
            window.clearTimeout(this.wheelResetId);
        }
        this.navigationTween?.kill();
        this.navigationTween = null;
        this.sceneManager.setNavigationActive(false);
    }
}
