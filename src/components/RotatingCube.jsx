import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// Cubo CSS 3D de solo aristas; una cara lleva la foto. La rotación la lleva un
// bucle de animación con tres fuentes, de más a menos prioritaria:
//   1. el dedo o el ratón al arrastrar (con inercia al soltar);
//   2. el giroscopio, si el dispositivo lo entrega sin pedir ningún permiso;
//   3. el giro lento automático (que se pausa con el ratón encima).
// Sin sensor (escritorio, iPhone sin permiso) simplemente no se usa el giroscopio.
export default function RotatingCube({ photo, to, label, className = '' }) {
  const sceneRef = useRef(null);
  const cubeRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const cube = cubeRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let yaw = -25;
    let userPitch = 0;
    let vYaw = 0;
    let vPitch = 0;
    let tiltYaw = 0;
    let tiltPitch = 0;
    let targetTiltYaw = 0;
    let targetTiltPitch = 0;
    let base = null;
    let tracking = null;
    let dragging = false;
    let justDragged = false;
    let hovering = false;
    let lastInteraction = -1e9;
    let visible = true;
    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible) { last = now; return; }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!dragging) {
        yaw += vYaw * dt;
        userPitch = clamp(userPitch + vPitch * dt, -60, 60);
        const decay = 0.04 ** dt;
        vYaw *= decay;
        vPitch *= decay;
      }
      const idle = now - lastInteraction > 1500;
      if (!reduceMotion && !dragging && !hovering && idle) yaw += 15 * dt; // 360° cada 24 s

      const k = Math.min(1, dt * 8);
      tiltYaw += (targetTiltYaw - tiltYaw) * k;
      tiltPitch += (targetTiltPitch - tiltPitch) * k;

      const sway = reduceMotion ? 0 : 7 * Math.sin((now / 1000) * ((2 * Math.PI) / 18));
      const pitch = clamp(-15 + sway + userPitch + tiltPitch, -75, 45);
      cube.style.transform = `rotateX(${pitch.toFixed(2)}deg) rotateY(${(yaw + tiltYaw).toFixed(2)}deg)`;
    };
    raf = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(scene);

    // ── Arrastre (ratón y táctil) ──────────────────────────────────────────
    const onDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      tracking = { x: e.clientX, y: e.clientY, moved: 0, time: performance.now() };
      vYaw = 0;
      vPitch = 0;
    };
    const onMove = (e) => {
      if (!tracking) return;
      const dx = e.clientX - tracking.x;
      const dy = e.clientY - tracking.y;
      tracking.x = e.clientX;
      tracking.y = e.clientY;
      tracking.moved += Math.abs(dx) + Math.abs(dy);
      if (tracking.moved > 6) dragging = true;
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max((now - tracking.time) / 1000, 0.008);
      tracking.time = now;
      lastInteraction = now;
      yaw += dx * 0.6;
      vYaw = clamp((dx * 0.6) / dt, -400, 400);
      // En táctil el gesto vertical queda para el scroll de la página (touch-action: pan-y).
      if (e.pointerType === 'mouse') {
        // Arrastrar hacia abajo acerca la cara superior al espectador (rotateX negativo).
        userPitch = clamp(userPitch - dy * 0.4, -60, 60);
        vPitch = clamp((-dy * 0.4) / dt, -300, 300);
      }
    };
    const onUp = () => {
      if (!tracking) return;
      if (dragging) {
        justDragged = true;
        setTimeout(() => { justDragged = false; }, 0);
      }
      tracking = null;
      dragging = false;
      lastInteraction = performance.now();
    };
    // Tras arrastrar no se debe seguir el enlace: un toque corto sí.
    const onClickCapture = (e) => {
      if (justDragged) { e.preventDefault(); e.stopPropagation(); }
    };
    const onEnter = (e) => { if (e.pointerType === 'mouse') hovering = true; };
    const onLeave = () => { hovering = false; };

    scene.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    scene.addEventListener('click', onClickCapture, true);
    scene.addEventListener('pointerenter', onEnter);
    scene.addEventListener('pointerleave', onLeave);

    // ── Giroscopio: solo si el navegador lo entrega sin pedir permiso ─────
    // En iOS el evento no llega hasta que se concede un permiso que aquí no se pide,
    // así que simplemente nunca se activa. Chrome de escritorio lanza un evento con
    // valores vacíos: se ignora.
    const onOrientation = (e) => {
      if (reduceMotion || e.beta == null || e.gamma == null) return;
      if (!base) base = { beta: e.beta, gamma: e.gamma };
      // La referencia se recoloca despacio: al cambiar de postura, el cubo se recentra.
      base.beta += (e.beta - base.beta) * 0.004;
      base.gamma += (e.gamma - base.gamma) * 0.004;
      targetTiltYaw = clamp((e.gamma - base.gamma) * 1.6, -150, 150);
      targetTiltPitch = clamp((e.beta - base.beta) * 0.6, -45, 45);
    };
    if ('DeviceOrientationEvent' in window) window.addEventListener('deviceorientation', onOrientation);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      scene.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      scene.removeEventListener('click', onClickCapture, true);
      scene.removeEventListener('pointerenter', onEnter);
      scene.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('deviceorientation', onOrientation);
    };
  }, []);

  return (
    <Link ref={sceneRef} to={to} aria-label={label} title={label} draggable={false} className={`cube-scene block shrink-0 ${className}`}>
      <div className="cube-tilt">
        <div className="cube" ref={cubeRef}>
          <div className="cube-face cube-front">
            <img src={photo} alt="" draggable={false} className="w-full h-full object-cover" />
          </div>
          <div className="cube-face cube-right" />
          <div className="cube-face cube-back" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </div>
      </div>
    </Link>
  );
}
