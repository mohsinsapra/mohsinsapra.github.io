// Site behavior: theme toggle, mobile menu, active nav link,
// testimonial slider, contact form. Boots the Three.js background.
import { initScene } from "./scene.js";

/* ---------- Three.js background ---------- */
let sceneApi = null;
const canvas = document.getElementById("bg-canvas");
if (canvas) {
  try {
    sceneApi = initScene(canvas);
  } catch (e) {
    canvas.style.display = "none";
  }
}

/* ---------- theme toggle ---------- */
const root = document.documentElement;
document.querySelectorAll(".theme-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
    if (sceneApi) sceneApi.applyTheme(next);
  });
});

/* ---------- mobile menu ---------- */
const mobileMenu = document.querySelector(".mobile-menu");
const burger = document.querySelector(".nav__burger");
if (burger && mobileMenu) {
  burger.addEventListener("click", () => mobileMenu.classList.add("is-open"));
  mobileMenu.querySelectorAll("a, .mobile-menu__close").forEach((el) =>
    el.addEventListener("click", () => mobileMenu.classList.remove("is-open"))
  );
}

/* ---------- active nav link on scroll ---------- */
const sections = [...document.querySelectorAll("section[id], header[id]")];
const navLinks = [...document.querySelectorAll(".nav__links a")];
function highlightNav() {
  let current = "";
  for (const s of sections) {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  }
  navLinks.forEach((a) =>
    a.classList.toggle("is-active", a.getAttribute("href") === "#" + current)
  );
}
window.addEventListener("scroll", highlightNav, { passive: true });
highlightNav();

/* ---------- testimonial slider ---------- */
const track = document.querySelector(".slider__track");
if (track) {
  const slides = track.children.length;
  const dotsWrap = document.querySelector(".slider__dots");
  let index = 0;
  let timer = null;

  for (let i = 0; i < slides; i++) {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
    dot.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(dot);
  }
  const dots = [...dotsWrap.children];

  function render() {
    if (window.gsap) {
      gsap.to(track, { xPercent: -100 * index, duration: 0.7, ease: "power3.inOut" });
    } else {
      track.style.transform = "translateX(" + -100 * index + "%)";
    }
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }
  function go(i, manual) {
    index = (i + slides) % slides;
    render();
    if (manual) restart();
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 7000);
  }
  document.querySelector(".slider__btn--prev").addEventListener("click", () => go(index - 1, true));
  document.querySelector(".slider__btn--next").addEventListener("click", () => go(index + 1, true));
  go(0);
  restart();
}

/* ---------- contact form (Formspree) ---------- */
const form = document.getElementById("contact-form");
if (form) {
  const status = document.getElementById("contact-form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "sending…";
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        status.textContent = "// message sent — thanks, I'll get back to you soon_";
        form.reset();
      } else {
        status.textContent = "// something went wrong — please email me directly.";
      }
    } catch (err) {
      status.textContent = "// network error — please email me directly.";
    }
  });
}

/* ---------- footer year ---------- */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
