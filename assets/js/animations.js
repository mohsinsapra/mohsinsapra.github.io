// GSAP + Lenis: smooth scroll, hero intro, scrub text, reveals, skill bars,
// stat counters, pinned horizontal project gallery (desktop).
// Loaded as a classic script after the gsap / ScrollTrigger / lenis CDN scripts.
(function () {
  if (typeof gsap === "undefined") return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    document.documentElement.classList.add("reduced-motion");
    document.querySelectorAll(".skill__fill").forEach(function (el) {
      el.style.width = el.dataset.value + "%";
    });
    document.querySelectorAll(".skill__value").forEach(function (el) {
      el.textContent = el.dataset.value + "%";
    });
    document.querySelectorAll(".stat__num").forEach(function (el) {
      el.textContent = el.dataset.count + (el.dataset.suffix || "");
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis smooth scrolling ---------- */
  var lenis = null;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // anchor links scroll smoothly through Lenis
  document.querySelectorAll("[data-scroll]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -64 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- scroll progress bar ---------- */
  gsap.to(".progress-bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
  });

  /* ---------- hero intro ---------- */
  var intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from(".nav", { y: -70, opacity: 0, duration: 0.7 })
    .from(".hero__kicker", { y: 24, opacity: 0, duration: 0.55 }, "-=0.25")
    .from(".hero__line .word", { yPercent: 110, duration: 0.9, stagger: 0.14 }, "-=0.3")
    .from(".hero__role", { y: 24, opacity: 0, duration: 0.55 }, "-=0.45")
    .fromTo(".hero__social a", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 }, "-=0.35")
    .from(".hero__contacts a", { y: 18, opacity: 0, duration: 0.4, stagger: 0.06 }, "-=0.3")
    .from(".hero__scroll", { opacity: 0, duration: 0.6 }, "-=0.2");

  // hero drifts up and fades as you scroll past it
  gsap.to(".hero__inner", {
    yPercent: -12,
    opacity: 0.15,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  /* ---------- scrub text: word-by-word reveal tied to scroll ---------- */
  document.querySelectorAll(".scrub-text").forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map(function (w) { return '<span class="w">' + w + "</span>"; })
      .join(" ");
    gsap.to(el.querySelectorAll(".w"), {
      opacity: 1,
      stagger: 0.06,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 78%",
        end: "bottom 45%",
        scrub: true,
      },
    });
  });

  /* ---------- generic reveals ---------- */
  gsap.utils.toArray(".gs-reveal").forEach(function (el) {
    gsap.fromTo(
      el,
      { opacity: 0, y: 44 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      }
    );
  });

  /* ---------- section titles ---------- */
  gsap.utils.toArray(".section__title").forEach(function (el) {
    gsap.from(el, {
      x: -40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  /* ---------- stat counters ---------- */
  gsap.utils.toArray(".stat__num").forEach(function (el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || "";
    var decimals = (el.dataset.count.split(".")[1] || "").length;
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: function () { el.textContent = obj.v.toFixed(decimals) + suffix; },
    });
  });

  /* ---------- skill bars + counters ---------- */
  gsap.utils.toArray(".skill__fill").forEach(function (el) {
    gsap.to(el, {
      width: el.dataset.value + "%",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });
  gsap.utils.toArray(".skill__value").forEach(function (el) {
    var target = parseInt(el.dataset.value, 10);
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: function () { el.textContent = Math.round(obj.v) + "%"; },
    });
  });

  /* ---------- projects: pinned horizontal scroll on desktop ---------- */
  var mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", function () {
    var track = document.querySelector(".projects-track");
    var pin = document.querySelector(".projects-pin");
    if (!track || !pin) return;

    function distance() {
      return Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.06);
    }

    gsap.to(track, {
      x: function () { return -distance(); },
      ease: "none",
      scrollTrigger: {
        trigger: ".section--projects",
        start: "top top",
        end: function () { return "+=" + distance(); },
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    return function () {}; // cleanup handled by matchMedia
  });

  mm.add("(max-width: 1023px)", function () {
    gsap.utils.toArray(".pcard").forEach(function (card) {
      gsap.from(card, {
        opacity: 0,
        y: 56,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });
    });
  });

  // refresh once everything (fonts, tweet embed) has settled
  window.addEventListener("load", function () {
    setTimeout(function () { ScrollTrigger.refresh(); }, 600);
  });
})();
