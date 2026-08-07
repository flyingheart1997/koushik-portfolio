'use client';

import { CSSProperties, useEffect, useRef, useState, type TouchEvent, type WheelEvent } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { SolarSystemScene } from './SolarSystemScene';
import { NavigationManager } from '../services/NavigationManager';
import { PORTFOLIO_MISSION_DATA, PortfolioMissionChapter } from '../data/PortfolioMissionData';

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

const formatMissionIndex = (index: number) => `0${index + 1}`.slice(-2);

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

const getActionLabel = (category: string) => {
    const normalizedCategory = category.toLowerCase();
    if (normalizedCategory.includes('email')) return 'Send Email ✉️';
    if (normalizedCategory.includes('linkedin')) return 'LinkedIn Profile ↗';
    if (normalizedCategory.includes('github')) return 'GitHub Profile ↗';
    if (normalizedCategory.includes('website') || normalizedCategory.includes('company') || normalizedCategory.includes('product') || normalizedCategory.includes('geminus')) return 'Visit Website ↗';
    return 'Open Link ↗';
};

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

const getSurfaceScroller = (surface: HTMLElement) => surface.querySelector<HTMLElement>('.resumeGrid');

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
    onSurfaceRestore
}: {
    chapter: PortfolioMissionChapter;
    chapterIndex: number;
    exiting: boolean;
    onSurfaceNavigate: (deltaY: number) => void;
    onSurfaceRestore: () => void;
}) => {
    const touchStateRef = useRef({
        startY: 0,
        startedAtTop: true,
        startedAtBottom: true
    });
    const wheelBoundaryRef = useRef({
        direction: 0,
        lastWheelAt: 0,
        armed: false
    });

    const handleSurfaceWheel = (event: WheelEvent<HTMLElement>) => {
        const modeMultiplier = event.deltaMode === 1 ? 16 : 1;
        const deltaY = event.deltaY * modeMultiplier;
        if (deltaY === 0) return;

        const scroller = getSurfaceScroller(event.currentTarget);
        const { canScroll, atTop, atBottom } = getScrollState(scroller);
        const movingDown = deltaY > 0;
        const shouldNavigate = !canScroll || (movingDown && atBottom) || (!movingDown && atTop);
        const now = performance.now();
        const direction = Math.sign(deltaY);
        const wheelGap = now - wheelBoundaryRef.current.lastWheelAt;

        if (!shouldNavigate) {
            wheelBoundaryRef.current = {
                direction: 0,
                lastWheelAt: now,
                armed: false
            };
            event.stopPropagation();
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const isSeparateGesture = wheelBoundaryRef.current.armed
            && wheelBoundaryRef.current.direction === direction
            && wheelGap > 280;

        if (!isSeparateGesture) {
            wheelBoundaryRef.current = {
                direction,
                lastWheelAt: now,
                armed: true
            };
            return;
        }

        wheelBoundaryRef.current = {
            direction: 0,
            lastWheelAt: now,
            armed: false
        };
        onSurfaceNavigate(deltaY);
    };

    const handleSurfaceTouchStart = (event: TouchEvent<HTMLElement>) => {
        const touch = event.touches[0];
        if (!touch) return;

        const scroller = getSurfaceScroller(event.currentTarget);
        const { atTop, atBottom } = getScrollState(scroller);
        touchStateRef.current = {
            startY: touch.clientY,
            startedAtTop: atTop,
            startedAtBottom: atBottom
        };
    };

    const handleSurfaceTouchEnd = (event: TouchEvent<HTMLElement>) => {
        const touch = event.changedTouches[0];
        if (!touch) return;

        const deltaY = touchStateRef.current.startY - touch.clientY;
        if (Math.abs(deltaY) < 46) return;

        const movingDown = deltaY > 0;
        const scroller = getSurfaceScroller(event.currentTarget);
        const { canScroll, atTop, atBottom } = getScrollState(scroller);
        const shouldNavigate = !canScroll
            || (movingDown && atBottom && touchStateRef.current.startedAtBottom)
            || (!movingDown && atTop && touchStateRef.current.startedAtTop);

        if (shouldNavigate) {
            onSurfaceNavigate(deltaY);
        }
    };

    const handleOverlayPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.closest('.flatSurface')) return;

        event.preventDefault();
        event.stopPropagation();
        onSurfaceRestore();
    };

    return (
        <div
            className={`coreBriefOverlay ${exiting ? 'exiting' : 'entering'}`}
            style={getSurfaceStyle(chapterIndex)}
            onPointerDown={handleOverlayPointerDown}
        >
            <div className="surfaceVignette" />

            <section
                className="flatSurface"
                aria-label={`${chapter.section} flat planet surface`}
                onWheel={handleSurfaceWheel}
                onTouchStart={handleSurfaceTouchStart}
                onTouchEnd={handleSurfaceTouchEnd}
            >
                <div className="surfaceTexture" aria-hidden="true" />
                <div className="surfaceScan" aria-hidden="true" />

                <div className="resumeBoard">
                    <header className="resumeHero">
                        <div className="resumeAvatar typeLine" aria-label="Koushik Mondal Profile">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/koushik.jpg" alt="Koushik Mondal" className="avatarImage" />
                        </div>
                        <div className="resumeHeading">
                            <h2 className={`typeLine ${chapterIndex === 0 ? 'singleLineTitle' : ''}`}>{chapter.title}</h2>
                            <p className="typeLine">{chapter.subtitle}</p>
                        </div>
                        <div className="resumeMeta typeLine">
                            <span className="statusBadge"><span className="statusDot" /> Open to Opportunities</span>
                            <span>{chapterIndex === 0 ? 'Pune, India' : `Mission ${formatMissionIndex(chapterIndex)}`}</span>
                            <b>{chapter.section}</b>
                        </div>
                    </header>

                    <section className="resumeImpact typeLine" style={{ '--text-delay': '760ms' } as StyleWithVars}>
                        {chapter.impact}
                    </section>

                    <div className="resumeGrid">
                        {chapter.callouts.slice(0, 2).map((callout, index) => (
                            <article
                                className="resumeCell"
                                key={`${callout.category}-${callout.title}`}
                                style={{ '--module-delay': `${940 + index * 120}ms` } as StyleWithVars}
                            >
                                <span className="resumeLabel">{callout.category}</span>
                                <h3>{callout.title}</h3>
                                <p>{callout.subtitle}</p>
                                <ul>
                                    {callout.highlights.map(highlight => (
                                        <li key={highlight}>{highlight}</li>
                                    ))}
                                </ul>
                                <div className="resumeMiniTags" aria-label={`${callout.title} signals`}>
                                    {callout.tags.slice(0, 3).map((tag, tagIndex) => (
                                        <small
                                            key={tag}
                                            style={{
                                                '--pill-delay': `${1210 + index * 120 + tagIndex * 82}ms`
                                            } as StyleWithVars}
                                        >
                                            {tag}
                                        </small>
                                    ))}
                                </div>
                                {callout.href ? (
                                    <a
                                        className="resumeLink"
                                        href={callout.href}
                                        target={isExternalHref(callout.href) ? '_blank' : undefined}
                                        rel={isExternalHref(callout.href) ? 'noreferrer' : undefined}
                                    >
                                        {getActionLabel(callout.category)}
                                    </a>
                                ) : null}
                            </article>
                        ))}

                        {chapter.actionPanel ? (
                            <article
                                className="resumeCell resumeActionCell"
                                style={{ '--module-delay': '1180ms' } as StyleWithVars}
                            >
                                <span className="resumeLabel">{chapter.actionPanel.category}</span>
                                <h3>{chapter.actionPanel.title}</h3>
                                <p>{chapter.actionPanel.subtitle}</p>
                                <ul>
                                    {chapter.actionPanel.highlights.map(highlight => (
                                        <li key={highlight}>{highlight}</li>
                                    ))}
                                </ul>
                                <a
                                    className="resumeDownload"
                                    href={chapter.actionPanel.href}
                                    download={chapter.actionPanel.download}
                                >
                                    {chapter.actionPanel.cta}
                                </a>
                            </article>
                        ) : chapter.tags.length > 0 ? (
                            <article
                                className="resumeCell"
                                style={{ '--module-delay': '1180ms' } as StyleWithVars}
                            >
                                <span className="resumeLabel">{chapter.stackLabel ?? 'Tech Stack'}</span>
                                <div className="resumeStack" aria-label={`${chapter.title} technologies`}>
                                    {chapter.tags.map((tag, tagIndex) => (
                                        <small
                                            key={tag}
                                            style={{
                                                '--pill-delay': `${1410 + tagIndex * 58}ms`
                                            } as StyleWithVars}
                                        >
                                            {tag}
                                        </small>
                                    ))}
                                </div>
                            </article>
                        ) : null}

                        {chapter.callouts.slice(2, 3).map(callout => (
                            <article
                                className="resumeCell"
                                key={`${callout.category}-${callout.title}`}
                                style={{ '--module-delay': '1300ms' } as StyleWithVars}
                            >
                                <span className="resumeLabel">{callout.category}</span>
                                <h3>{callout.title}</h3>
                                <p>{callout.subtitle}</p>
                                <ul>
                                    {callout.highlights.map(highlight => (
                                        <li key={highlight}>{highlight}</li>
                                    ))}
                                </ul>
                                {callout.href ? (
                                    <a
                                        className="resumeLink"
                                        href={callout.href}
                                        target={isExternalHref(callout.href) ? '_blank' : undefined}
                                        rel={isExternalHref(callout.href) ? 'noreferrer' : undefined}
                                    >
                                        {getActionLabel(callout.category)}
                                    </a>
                                ) : null}
                            </article>
                        ))}
                    </div>
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
            (open, planetIndex) => {
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

    return (
        <div className="explorerWrapper">
            <div
                ref={containerRef}
                className="threeCanvasViewport"
            />

            {coreBrief.render ? (
                <CoreBrief
                    chapter={activeChapter}
                    chapterIndex={coreBrief.index}
                    exiting={coreBrief.exiting}
                    onSurfaceNavigate={handleSurfaceNavigate}
                    onSurfaceRestore={handleSurfaceRestore}
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
                    <span className="hintText">Zoom to flatten surface</span>
                    <span className="hintLine right" />
                </div>
            ) : null}
        </div>
    );
};
