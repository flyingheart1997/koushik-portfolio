'use client';

import { CSSProperties, useState } from 'react';
import { motion } from 'motion/react';
import { PortfolioCallout, PortfolioMissionChapter } from '../data/PortfolioMissionData';

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

const getActionLabel = (href: string) => {
    if (href.startsWith('mailto:')) return 'Send Email ✉️';
    if (href.includes('linkedin.com')) return 'LinkedIn Profile ↗';
    if (href.includes('github.com')) return 'GitHub Profile ↗';
    if (isExternalHref(href)) return 'Visit Website ↗';
    return 'Open Link ↗';
};

const cardIn = (index: number) => ({
    initial: { opacity: 0, y: 22, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 12, scale: 0.97 },
    transition: { delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
});

const LinkButton = ({
    href,
    children,
    download,
    className = 'ctaButton'
}: {
    href: string;
    children: React.ReactNode;
    download?: string;
    className?: string;
}) => (
    <a
        className={className}
        href={href}
        download={download}
        target={isExternalHref(href) ? '_blank' : undefined}
        rel={isExternalHref(href) ? 'noreferrer' : undefined}
    >
        {children}
    </a>
);

const CheckList = ({ items }: { items: string[] }) => (
    <ul className="checkList">
        {items.map((item) => (
            <li key={item}>{item}</li>
        ))}
    </ul>
);

// Shared header used by every planet except the Sun (which is its own hero).
const ChapterHeader = ({
    chapter,
    featured = false,
    action
}: {
    chapter: PortfolioMissionChapter;
    featured?: boolean;
    action?: React.ReactNode;
}) => (
    <header className="chapterHeader">
        <div className="chapterHeaderText">
            <span className="chapterEyebrow">{chapter.section}</span>
            <h2 className="chapterTitle">{chapter.title}</h2>
            <p className="chapterSubtitle">{chapter.subtitle}</p>
        </div>
        <div className="chapterHeaderActions">
            {featured ? <span className="chapterBadge">Featured Project</span> : null}
            {action}
        </div>
    </header>
);

// Sticky note — shared by Jupiter (tape), Saturn (folded corner) and Neptune
// (pin), each visually distinct but all sharing the same idle left-right
// sway that pauses the moment you hover or drag it. Color always comes from
// the current planet's own --surface-accent, never a fixed hue.
const NOTE_ROTATIONS = [-2, 1.6, -1, 2.2];

const StickyNote = ({
    index,
    variant = 'pin',
    drag = false,
    wide = false,
    children
}: {
    index: number;
    variant?: 'pin' | 'tape' | 'fold' | 'curl';
    drag?: boolean;
    wide?: boolean;
    children: React.ReactNode;
}) => {
    const baseRotation = NOTE_ROTATIONS[index % NOTE_ROTATIONS.length];
    const delay = index * 0.07;

    return (
        <motion.article
            className={`stickyCard sticky-${variant} planetBlock ${drag ? 'draggable' : ''} ${wide ? 'wide' : ''}`}
            drag={drag}
            dragElastic={drag ? 0.18 : undefined}
            dragMomentum={drag ? false : undefined}
            initial={{ opacity: 0, y: 26, scale: 0.94, rotate: baseRotation }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: baseRotation + 1.6 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            whileHover={{ y: -6, rotate: 0, transition: { duration: 0.25 } }}
            whileDrag={drag ? { scale: 1.06, rotate: 0, boxShadow: '0 24px 60px rgba(0,0,0,0.5)', zIndex: 20 } : undefined}
            transition={{
                opacity: { delay, duration: 0.5 },
                y: { delay, duration: 0.5 },
                scale: { delay, duration: 0.5 },
                rotate: { delay: delay + 0.5, duration: 2.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
            }}
        >
            <span className="stickyTexture" aria-hidden="true" />
            {variant !== 'tape' ? <span className="stickyPin" /> : null}
            {variant === 'tape' ? <span className="stickyTape" /> : null}
            {children}
        </motion.article>
    );
};

// ===================== SUN — Signal Beacon =====================
export const SunLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = chapter.callouts[activeIndex];

    return (
        <div className="sunScene">
            <div className="sunHero">
                <div className="sunAvatarRing">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/koushik.jpg" alt="Koushik Mondal" className="sunAvatarImg" />
                </div>
                <div className="sunHeroText">
                    <h1 className="sunName">{chapter.title}</h1>
                    <p className="sunTagline">{chapter.subtitle}</p>
                </div>
            </div>

            <nav className="sunOrbitRow" aria-label="Profile facets">
                {chapter.callouts.map((callout, index) => (
                    <button
                        key={callout.title}
                        type="button"
                        className={`sunOrbitTab ${index === activeIndex ? 'active' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                    >
                        <span className="sunOrbitIndex">{`0${index + 1}`}</span>
                        {callout.category}
                    </button>
                ))}
            </nav>

            <div className="sunStage planetScroll">
                {active ? (
                    <div className="sunStageCard" key={active.title}>
                        <div className="sunStageHead">
                            <h3>{active.title}</h3>
                            {active.href ? (
                                <LinkButton href={active.href}>{getActionLabel(active.href)}</LinkButton>
                            ) : null}
                        </div>
                        <p>{active.subtitle}</p>
                        <CheckList items={active.highlights} />
                    </div>
                ) : null}

                {chapter.tags.length > 0 ? (
                    <div className="sunStackRow">
                        <span className="sunStackLabel">{chapter.stackLabel ?? 'Stack'}</span>
                        <div className="sunStackChips">
                            {chapter.tags.map((tag) => (
                                <span key={tag} className="sunStackChip">{tag}</span>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

// ===================== MERCURY — Blueprint Ledger =====================
const LEGEND_PALETTE = ['#7dd3fc', '#fca5a5', '#86efac', '#fde68a', '#c4b5fd', '#f9a8d4', '#93c5fd', '#fdba74'];

export const MercuryLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => {
    const [lead, ...rest] = chapter.callouts;

    return (
        <div className="mercuryBlueprint">
            <ChapterHeader chapter={chapter} />
            <div className="mercuryBody planetScroll">
                {lead ? (
                    <motion.article className="mercuryLead planetBlock" {...cardIn(0)}>
                        <span className="mercurySpec">01</span>
                        <span className="chipLabel">{lead.category}</span>
                        <h3>{lead.title}</h3>
                        <p>{lead.subtitle}</p>
                        <CheckList items={lead.highlights} />
                    </motion.article>
                ) : null}

                <div className="mercuryStack">
                    {rest.map((callout, index) => (
                        <motion.div
                            key={callout.title}
                            className="mercurySchemaRow planetBlock"
                            {...cardIn(index + 1)}
                        >
                            <span className="mercurySpecInline">{`0${index + 2}`}</span>
                            <div className="mercurySchemaText">
                                <span className="chipLabel">{callout.category}</span>
                                <h3>{callout.title}</h3>
                                <p>{callout.subtitle}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {chapter.tags.length > 0 ? (
                <div className="mercuryLegend">
                    {chapter.tags.map((tag, index) => (
                        <span
                            key={tag}
                            className="mercuryLegendChip"
                            style={{ '--chip-color': LEGEND_PALETTE[index % LEGEND_PALETTE.length] } as CSSProperties}
                        >
                            <i />
                            {tag}
                        </span>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

// ===================== VENUS — Telemetry Console =====================
export const VenusLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => (
    <div className="venusConsole">
        <ChapterHeader chapter={chapter} />
        <div className="venusBody planetScroll">
            {chapter.callouts.map((callout, index) => (
                <motion.article
                    key={callout.title}
                    className="venusRow planetBlock"
                    whileHover={{ x: 6 }}
                    {...cardIn(index)}
                >
                    <span className="venusSignalTag">{`SIG-0${index + 1}`}</span>
                    <div className="venusRowContent">
                        <span className="chipLabel">{callout.category}</span>
                        <h3>{callout.title}</h3>
                        <p>{callout.subtitle}</p>
                        <CheckList items={callout.highlights} />
                    </div>
                </motion.article>
            ))}
        </div>

        {chapter.tags.length > 0 ? (
            <div className="venusFooter">
                {chapter.tags.map((tag) => (
                    <span key={tag} className="venusFooterChip">{`[${tag}]`}</span>
                ))}
            </div>
        ) : null}
    </div>
);

const EarthCurveRight = () => (
    <div className="earthCurveWrap">
        <svg viewBox="0 0 160 120" preserveAspectRatio="none" className="earthCurveSvg">
            <circle cx="100" cy="60" r="45" fill="color-mix(in srgb, var(--surface-accent), transparent 90%)" />
            <path
                d="M 0 12 H 100 A 48 48 0 0 1 100 108 H 0"
                stroke="color-mix(in srgb, var(--surface-accent), white 40%)"
                strokeWidth="2.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
            />
            {/* Center 20px White Pin */}
            <circle cx="100" cy="60" r="10" fill="#ffffff" stroke="color-mix(in srgb, var(--surface-accent), white 50%)" strokeWidth="2.5" />
            <circle cx="100" cy="60" r="4" fill="color-mix(in srgb, var(--surface-accent), black 30%)" />

            <circle cx="5" cy="12" r="4.5" fill="#0d0f12" stroke="color-mix(in srgb, var(--surface-accent), white 60%)" strokeWidth="2" />
            <circle cx="5" cy="108" r="4.5" fill="#0d0f12" stroke="color-mix(in srgb, var(--surface-accent), white 60%)" strokeWidth="2" />
        </svg>
    </div>
);

const EarthCurveLeft = () => (
    <div className="earthCurveWrap">
        <svg viewBox="0 0 160 120" preserveAspectRatio="none" className="earthCurveSvg">
            <circle cx="60" cy="60" r="45" fill="color-mix(in srgb, var(--surface-accent), transparent 90%)" />
            <path
                d="M 160 12 H 60 A 48 48 0 0 0 60 108 H 160"
                stroke="color-mix(in srgb, var(--surface-accent), white 40%)"
                strokeWidth="2.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
            />
            {/* Center 20px White Pin */}
            <circle cx="60" cy="60" r="10" fill="#ffffff" stroke="color-mix(in srgb, var(--surface-accent), white 50%)" strokeWidth="2.5" />
            <circle cx="60" cy="60" r="4" fill="color-mix(in srgb, var(--surface-accent), black 30%)" />

            <circle cx="155" cy="12" r="4.5" fill="#0d0f12" stroke="color-mix(in srgb, var(--surface-accent), white 60%)" strokeWidth="2" />
            <circle cx="155" cy="108" r="4.5" fill="#0d0f12" stroke="color-mix(in srgb, var(--surface-accent), white 60%)" strokeWidth="2" />
        </svg>
    </div>
);

// ===================== EARTH — Mission Timeline =====================
export const EarthLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => (
    <div className="earthTimeline">
        <ChapterHeader chapter={chapter} />
        <div className="earthBody planetScroll">
            <div className="earthSnakeContainer">
                {chapter.callouts.map((callout, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            key={callout.title}
                            className={`earthSnakeRow ${isEven ? 'rowLeft' : 'rowRight'}`}
                            {...cardIn(index)}
                        >
                            {isEven ? (
                                <>
                                    <div className="earthCardBox">
                                        <div className="earthCardInner">
                                            <span className="chipLabel">{callout.category}</span>
                                            <h3>{callout.title}</h3>
                                            <p className="earthSubtitle">{callout.subtitle}</p>
                                            <CheckList items={callout.highlights} />
                                            {callout.href ? (
                                                <LinkButton href={callout.href} className="ctaButton subtle">
                                                    {getActionLabel(callout.href)}
                                                </LinkButton>
                                            ) : null}
                                        </div>
                                    </div>
                                    <EarthCurveRight />
                                </>
                            ) : (
                                <>
                                    <EarthCurveLeft />
                                    <div className="earthCardBox">
                                        <div className="earthCardInner">
                                            <span className="chipLabel">{callout.category}</span>
                                            <h3>{callout.title}</h3>
                                            <p className="earthSubtitle">{callout.subtitle}</p>
                                            <CheckList items={callout.highlights} />
                                            {callout.href ? (
                                                <LinkButton href={callout.href} className="ctaButton subtle">
                                                    {getActionLabel(callout.href)}
                                                </LinkButton>
                                            ) : null}
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </div>
);

// ===================== MARS — Command Deck (Featured) =====================
export const MarsLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => (
    <div className="marsDeck">
        <ChapterHeader chapter={chapter} featured />

        {chapter.tags.length > 0 ? (
            <div className="marsTagStrip">
                {chapter.tags.map((tag) => (
                    <span key={tag} className="marsTagChip">{tag}</span>
                ))}
            </div>
        ) : null}

        <div className="marsBody stickyField planetScroll">
            {chapter.callouts.map((callout, index) => (
                <StickyNote key={callout.title} index={index} variant="curl" wide={index === 0}>
                    <span className="chipLabel">{callout.category}</span>
                    <h3>{callout.title}</h3>
                    <p>{callout.subtitle}</p>
                    <CheckList items={callout.highlights.slice(0, 2)} />
                </StickyNote>
            ))}
        </div>
    </div>
);

// ===================== JUPITER — Mission Notes (Featured) =====================
export const JupiterLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => {
    const primary = chapter.callouts.find((c) => c.href);

    return (
        <div className="jupiterRail">
            <ChapterHeader
                chapter={chapter}
                featured
                action={primary ? <LinkButton href={primary.href!} className="ctaButton compact">Visit Live ↗</LinkButton> : null}
            />

            <div className="jupiterBody stickyField planetScroll">
                {chapter.callouts.map((callout, index) => (
                    <StickyNote key={callout.title} index={index} variant="tape">
                        <span className="chipLabel">{callout.category}</span>
                        <h3>{callout.title}</h3>
                        <p>{callout.subtitle}</p>
                        <CheckList items={callout.highlights} />
                    </StickyNote>
                ))}
            </div>
        </div>
    );
};

// ===================== SATURN — Site Notes =====================
export const SaturnLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => (
    <div className="saturnShowcase">
        <ChapterHeader chapter={chapter} />
        <div className="saturnBody stickyField planetScroll">
            {chapter.callouts.map((callout, index) => (
                <StickyNote key={callout.title} index={index} variant="fold">
                    <span className="chipLabel">{callout.category}</span>
                    <h3>{callout.title}</h3>
                    <p>{callout.subtitle}</p>
                    {callout.href ? (
                        <LinkButton href={callout.href} className="ctaButton stamp">Visit Site ↗</LinkButton>
                    ) : (
                        <CheckList items={callout.highlights} />
                    )}
                </StickyNote>
            ))}
        </div>
    </div>
);

// ===================== URANUS — Skill Ledger =====================
export const UranusLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => (
    <div className="uranusMatrix">
        <ChapterHeader chapter={chapter} />
        <div className="uranusBody planetScroll">
            {chapter.callouts.map((callout, index) => {
                const clusterTags = chapter.tags.slice(index * 2, index * 2 + 2);

                return (
                    <motion.article
                        key={callout.title}
                        className="uranusPanel planetBlock"
                        {...cardIn(index)}
                    >
                        <span className="uranusGhostNum">{`0${index + 1}`}</span>
                        <span className="chipLabel">{callout.category}</span>
                        <h3>{callout.title}</h3>
                        <p>{callout.subtitle}</p>
                        <ul className="uranusPointList">
                            {callout.highlights.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        {clusterTags.length > 0 ? (
                            <p className="uranusTagLine">{clusterTags.join('  ·  ')}</p>
                        ) : null}
                    </motion.article>
                );
            })}
        </div>
    </div>
);

export const NeptuneLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => {
    const allItems = [
        ...chapter.callouts,
        ...(chapter.actionPanel ? [chapter.actionPanel] : [])
    ];

    return (
        <div className="neptuneBoard">
            <ChapterHeader chapter={chapter} />
            <div className="neptuneBody planetScroll">
                <div className="earthSnakeContainer">
                    {allItems.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const href = item.href ?? '#';
                        const cta = 'cta' in item && item.cta ? item.cta : (item.href ? getActionLabel(item.href) : 'Open Link ↗');
                        const download = 'download' in item ? item.download : undefined;

                        return (
                            <motion.div
                                key={item.title}
                                className={`earthSnakeRow ${isEven ? 'rowLeft' : 'rowRight'}`}
                                {...cardIn(index)}
                            >
                                {isEven ? (
                                    <>
                                        <div className="earthCardBox">
                                            <div className="earthCardInner">
                                                <span className="chipLabel">{item.category}</span>
                                                <h3>{item.title}</h3>
                                                <p className="earthSubtitle">{item.subtitle}</p>
                                                {'highlights' in item && item.highlights ? (
                                                    <CheckList items={item.highlights} />
                                                ) : null}
                                                <LinkButton href={href} download={download} className="ctaButton stamp">
                                                    {cta}
                                                </LinkButton>
                                            </div>
                                        </div>
                                        <EarthCurveRight />
                                    </>
                                ) : (
                                    <>
                                        <EarthCurveLeft />
                                        <div className="earthCardBox">
                                            <div className="earthCardInner">
                                                <span className="chipLabel">{item.category}</span>
                                                <h3>{item.title}</h3>
                                                <p className="earthSubtitle">{item.subtitle}</p>
                                                {'highlights' in item && item.highlights ? (
                                                    <CheckList items={item.highlights} />
                                                ) : null}
                                                <LinkButton href={href} download={download} className="ctaButton stamp">
                                                    {cta}
                                                </LinkButton>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const LAYOUTS = [
    SunLayout,
    MercuryLayout,
    VenusLayout,
    EarthLayout,
    MarsLayout,
    JupiterLayout,
    SaturnLayout,
    UranusLayout,
    NeptuneLayout
];

export const PlanetLayoutRouter = ({
    chapter,
    chapterIndex
}: {
    chapter: PortfolioMissionChapter;
    chapterIndex: number;
}) => {
    const Layout = LAYOUTS[chapterIndex] ?? SunLayout;
    return <Layout chapter={chapter} />;
};
