// Fixed full-page Three.js background: particle field + wireframe shapes.
// Reacts to mouse and scroll progress across the whole page.
// Disabled under prefers-reduced-motion or when WebGL is unavailable.
import * as THREE from "three";

const THEMES = {
  dark: {
    particles: 0x2fe98c,
    wire: 0x2fe98c,
    wire2: 0xffc24b,
    opacity: 0.8,
  },
  light: {
    particles: 0x0c7c4a,
    wire: 0x0c7c4a,
    wire2: 0xc47f10,
    opacity: 0.45,
  },
};

export function initScene(canvas) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 9;

  // --- particle field ---
  const COUNT = 1400;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 28;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.035,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // --- wireframe icosahedron, drifts right ---
  const icoMat = new THREE.LineBasicMaterial({ transparent: true });
  const ico = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.8, 1)),
    icoMat
  );
  ico.position.set(4.4, 0.6, -2.5);
  scene.add(ico);

  // --- torus knot, lower left ---
  const knotMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.3 });
  const knot = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.TorusKnotGeometry(1, 0.3, 64, 8)),
    knotMat
  );
  knot.position.set(-5, -2.8, -3.5);
  scene.add(knot);

  function applyTheme(name) {
    const t = THEMES[name] || THEMES.dark;
    pMat.color.setHex(t.particles);
    pMat.opacity = t.opacity;
    icoMat.color.setHex(t.wire);
    icoMat.opacity = t.opacity * 0.5;
    knotMat.color.setHex(t.wire2);
  }
  applyTheme(document.documentElement.dataset.theme);

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  const mouse = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // pause rendering when the tab is hidden
  let hidden = false;
  document.addEventListener("visibilitychange", () => {
    hidden = document.hidden;
  });

  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    if (hidden) return;
    const t = clock.getElapsedTime();
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0; // 0..1 across the page

    points.rotation.y = t * 0.02 + progress * 1.2 + mouse.x * 0.05;
    points.rotation.x = progress * 0.6 + mouse.y * 0.04;

    // hero shapes fade out as you scroll into the content
    const heroFade = Math.max(0, 1 - progress * 4);
    icoMat.opacity = 0.4 * heroFade;
    knotMat.opacity = 0.3 * heroFade;

    ico.rotation.x = t * 0.12 + progress * 2;
    ico.rotation.y = t * 0.16;
    ico.position.y = 0.6 + Math.sin(t * 0.6) * 0.25;

    knot.rotation.x = -t * 0.1;
    knot.rotation.z = t * 0.14 + progress * 1.5;

    camera.position.z = 9 - progress * 1.5;
    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  tick();

  return { applyTheme };
}
