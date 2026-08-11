'use client';

import { CSSProperties, useEffect, useLayoutEffect, useRef, useState, type TouchEvent, type WheelEvent } from 'react';
import gsap from 'gsap';
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

const TypewriterText = ({
    text,
    speed = 22,
    delay = 100,
    className = ''
}: {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsStarted(false);
        setIsTyping(false);
        if (!text) return;

        let interval: NodeJS.Timeout;
        const startTimeout = setTimeout(() => {
            setIsStarted(true);
            setIsTyping(true);
            let index = 0;
            interval = setInterval(() => {
                index++;
                setDisplayedText(text.slice(0, index));
                if (index >= text.length) {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, speed);
        }, delay);

        return () => {
            clearTimeout(startTimeout);
            if (interval) clearInterval(interval);
        };
    }, [text, speed, delay]);

    if (!isStarted && displayedText.length === 0) {
        return null;
    }

    return (
        <span className={`typewriterContainer ${className}`}>
            {displayedText}
            {isTyping && <span className="typeCursor typing" aria-hidden="true">|</span>}
        </span>
    );
};

const SequentialCell = ({
    children,
    className = '',
    delay,
    style
}: {
    children: React.ReactNode;
    className?: string;
    delay: number;
    style?: CSSProperties;
}) => {
    const cellRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useLayoutEffect(() => {
        if (!isVisible || !cellRef.current) return;
        gsap.fromTo(
            cellRef.current,
            { opacity: 0, y: 14, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
        );
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <article
            ref={cellRef}
            className={`resumeCell cellActive ${className}`}
            style={style}
        >
            {children}
        </article>
    );
};

const SequentialListItem = ({
    text,
    speed = 14,
    delay
}: {
    text: string;
    speed?: number;
    delay: number;
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!isVisible) return null;

    return (
        <li className="sequentialItem">
            <TypewriterText text={text} speed={speed} delay={0} />
        </li>
    );
};

const SequentialBadge = ({
    tag,
    delay
}: {
    tag: string;
    delay: number;
}) => {
    const badgeRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useLayoutEffect(() => {
        if (!isVisible || !badgeRef.current) return;
        gsap.fromTo(
            badgeRef.current,
            { opacity: 0, scale: 0.85, y: 6 },
            { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.4)' }
        );
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <small ref={badgeRef} className="badgePopIn">
            {tag}
        </small>
    );
};

const SequentialLink = ({
    href,
    category,
    delay,
    download,
    children,
    className = 'resumeLink'
}: {
    href: string;
    category?: string;
    delay: number;
    download?: string;
    children?: React.ReactNode;
    className?: string;
}) => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useLayoutEffect(() => {
        if (!isVisible || !linkRef.current) return;
        gsap.fromTo(
            linkRef.current,
            { opacity: 0, scale: 0.9, y: 8 },
            { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <a
            ref={linkRef}
            className={className}
            href={href}
            download={download}
            target={isExternalHref(href) ? '_blank' : undefined}
            rel={isExternalHref(href) ? 'noreferrer' : undefined}
        >
            {children ?? (category ? getActionLabel(category) : 'Open Link ↗')}
        </a>
    );
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

    return (
        <div
            className={`coreBriefOverlay ${exiting ? 'exiting' : 'entering'}`}
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

                <div className="resumeBoard">
                    <header className="resumeHero">
                        <div className="resumeAvatar typeLine" aria-label="Koushik Mondal Profile" style={{ '--module-delay': '100ms' } as StyleWithVars}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/koushik.jpg" alt="Koushik Mondal" className="avatarImage" />
                        </div>
                        <div className="resumeHeading">
                            <h2 className={`typeLine ${chapterIndex === 0 ? 'singleLineTitle' : ''}`}>
                                <TypewriterText text={chapter.title} speed={24} delay={850} />
                            </h2>
                            <p className="typeLine">
                                <TypewriterText text={chapter.subtitle} speed={18} delay={850} />
                            </p>
                        </div>
                        <div className="resumeMeta typeLine">
                            <b><TypewriterText text={chapter.section} speed={18} delay={850} /></b>
                        </div>
                    </header>

                    <section className="resumeImpact typeLine">
                        <TypewriterText text={chapter.impact} speed={14} delay={850} />
                    </section>

                    <div className="resumeGrid">
                        {chapter.callouts.slice(0, 2).map((callout) => (
                            <SequentialCell
                                key={`${callout.category}-${callout.title}`}
                                delay={850}
                            >
                                <span className="resumeLabel">
                                    <TypewriterText text={callout.category} speed={16} delay={850} />
                                </span>
                                <h3>
                                    <TypewriterText text={callout.title} speed={18} delay={850} />
                                </h3>
                                <p>
                                    <TypewriterText text={callout.subtitle} speed={14} delay={850} />
                                </p>
                                <ul>
                                    {callout.highlights.map((highlight) => (
                                        <SequentialListItem
                                            key={highlight}
                                            text={highlight}
                                            speed={14}
                                            delay={850}
                                        />
                                    ))}
                                </ul>
                                <div className="resumeMiniTags" aria-label={`${callout.title} signals`}>
                                    {callout.tags.slice(0, 3).map((tag) => (
                                        <SequentialBadge
                                            key={tag}
                                            tag={tag}
                                            delay={850}
                                        />
                                    ))}
                                </div>
                                {callout.href ? (
                                    <SequentialLink
                                        href={callout.href}
                                        category={callout.category}
                                        delay={850}
                                    />
                                ) : null}
                            </SequentialCell>
                        ))}

                        {chapter.actionPanel ? (
                            <SequentialCell
                                className="resumeActionCell"
                                delay={850}
                            >
                                <span className="resumeLabel">
                                    <TypewriterText text={chapter.actionPanel.category} speed={16} delay={850} />
                                </span>
                                <h3>
                                    <TypewriterText text={chapter.actionPanel.title} speed={18} delay={850} />
                                </h3>
                                <p>
                                    <TypewriterText text={chapter.actionPanel.subtitle} speed={14} delay={850} />
                                </p>
                                <ul>
                                    {chapter.actionPanel.highlights.map((highlight) => (
                                        <SequentialListItem
                                            key={highlight}
                                            text={highlight}
                                            speed={14}
                                            delay={850}
                                        />
                                    ))}
                                </ul>
                                <SequentialLink
                                    className="resumeDownload"
                                    href={chapter.actionPanel.href}
                                    download={chapter.actionPanel.download}
                                    delay={850}
                                >
                                    {chapter.actionPanel.cta}
                                </SequentialLink>
                            </SequentialCell>
                        ) : chapter.tags.length > 0 ? (
                            <SequentialCell delay={850}>
                                <span className="resumeLabel">
                                    <TypewriterText text={chapter.stackLabel ?? 'Tech Stack'} speed={16} delay={850} />
                                </span>
                                <div className="resumeStack" aria-label={`${chapter.title} technologies`}>
                                    {chapter.tags.map((tag) => (
                                        <SequentialBadge
                                            key={tag}
                                            tag={tag}
                                            delay={850}
                                        />
                                    ))}
                                </div>
                            </SequentialCell>
                        ) : null}

                        {chapter.callouts.slice(2, 3).map(callout => (
                            <SequentialCell
                                key={`${callout.category}-${callout.title}`}
                                delay={850}
                            >
                                <span className="resumeLabel">
                                    <TypewriterText text={callout.category} speed={16} delay={850} />
                                </span>
                                <h3>
                                    <TypewriterText text={callout.title} speed={18} delay={850} />
                                </h3>
                                <p>
                                    <TypewriterText text={callout.subtitle} speed={14} delay={850} />
                                </p>
                                <ul>
                                    {callout.highlights.map((highlight) => (
                                        <SequentialListItem
                                            key={highlight}
                                            text={highlight}
                                            speed={14}
                                            delay={850}
                                        />
                                    ))}
                                </ul>
                                {callout.href ? (
                                    <SequentialLink
                                        href={callout.href}
                                        category={callout.category}
                                        delay={850}
                                    />
                                ) : null}
                            </SequentialCell>
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
