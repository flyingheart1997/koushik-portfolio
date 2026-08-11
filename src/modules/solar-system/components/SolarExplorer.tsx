'use client';

import { CSSProperties, useEffect, useLayoutEffect, useRef, useState, type TouchEvent, type WheelEvent } from 'react';
import gsap from 'gsap';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { SolarSystemScene } from './SolarSystemScene';
import { NavigationManager } from '../services/NavigationManager';
import { PORTFOLIO_MISSION_DATA, PortfolioMissionChapter } from '../data/PortfolioMissionData';
import { AnimationManager } from '../services/AnimationManager';
import { PlanetLayoutRouter } from './PlanetLayouts';

type StyleWithVars = CSSProperties & Record<`--${string}`, string | number>;

const SURFACE_THEMES = [
    ['#ffcf62', '#ff7b1a', '#281004', '#ffd58a', 'rgba(255, 126, 24, 0.34)'],
    ['#c8d2db', '#626b75', '#10151b', '#8fd2ff', 'rgba(139, 198, 255, 0.22)'],
    ['#ffd08a', '#b96f24', '#170d05', '#ffe0a8', 'rgba(255, 160, 62, 0.25)'],
    ['#7dc9ff', '#1166bb', '#02172f', '#42f1d2', 'rgba(64, 170, 255, 0.28)'],
    ['#ff9b58', '#a13b20', '#1b0705', '#ffc08a', 'rgba(255, 101, 54, 0.24)'],
    ['#f1d29b', '#9c7441', '#171008', '#f7d288', 'rgba(255, 204, 132, 0.22)'],
    ['#dbc89e', '#7d6843', '#14120c', '#ffe3a6', 'rgba(236, 210, 154, 0.24)'],
    ['#a6ecff', '#5d96aa', '#06181f', '#bff7ff', 'rgba(126, 226, 255, 0.22)'],
    ['#4f8dff', '#092f9b', '#010b2c', '#44e3ff', 'rgba(64, 120, 255, 0.3)']
] as const;

const getSurfaceStyle = (index: number) => {
    const theme = SURFACE_THEMES[index] ?? SURFACE_THEMES[0];

    return {
        '--surface-core': theme[0],
        '--surface-mid': theme[1],
        '--surface-edge': theme[2],
        '--surface-accent': theme[3],
        '--surface-glow': theme[4]
    } as StyleWithVars;
};

const getSurfaceScroller = (surface: HTMLElement) => surface.querySelector<HTMLElement>('.planetScroll');

const getScrollState = (scroller: HTMLElement | null) => {
    if (!scroller) {
        return {
            canScroll: false,
            atTop: true,
            atBottom: true
        };
    }

    const canScroll = scroller.scrollHeight > scroller.clientHeight + 2;

    return {
        canScroll,
        atTop: scroller.scrollTop <= 2,
        atBottom: scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2
    };
};

const CoreBrief = ({
    chapter,
    chapterIndex,
    exiting,
    onSurfaceNavigate,
    onSurfaceRestore,
    onContentReady
}: {
    chapter: PortfolioMissionChapter;
    chapterIndex: number;
    exiting: boolean;
    onSurfaceNavigate: (deltaY: number) => void;
    onSurfaceRestore: () => void;
    onContentReady?: () => void;
}) => {
    const surfaceRef = useRef<HTMLElement>(null);
    const vignetteRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!surfaceRef.current) return;

        const ctx = gsap.context(() => {
            if (exiting) {
                const tl = gsap.timeline();
                tl.to(surfaceRef.current, {
                    opacity: 0,
                    scale: 0,
                    rotateX: 18,
                    y: 16,
                    filter: 'blur(4px)',
                    duration: 0.5,
                    ease: 'power2.in'
                });
                if (vignetteRef.current) {
                    tl.to(vignetteRef.current, { opacity: 0, duration: 0.4 }, 0);
                }
                return;
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    onContentReady?.();
                }
            });

            if (vignetteRef.current) {
                tl.fromTo(vignetteRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0);
            }

            tl.fromTo(
                surfaceRef.current,
                {
                    opacity: 0,
                    scale: 0,
                    y: 14,
                    filter: 'blur(6px)'
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.7,
                    ease: 'power3.out'
                },
                0.2
            );
        });

        return () => ctx.revert();
    }, [chapterIndex, exiting, onContentReady]);

    useEffect(() => {
        if (exiting || !surfaceRef.current) return;

        const timer = setTimeout(() => {
            AnimationManager.revealHeader(surfaceRef.current);
        }, 700);

        return () => clearTimeout(timer);
    }, [chapterIndex, exiting]);

    const handleSurfaceWheel = (event: WheelEvent<HTMLElement>) => {
        const modeMultiplier = event.deltaMode === 1 ? 16 : 1;
        const deltaY = event.deltaY * modeMultiplier;
        if (Math.abs(deltaY) < 32) return;

        const now = performance.now();
        if (now - wheelBoundaryRef.current.lastWheelAt < 500) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        wheelBoundaryRef.current.lastWheelAt = now;
        onSurfaceNavigate(deltaY);
    };

    const handleSurfaceTouchStart = (event: TouchEvent<HTMLElement>) => {
        const touch = event.touches[0];
        if (!touch) return;

        const scroller = getSurfaceScroller(event.currentTarget);
        const { atTop, atBottom } = getScrollState(scroller);
        touchStateRef.current = {
            startY: touch.clientY,
            atTop,
            atBottom
        };
    };

    const handleSurfaceTouchEnd = (event: TouchEvent<HTMLElement>) => {
        const touch = event.changedTouches[0];
        if (!touch) return;

        const deltaY = touchStateRef.current.startY - touch.clientY;
        if (Math.abs(deltaY) < 40) return;

        const movingDown = deltaY > 0;
        const { atTop, atBottom } = touchStateRef.current;
        if ((movingDown && atBottom) || (!movingDown && atTop)) {
            onSurfaceNavigate(deltaY);
        }
    };

    const wheelBoundaryRef = useRef({
        lastWheelAt: 0
    });
    const touchStateRef = useRef({
        startY: 0,
        atTop: true,
        atBottom: true
    });

    const handleOverlayPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.closest('.flatSurface')) return;

        event.preventDefault();
        event.stopPropagation();
        onSurfaceRestore();
    };

    const layoutClasses = ['coreBriefOverlay', exiting ? 'exiting' : 'entering'].join(' ');

    return (
        <div
            className={layoutClasses}
            style={getSurfaceStyle(chapterIndex)}
            onPointerDown={handleOverlayPointerDown}
            onWheel={handleSurfaceWheel}
        >
            <div className="surfaceVignette" ref={vignetteRef} />

            <section
                ref={surfaceRef}
                className="flatSurface"
                aria-label={`${chapter.section} flat planet surface`}
                onWheel={handleSurfaceWheel}
                onTouchStart={handleSurfaceTouchStart}
                onTouchEnd={handleSurfaceTouchEnd}
            >
                <div className="surfaceTexture" aria-hidden="true" />
                <div className="surfaceScan" aria-hidden="true" />

                <div className="planetSurfaceBoard">
                    <PlanetLayoutRouter key={chapterIndex} chapter={chapter} chapterIndex={chapterIndex} />
                </div>
            </section>

            <div className="coreHint" aria-hidden="true">
                <span />
                <b>Zoom to restore globe</b>
                <span />
            </div>
        </div>
    );
};

export const SolarExplorer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<SolarSystemScene | null>(null);
    const navRef = useRef<NavigationManager | null>(null);
    const coreCloseTimerRef = useRef(0);
    const [activePlanetIndex, setActivePlanetIndex] = useState(-1);
    const [, setHoveredPlanetIndex] = useState<number | null>(null);
    const [isSceneReady, setIsSceneReady] = useState(false);
    const [coreBrief, setCoreBrief] = useState({
        render: false,
        exiting: false,
        index: 0
    });

    const activeChapter = PORTFOLIO_MISSION_DATA[coreBrief.index] ?? PORTFOLIO_MISSION_DATA[0];

    const handleSurfaceNavigate = (deltaY: number) => {
        const nav = navRef.current;
        if (!nav) return;

        if (typeof nav.navigateFromSurfaceScroll === 'function') {
            nav.navigateFromSurfaceScroll(deltaY);
            return;
        }

        const legacyNav = nav as unknown as {
            navigateByStep?: (direction: number) => void;
        };
        legacyNav.navigateByStep?.(-Math.sign(deltaY));
    };

    const handleSurfaceRestore = () => {
        const nav = navRef.current;
        if (!nav) return;

        if (typeof nav.restoreFromSurface === 'function') {
            nav.restoreFromSurface();
        }
    };


    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new SolarSystemScene(containerRef.current, setHoveredPlanetIndex);
        sceneRef.current = scene;
        scene.start();
        const readyFrame = window.requestAnimationFrame(() => {
            setIsSceneReady(true);
        });

        const nav = new NavigationManager(
            scene,
            setActivePlanetIndex,
            (open: boolean, planetIndex: number) => {
                window.clearTimeout(coreCloseTimerRef.current);

                if (open) {
                    setCoreBrief({
                        render: true,
                        exiting: false,
                        index: Math.max(planetIndex, 0)
                    });
                    return;
                }

                setCoreBrief(previous => {
                    if (!previous.render) return previous;
                    return { ...previous, exiting: true };
                });

                coreCloseTimerRef.current = window.setTimeout(() => {
                    setCoreBrief(previous => ({
                        ...previous,
                        render: false,
                        exiting: false
                    }));
                }, 620);
            }
        );
        navRef.current = nav;

        return () => {
            window.cancelAnimationFrame(readyFrame);
            window.clearTimeout(coreCloseTimerRef.current);
            scene.dispose();
            nav.dispose();
            sceneRef.current = null;
            navRef.current = null;
            setHoveredPlanetIndex(null);
            setIsSceneReady(false);
        };
    }, []);

    useLayoutEffect(() => {
        if (!isSceneReady || !containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                containerRef.current,
                {
                    scale: 0.2,
                    opacity: 0,
                    filter: 'blur(8px)'
                },
                {
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.4,
                    ease: 'power3.out',
                    clearProps: 'transform,filter'
                }
            );

            const hintEl = document.querySelector('.exploreHint');
            if (hintEl) {
                gsap.fromTo(
                    hintEl,
                    { opacity: 0, y: 24, scale: 0.85 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.6, ease: 'power2.out' }
                );
            }
        });

        return () => ctx.revert();
    }, [isSceneReady]);

    return (
        <div className="explorerWrapper">
            <div
                ref={containerRef}
                className="threeCanvasViewport"
                style={{
                    opacity: isSceneReady ? undefined : 0,
                    transform: isSceneReady ? undefined : 'scale(0.2)'
                }}
            />

            {coreBrief.render ? (
                <CoreBrief
                    chapter={activeChapter}
                    chapterIndex={coreBrief.index}
                    exiting={coreBrief.exiting}
                    onSurfaceNavigate={handleSurfaceNavigate}
                    onSurfaceRestore={handleSurfaceRestore}
                    onContentReady={() => navRef.current?.onContentReady()}
                    key={`${coreBrief.index}-${coreBrief.exiting ? 'out' : 'in'}`}
                />
            ) : null}

            {isSceneReady && !coreBrief.render && activePlanetIndex < 0 ? (
                <div className="exploreHint" aria-hidden="true">
                    <span className="hintLine left" />
                    <span className="hintText">Zoom to explore</span>
                    <span className="hintLine right" />
                </div>
            ) : null}

            {isSceneReady && !coreBrief.render && activePlanetIndex >= 0 ? (
                <div className="exploreHint focused" aria-hidden="true">
                    <span className="hintLine left" />
                    <span className="hintText">Zoom to explore content</span>
                    <span className="hintLine right" />
                </div>
            ) : null}
        </div>
    );
};
