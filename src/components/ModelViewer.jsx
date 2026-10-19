import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Icon from './Icon';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import modelStats from '../data/modelStats.json';

const MODES = [
  { id: 'textured', icon: 'modeTextured', label: { es: 'Texturizado', en: 'Textured', ca: 'Texturitzat', gl: 'Texturizado' } },
  { id: 'wire', icon: 'modeWire', label: { es: 'Malla', en: 'Wireframe', ca: 'Malla', gl: 'Malla' } },
  { id: 'overlay', icon: 'modeOverlay', label: { es: 'Textura + malla', en: 'Textured + wire', ca: 'Textura + malla', gl: 'Textura + malla' } },
  { id: 'clay', icon: 'modeClay', label: { es: 'Arcilla', en: 'Clay', ca: 'Argila', gl: 'Arxila' } },
  { id: 'albedo', icon: 'modeAlbedo', label: { es: 'Color base', en: 'Base color', ca: 'Color base', gl: 'Cor base' } },
  { id: 'normal', icon: 'modeNormal', label: { es: 'Normales', en: 'Normals', ca: 'Normals', gl: 'Normais' } },
  { id: 'roughness', icon: 'modeRoughness', label: { es: 'Rugosidad', en: 'Roughness', ca: 'Rugositat', gl: 'Rugosidade' } },
  { id: 'metalness', icon: 'modeMetallic', label: { es: 'Metálico', en: 'Metallic', ca: 'Metàl·lic', gl: 'Metálico' } },
  { id: 'ao', icon: 'modeOcclusion', label: { es: 'Oclusión', en: 'Occlusion', ca: 'Oclusió', gl: 'Oclusión' } },
];

const TEXT = {
  hint: {
    es: 'Arrastra para girar. Usa la rueda o el pellizco para hacer zoom.',
    en: 'Drag to rotate. Scroll or pinch to zoom.',
    ca: 'Arrossega per girar. Fes servir la roda o el pessic per fer zoom.',
    gl: 'Arrastra para xirar. Usa a roda ou o pelizco para facer zoom.',
  },
  loading: { es: 'Cargando modelo…', en: 'Loading model…', ca: 'Carregant model…', gl: 'Cargando modelo…' },
  error: { es: 'No se ha podido cargar el modelo 3D.', en: 'The 3D model could not be loaded.', ca: 'No s\'ha pogut carregar el model 3D.', gl: 'Non se puido cargar o modelo 3D.' },
  modes: { es: 'Modos de visualización', en: 'Display modes', ca: 'Modes de visualització', gl: 'Modos de visualización' },
  tris: { es: 'triángulos', en: 'triangles', ca: 'triangles', gl: 'triángulos' },
};

// Muestra un canal de textura (o el mapa entero) sin iluminación.
function channelMaterial(map, mask, raw) {
  return new THREE.ShaderMaterial({
    uniforms: { map: { value: map }, mask: { value: new THREE.Vector3(...mask) }, raw: { value: raw ? 1 : 0 } },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: 'uniform sampler2D map; uniform vec3 mask; uniform float raw; varying vec2 vUv; void main() { vec4 t = texture2D(map, vUv); gl_FragColor = raw > 0.5 ? vec4(t.rgb, 1.0) : vec4(vec3(dot(t.rgb, mask)), 1.0); }',
  });
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function ModelViewer({ url, language }) {
  const containerRef = useRef(null);
  const apiRef = useRef(null);
  const modesRef = useRef(null);
  const [mode, setMode] = useState('textured');
  const [supported] = useState(hasWebGL);
  const [status, setStatus] = useState(supported ? 'loading' : 'error');
  const [tris, setTris] = useState(null);
  const t = (key) => TEXT[key][language] || TEXT[key].es;
  // Quads originales de Maya (no salen del GLB, que va triangulado) + triángulos reales.
  const quads = modelStats[url.split('/').pop().replace('.glb', '')]?.quads;
  const counts = [
    quads ? `${quads.toLocaleString(language)} quads` : null,
    tris ? `${tris.toLocaleString(language)} ${t('tris')}` : null,
  ].filter(Boolean).join(' · ');

  useEffect(() => {
    if (!supported) return undefined;
    const container = containerRef.current;
    let disposed = false;
    let frame = 0;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'none';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 1000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const created = []; // materiales propios que hay que liberar al salir
    const meshes = []; // un Mesh por material del modelo (puertas, lámpara…)
    const wires = [];
    const originals = new Map();
    const cache = new Map();

    // Material de cada modo para una malla concreta, con caché por malla y modo.
    const materialFor = (mesh, id) => {
      const orig = originals.get(mesh);
      const key = `${mesh.uuid}:${id}`;
      if (cache.has(key)) return cache.get(key);
      let m = orig;
      switch (id) {
        case 'wire':
          m = new THREE.MeshBasicMaterial({ color: 0x1a1a18, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
          break;
        case 'clay':
          m = new THREE.MeshStandardMaterial({ color: 0xb8b5ac, roughness: 0.85, metalness: 0 });
          break;
        case 'albedo':
          if (orig.map) m = new THREE.MeshBasicMaterial({ map: orig.map, toneMapped: false });
          break;
        case 'normal':
        case 'roughness':
        case 'metalness':
        case 'ao': {
          const spec = {
            normal: [orig.normalMap, [1, 1, 1], true],
            roughness: [orig.roughnessMap, [0, 1, 0], false],
            metalness: [orig.metalnessMap, [0, 0, 1], false],
            ao: [orig.aoMap || orig.roughnessMap, [1, 0, 0], false],
          }[id];
          if (spec[0]) m = channelMaterial(spec[0], spec[1], spec[2]);
          break;
        }
        default:
          m = orig;
      }
      if (m !== orig) created.push(m);
      cache.set(key, m);
      return m;
    };

    const applyMode = (id) => {
      const overlay = id === 'overlay';
      meshes.forEach((mesh) => {
        // En "textura + malla" el relleno se retrasa un poco para que las líneas no parpadeen.
        const orig = originals.get(mesh);
        const offset = overlay;
        if (orig.polygonOffset !== offset) { orig.polygonOffset = offset; orig.needsUpdate = true; }
        orig.polygonOffsetFactor = 1;
        orig.polygonOffsetUnits = 1;
        mesh.material = materialFor(mesh, overlay ? 'textured' : id);
      });
      wires.forEach((w) => {
        w.visible = id === 'wire' || overlay;
        w.material.opacity = overlay ? 0.6 : 1;
      });
    };
    apiRef.current = { applyMode };

    new GLTFLoader().load(
      url,
      (gltf) => {
        if (disposed) return;
        gltf.scene.traverse((o) => {
          if (o.isLine || o.isLineSegments) wires.push(o);
          else if (o.isMesh) { meshes.push(o); originals.set(o, o.material); }
        });
        wires.forEach((w) => {
          w.material = new THREE.LineBasicMaterial({ color: 0x7fc6a4, transparent: true });
          created.push(w.material);
          w.visible = false;
        });
        scene.add(gltf.scene);

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const radius = Math.max(size.x, size.y, size.z) || 1;
        const dist = (radius / (2 * Math.tan((camera.fov * Math.PI) / 360))) * 1.2;
        camera.position.copy(center).add(new THREE.Vector3(0.8, 0.5, 1).normalize().multiplyScalar(dist));
        camera.near = radius / 100;
        camera.far = radius * 100;
        camera.updateProjectionMatrix();
        controls.target.copy(center);
        controls.minDistance = radius * 0.3;
        controls.maxDistance = radius * 6;
        controls.update();

        const total = meshes.reduce((sum, m) => {
          const g = m.geometry;
          return sum + (g.index ? g.index.count : g.attributes.position.count) / 3;
        }, 0);
        if (total) setTris(Math.round(total));
        setStatus('ready');
        applyMode(apiRef.current.pending || 'textured');
      },
      undefined,
      () => { if (!disposed) setStatus('error'); },
    );

    const loop = () => {
      frame = requestAnimationFrame(loop);
      controls.update();
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => {
          if (!m) return;
          Object.values(m).forEach((v) => { if (v && v.isTexture) v.dispose(); });
          m.dispose();
        });
      });
      originals.forEach((m) => {
        Object.values(m).forEach((v) => { if (v && v.isTexture) v.dispose(); });
        m.dispose();
      });
      created.forEach((m) => m.dispose());
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      apiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, supported]);

  useEffect(() => {
    const row = modesRef.current;
    const btn = row?.querySelector(`[data-mode="${mode}"]`);
    if (!row || !btn || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: btn.offsetLeft - (row.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' });
  }, [mode, status]);

  useEffect(() => {
    if (!apiRef.current) return;
    apiRef.current.pending = mode;
    if (status === 'ready') apiRef.current.applyMode(mode);
  }, [mode, status]);

  return (
    <div className="w-full h-full max-w-5xl flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
      <div className="relative flex-1 min-h-0">
        <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

        {status === 'loading' && (
          <p className="absolute inset-0 flex items-center justify-center text-white/70 text-sm pointer-events-none">{t('loading')}</p>
        )}
        {status === 'error' && (
          <p className="absolute inset-0 flex items-center justify-center text-white/70 text-sm px-6 text-center">{t('error')}</p>
        )}
        {status === 'ready' && (
          <p className="absolute top-0 left-0 right-0 text-center text-white/45 text-[0.65rem] sm:text-xs pointer-events-none">
            {t('hint')}{counts ? ` ${counts}.` : ''}
          </p>
        )}
      </div>

      {status === 'ready' && (
        <div
          ref={modesRef}
          role="toolbar"
          aria-label={t('modes')}
          className="relative shrink-0 flex sm:flex-wrap sm:justify-center gap-1.5 overflow-x-auto sm:overflow-visible no-scrollbar -mx-1 px-1"
        >
          {MODES.map((m) => {
            const active = mode === m.id;
            const text = m.label[language] || m.label.es;
            return (
              <button
                key={m.id}
                type="button"
                data-mode={m.id}
                onClick={() => setMode(m.id)}
                aria-label={text}
                aria-pressed={active}
                title={text}
                className={`shrink-0 inline-flex items-center justify-center gap-2 h-10 min-w-10 px-2.5 sm:px-3 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wide border transition-colors ${
                  active ? 'bg-white text-black border-white' : 'bg-black/40 text-white/80 border-white/30 hover:border-white hover:text-white'
                }`}
              >
                <Icon name={m.icon} size={16} strokeWidth={2} className="shrink-0" />
                <span className={active ? '' : 'hidden sm:inline'}>{text}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
