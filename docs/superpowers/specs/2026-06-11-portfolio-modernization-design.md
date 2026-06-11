# mohsin.se — State-of-the-Art Rebuild (Three.js + GSAP)

**Date:** 2026-06-11
**Status:** Approved by Muhammad Mohsin

## Goal

Rebuild `index.html` as a modern single-page portfolio using Three.js and GSAP,
preserving all existing content. Deploys unchanged via GitHub Pages (CNAME mohsin.se).

## Decisions (user-approved)

- **Libraries:** Three.js + GSAP (ScrollTrigger), loaded from CDN. No build step.
- **Scope:** Full rebuild of index.html. jQuery/Bootstrap/Waypoints dropped from the new page.
- **Aesthetic:** Dark developer-tech default + light theme, toggle persisted in localStorage,
  respects OS preference on first visit.
- **Rollback:** old page kept as `index-old.html`. `blog.html`, `drivetest.html`, legacy assets untouched.

## Content preserved verbatim

Hero (name, title, phone, email, address, socials, avatar), summary + CV download,
both employment entries with all bullets, education, every skill with its percentage,
all 9 portfolio projects (descriptions, stacks, links, Twitter embed), 4 testimonials,
contact details + Formspree form, Clarity + GA tags, footer.

## Architecture

```
index.html                  rebuilt page (semantic HTML)
assets/css/modern.css       new stylesheet: CSS custom properties, grid, both themes
assets/js/scene.js          Three.js hero scene (ES module)
assets/js/animations.js     GSAP/ScrollTrigger animations
assets/js/main.js           nav, mobile menu, theme toggle, portfolio filter,
                            testimonial slider, contact form (fetch → Formspree)
```

## Three.js hero

Full-viewport canvas behind hero: particle field + floating wireframe geometry,
mouse parallax, scroll drift. Theme-aware colors. Guards: DPR cap (≤2),
IntersectionObserver pause when off-screen, disabled under `prefers-reduced-motion`
or missing WebGL (static gradient fallback).

## GSAP animations

Hero text stagger/typewriter on load; ScrollTrigger reveals per section; skill bars
animate 0→value on first view; parallax section titles; filter transitions;
testimonial slider (auto-advance, arrows, dots).

## Theming

CSS custom properties on `:root[data-theme]`. Toggle in nav. Three.js scene
re-colors on toggle.

## Testing

Serve locally, verify with Playwright: both themes, mobile (375px) + desktop (1440px),
filter, slider, skill bars, form markup, zero console errors.

## Revision (same day, user request)

User asked for a from-scratch structure, not a section-by-section port. Final build:
fixed full-page Three.js canvas reacting to scroll progress; Lenis smooth scrolling;
scroll progress bar; oversized uppercase hero with line-mask intro; tech marquee;
word-by-word scrub reveal of the intro paragraph; stat counters (5+ yrs, 22 ATMs,
99.9% uptime, 80% OCR reduction) derived from existing content; sticky-stacking job
cards; pinned horizontal project gallery on desktop ≥1024px (vertical cards below);
GSAP testimonial slider; gradient mega-email contact. Portfolio filter buttons were
replaced by per-card tag labels. All original content preserved.

Bug found in testing: `transition: all`/`transition: transform` on GSAP-animated
elements blocks tweens — hover lifts now use the separate `translate` property.
