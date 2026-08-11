import gsap from 'gsap';

/**
 * GSAP only ever touches header-level elements here. Every content card is a
 * motion.div (Framer Motion) which owns its own transform for hover/drag —
 * letting GSAP tween the same node fights Motion's render loop and the
 * animation either never shows or gets stomped. Cards get their entrance via
 * Motion's own initial/animate props instead (see PlanetLayouts.tsx).
 */
export class AnimationManager {
  static revealHeader(container: HTMLElement | null) {
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>('.chapterHeader, .sunHero, .sunOrbitRow');
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
    );
  }
}
