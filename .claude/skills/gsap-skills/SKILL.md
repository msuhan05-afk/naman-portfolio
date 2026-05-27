# GSAP — local skill notes for this project

Distilled from https://github.com/greensock/gsap-skills. Apply these in every animated component.

## Setup
- Packages: `gsap`, `@gsap/react`. `gsap.registerPlugin(useGSAP, ScrollTrigger)` at module top.
- Mark every animated component `"use client"`. Never call gsap during server render.

## useGSAP hook
- Always pass a `scope` ref so selectors are component-scoped: `useGSAP(() => {...}, { scope: ref })`.
- Cleanup is automatic — no manual `.revert()` / `.kill()` in the return.
- For event handler animations, wrap in `contextSafe` to avoid leaks.

## ScrollTrigger
- Attach to **top-level** timelines/tweens only — never on nested child tweens.
- Pick **one** of `scrub` OR `toggleActions`. Scrub for continuous, toggleActions for discrete.
- Horizontal `containerAnimation` tweens must use `ease: "none"`.
- Call `ScrollTrigger.refresh()` after dynamic content / images load.
- Use `refreshPriority` to order async-created triggers (lower = earlier on page).
- Strip `markers: true` before production.

## Lenis + ScrollTrigger sync (critical for this project)
```js
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
Without this, scrub animations drift from the actual scroll position.

## 3D rules of thumb
- Set `perspective` on the **parent**, not the animated element.
- Use `transformStyle: "preserve-3d"` on intermediate wrappers.
- Animate `rotationY`, `rotationX`, `z` via gsap props (not CSS) — gsap batches them.
- Add `force3D: true` for elements that need GPU promotion.

## Cleanup
- On SPA route changes, `ScrollTrigger.getAll().forEach(t => t.kill())` to avoid stale triggers.
