import { useEffect } from 'react';

export default function useEntranceAnimations() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || !Element.prototype.animate)
      return;

    const animations = new Set();
    const revealed = new WeakSet();
    const observer = new IntersectionObserver(
      (entries) => {
        if (preference.matches) return;
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          revealed.add(target);
          const animation = target.animate(
            [
              { opacity: 0.5, transform: 'translateY(12px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ],
            { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
          );
          animations.add(animation);
          animation.finished.then(
            () => animations.delete(animation),
            () => animations.delete(animation)
          );
        });
      },
      { threshold: 0.08 }
    );

    const updatePreference = () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (preference.matches) return;
      document
        .querySelectorAll(
          '.hero-text, .hero-aside, .about-section, .section-heading-row, .skill-card, .certification, .project-card, .contact-section, .site-footer'
        )
        .forEach((target) => {
          if (!revealed.has(target)) observer.observe(target);
        });
    };
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener('change', updatePreference);
    };
  }, []);
}
