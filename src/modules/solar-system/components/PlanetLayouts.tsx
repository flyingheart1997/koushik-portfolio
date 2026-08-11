'use client';

import { CSSProperties, useState } from 'react';
import { motion } from 'motion/react';
import { PortfolioCallout, PortfolioMissionChapter } from '../data/PortfolioMissionData';

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

const MailIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="btnSvgIcon">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const ExternalIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="btnSvgIcon">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const getActionContent = (href: string, customLabel?: string) => {
    const isMail = href.startsWith('mailto:');
    let labelText = customLabel;

    if (!labelText) {
        if (isMail) labelText = 'Send Email';
        else if (href.includes('linkedin.com')) labelText = 'LinkedIn Profile';
        else if (href.includes('github.com')) labelText = 'GitHub Profile';
        else if (isExternalHref(href)) labelText = 'Visit Website';
        else labelText = 'Open Link';
    } else {
        labelText = labelText.replace(/[✉️↗]/g, '').trim();
    }

    return (
        <>
            <span className="btnLabel">{labelText}</span>
            {isMail ? <MailIcon /> : <ExternalIcon />}
        </>
    );
};

const BASE_DELAY = 0.35;

const cardIn = (index: number) => ({
    initial: { opacity: 0, y: 32, scale: 0.94 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 16, scale: 0.95 },
    transition: { delay: BASE_DELAY + index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
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
    <motion.ul
        className="checkList"
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.07, delayChildren: BASE_DELAY + 0.1 }
            }
        }}
    >
        {items.map((item) => (
            <motion.li
                key={item}
                variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } }
                }}
            >
                {item}
            </motion.li>
        ))}
    </motion.ul>
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
    <motion.header
        className="chapterHeader"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
        <div className="chapterHeaderText">
            <motion.span
                className="chapterEyebrow"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22, duration: 0.4 }}
            >
                {chapter.section}
            </motion.span>
            <motion.h2
                className="chapterTitle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.45 }}
            >
                {chapter.title}
            </motion.h2>
            <motion.p
                className="chapterSubtitle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.45 }}
            >
                {chapter.subtitle}
            </motion.p>
        </div>
        {featured || action ? (
            <motion.div
                className="chapterHeaderActions"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.36, duration: 0.4 }}
            >
                {featured ? <span className="chapterBadge">Featured Project</span> : null}
                {action}
            </motion.div>
        ) : null}
    </motion.header>
);

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
    const delay = BASE_DELAY + index * 0.12;

    return (
        <motion.article
            className={`stickyCard sticky-${variant} planetBlock ${drag ? 'draggable' : ''} ${wide ? 'wide' : ''}`}
            drag={drag}
            dragElastic={drag ? 0.18 : undefined}
            dragMomentum={drag ? false : undefined}
            initial={{ opacity: 0, y: 36, scale: 0.9, rotate: baseRotation - 4 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: [baseRotation - 4, baseRotation + 2, baseRotation]
            }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            whileHover={{ y: -8, scale: 1.02, rotate: 0, transition: { duration: 0.25 } }}
            whileDrag={drag ? { scale: 1.06, rotate: 0, boxShadow: '0 24px 60px rgba(0,0,0,0.5)', zIndex: 20 } : undefined}
            transition={{
                opacity: { delay, duration: 0.5 },
                y: { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                scale: { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                rotate: { delay: delay + 0.05, duration: 0.65, ease: [0.16, 1, 0.3, 1] }
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
            <motion.div
                className="sunHero"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    className="sunAvatarRing"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.55, delay: 0.25, type: 'spring', stiffness: 200, damping: 15 }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/koushik.jpg" alt="Koushik Mondal" className="sunAvatarImg" />
                </motion.div>
                <div className="sunHeroText">
                    <motion.h1
                        className="sunName"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.28, duration: 0.45 }}
                    >
                        {chapter.title}
                    </motion.h1>
                    <motion.p
                        className="sunTagline"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.32, duration: 0.45 }}
                    >
                        {chapter.subtitle}
                    </motion.p>
                </div>
            </motion.div>

            <motion.nav
                className="sunOrbitRow"
                aria-label="Profile facets"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.32 } }
                }}
            >
                {chapter.callouts.map((callout, index) => (
                    <motion.button
                        key={callout.title}
                        type="button"
                        className={`sunOrbitTab ${index === activeIndex ? 'active' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                        }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span className="sunOrbitIndex">{`0${index + 1}`}</span>
                        {callout.category}
                    </motion.button>
                ))}
            </motion.nav>

            <div className="sunStage planetScroll">
                {active ? (
                    <motion.div
                        className="sunStageCard"
                        key={active.title}
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.38, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="sunStageHead">
                            <h3>{active.title}</h3>
                            {active.href ? (
                                <LinkButton href={active.href}>{getActionContent(active.href)}</LinkButton>
                            ) : null}
                        </div>
                        <p>{active.subtitle}</p>
                        <CheckList items={active.highlights} />
                    </motion.div>
                ) : null}

                {chapter.tags.length > 0 ? (
                    <motion.div
                        className="sunStackRow"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <span className="sunStackLabel">{chapter.stackLabel ?? 'Stack'}</span>
                        <div className="sunStackChips">
                            {chapter.tags.map((tag, idx) => (
                                <motion.span
                                    key={tag}
                                    className="sunStackChip"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.45 + idx * 0.04, duration: 0.3 }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ) : null}
            </div>
        </div>
    );
};

// ===================== MERCURY — Blueprint Ledger =====================
const LEGEND_PALETTE = ['#7dd3fc', '#fca5a5', '#86efac', '#fde68a', '#c4b5fd', '#f9a8d4', '#93c5fd', '#fdba74'];

export const MercuryLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => {
    const [card1, card2, card3] = chapter.callouts;

    return (
        <div className="mercuryBlueprint">
            <ChapterHeader chapter={chapter} />
            <div className="mercuryBody planetScroll">
                {card1 ? (
                    <motion.article className="mercuryLead planetBlock" {...cardIn(0)}>
                        <span className="mercurySpec">01</span>
                        <span className="chipLabel">{card1.category}</span>
                        <h3>{card1.title}</h3>
                        <p>{card1.subtitle}</p>
                        <CheckList items={card1.highlights} />
                    </motion.article>
                ) : null}

                <div className="mercuryStack">
                    {card2 ? (
                        <motion.div className="mercurySchemaRow planetBlock" {...cardIn(1)}>
                            <span className="mercurySpecInline">02</span>
                            <div className="mercurySchemaText">
                                <span className="chipLabel">{card2.category}</span>
                                <h3>{card2.title}</h3>
                                <p>{card2.subtitle}</p>
                                <CheckList items={card2.highlights} />
                            </div>
                        </motion.div>
                    ) : null}

                    {card3 ? (
                        <motion.article className="mercuryDashedCard planetBlock" {...cardIn(2)}>
                            <span className="mercurySpec">03</span>
                            <span className="chipLabel">{card3.category}</span>
                            <h3>{card3.title}</h3>
                            <p>{card3.subtitle}</p>
                            <CheckList items={card3.highlights} />
                        </motion.article>
                    ) : null}
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

const EarthCurveRight = ({ index }: { index: number }) => (
    <div className="earthCurveWrap">
        <svg viewBox="0 0 160 120" preserveAspectRatio="none" className="earthCurveSvg">
            <motion.circle
                cx="100"
                cy="60"
                r="45"
                fill="color-mix(in srgb, var(--surface-accent), transparent 90%)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.05, duration: 0.5, type: 'spring', stiffness: 180, damping: 16 }}
            />
            <motion.path
                d="M 0 12 H 100 A 48 48 0 0 1 100 108 H 0"
                stroke="color-mix(in srgb, var(--surface-accent), white 40%)"
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.1, duration: 0.7, ease: 'easeInOut' }}
            />
            {/* Center 20px White Pin */}
            <motion.circle
                cx="100"
                cy="60"
                r="10"
                fill="#ffffff"
                stroke="color-mix(in srgb, var(--surface-accent), white 50%)"
                strokeWidth="2.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.35, type: 'spring', stiffness: 260, damping: 16 }}
            />
            <motion.circle
                cx="100"
                cy="60"
                r="4"
                fill="color-mix(in srgb, var(--surface-accent), black 30%)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.4, duration: 0.3 }}
            />

            <motion.circle
                cx="5"
                cy="12"
                r="4.5"
                fill="#0d0f12"
                stroke="color-mix(in srgb, var(--surface-accent), white 60%)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.15, duration: 0.3 }}
            />
            <motion.circle
                cx="5"
                cy="108"
                r="4.5"
                fill="#0d0f12"
                stroke="color-mix(in srgb, var(--surface-accent), white 60%)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.55, duration: 0.3 }}
            />
        </svg>
    </div>
);

const EarthCurveLeft = ({ index }: { index: number }) => (
    <div className="earthCurveWrap">
        <svg viewBox="0 0 160 120" preserveAspectRatio="none" className="earthCurveSvg">
            <motion.circle
                cx="60"
                cy="60"
                r="45"
                fill="color-mix(in srgb, var(--surface-accent), transparent 90%)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.05, duration: 0.5, type: 'spring', stiffness: 180, damping: 16 }}
            />
            <motion.path
                d="M 160 12 H 60 A 48 48 0 0 0 60 108 H 160"
                stroke="color-mix(in srgb, var(--surface-accent), white 40%)"
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.1, duration: 0.7, ease: 'easeInOut' }}
            />
            {/* Center 20px White Pin */}
            <motion.circle
                cx="60"
                cy="60"
                r="10"
                fill="#ffffff"
                stroke="color-mix(in srgb, var(--surface-accent), white 50%)"
                strokeWidth="2.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.35, type: 'spring', stiffness: 260, damping: 16 }}
            />
            <motion.circle
                cx="60"
                cy="60"
                r="4"
                fill="color-mix(in srgb, var(--surface-accent), black 30%)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.4, duration: 0.3 }}
            />

            <motion.circle
                cx="155"
                cy="12"
                r="4.5"
                fill="#0d0f12"
                stroke="color-mix(in srgb, var(--surface-accent), white 60%)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.15, duration: 0.3 }}
            />
            <motion.circle
                cx="155"
                cy="108"
                r="4.5"
                fill="#0d0f12"
                stroke="color-mix(in srgb, var(--surface-accent), white 60%)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: BASE_DELAY + index * 0.12 + 0.55, duration: 0.3 }}
            />
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
                                                    {getActionContent(callout.href)}
                                                </LinkButton>
                                            ) : null}
                                        </div>
                                    </div>
                                    <EarthCurveRight index={index} />
                                </>
                            ) : (
                                <>
                                    <EarthCurveLeft index={index} />
                                    <div className="earthCardBox">
                                        <div className="earthCardInner">
                                            <span className="chipLabel">{callout.category}</span>
                                            <h3>{callout.title}</h3>
                                            <p className="earthSubtitle">{callout.subtitle}</p>
                                            <CheckList items={callout.highlights} />
                                            {callout.href ? (
                                                <LinkButton href={callout.href} className="ctaButton subtle">
                                                    {getActionContent(callout.href)}
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

export const SaturnLayout = ({ chapter }: { chapter: PortfolioMissionChapter }) => (
    <div className="saturnShowcase">
        <ChapterHeader chapter={chapter} />
        <div className="saturnBody stickyField planetScroll">
            {chapter.callouts.map((callout, index) => (
                <StickyNote key={callout.title} index={index} variant="fold">
                    <span className="chipLabel">{callout.category}</span>
                    <h3>{callout.title}</h3>
                    <p>{callout.subtitle}</p>
                    <CheckList items={callout.highlights} />
                    {callout.href ? (
                        <LinkButton href={callout.href} className="ctaButton stamp">
                            {getActionContent(callout.href, 'Visit Site')}
                        </LinkButton>
                    ) : null}
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
                        const ctaLabel = 'cta' in item && item.cta ? item.cta : undefined;
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
                                                    {getActionContent(href, ctaLabel)}
                                                </LinkButton>
                                            </div>
                                        </div>
                                        <EarthCurveRight index={index} />
                                    </>
                                ) : (
                                    <>
                                        <EarthCurveLeft index={index} />
                                        <div className="earthCardBox">
                                            <div className="earthCardInner">
                                                <span className="chipLabel">{item.category}</span>
                                                <h3>{item.title}</h3>
                                                <p className="earthSubtitle">{item.subtitle}</p>
                                                {'highlights' in item && item.highlights ? (
                                                    <CheckList items={item.highlights} />
                                                ) : null}
                                                <LinkButton href={href} download={download} className="ctaButton stamp">
                                                    {getActionContent(href, ctaLabel)}
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
