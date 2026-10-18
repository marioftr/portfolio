import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const MODES = [
  { id: 'textured', label: { es: 'Texturizado', en: 'Textured', ca: 'Texturitzat', gl: 'Texturizado' } },
  { id: 'wire', label: { es: 'Malla', en: 'Wireframe', ca: 'Malla', gl: 'Malla' } },
  { id: 'clay', label: { es: 'Arcilla', en: 'Clay', ca: 'Argila', gl: 'Arxila' } },
  { id: 'albedo', label: { es: 'Color base', en: 'Base color', ca: 'Color base', gl: 'Cor base' } },
  { id: 'normal', label: { es: 'Normales', en: 'Normals', ca: 'Normals', gl: 'Normais' } },
  { id: 'roughness', label: { es: 'Rugosidad', en: 'Roughness', ca: 'Rugositat', gl: 'Rugosidade' } },
  { id: 'metalness', label: { es: 'Metálico', en: 'Metallic', ca: 'Metàl·lic', gl: 'Metálico' } },
  { id: 'ao', label: { es: 'Oclusión', en: 'Occlusion', ca: 'Oclusió', gl: 'Oclusión' } },
];

const TEXT = {
  hint: {
    es: 'Arrastra para girar · rueda o pellizco para acercar',
    en: 'Drag to rotate · scroll or pinch to zoom',
    ca: 'Arrossega per girar · roda o pessic per apropar',
    gl: 'Arrastra para xirar · roda ou pelizco para achegar',
  },
  loading: { es: 'Cargando modelo…', en: 'Loading model…', ca: 'Carregant model…', gl: 'Cargando modelo…' },
  error: { es: 'No se ha podido cargar el modelo 3D.', en: 'The 3D model could not be loaded.', ca: 'No s\'ha pogut carregar el model 3D.', gl: 'Non se puido cargar o modelo 3D.' },
  tris: { es: 'tris', en: 'tris', ca: 'tris', gl: 'tris' },
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
  const [mode, setMode] = useState('textured');
  const [supported] = useState(hasWebGL);
  const [status, setStatus] = useState(supported ? 'loading' : 'error');
  const [tris, setTris] = useState(null);
  const t = (key) => TEXT[key][language] || TEXT[key].es;

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
    let mesh = null;
    let wire = null;
    let original = null;

    const applyMode = (id) => {
      if (!mesh) return;
      const orig = original;
      if (wire) wire.visible = id === 'wire';
      switch (id) {
        case 'wire': {
          const m = new THREE.MeshBasicMaterial({ color: 0x1a1a18, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
          created.push(m);
          mesh.material = m;
          break;
        }
        case 'clay': {
          const m = new THREE.MeshStandardMaterial({ color: 0xb8b5ac, roughness: 0.85, metalness: 0 });
          created.push(m);
          mesh.material = m;
          break;
        }
        case 'albedo': {
          const m = new THREE.MeshBasicMaterial({ map: orig.map, toneMapped: false });
          created.push(m);
          mesh.material = m;
          break;
        }
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
          if (!spec[0]) { mesh.material = orig; break; }
          const m = channelMaterial(spec[0], spec[1], spec[2]);
          created.push(m);
          mesh.material = m;
          break;
        }
        default:
          mesh.material = orig;
      }
    };
    apiRef.current = { applyMode };

    new GLTFLoader().load(
      url,
      (gltf) => {
        if (disposed) return;
        gltf.scene.traverse((o) => {
          if (o.isMesh && !mesh) { mesh = o; original = o.material; }
          if (o.isLine || o.isLineSegments) wire = o;
        });
        if (wire) {
          wire.material = new THREE.LineBasicMaterial({ color: 0x7fc6a4 });
          created.push(wire.material);
          wire.visible = false;
        }
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

        if (mesh?.geometry) {
          const count = mesh.geometry.index ? mesh.geometry.index.count : mesh.geometry.attributes.position.count;
          setTris(Math.round(count / 3));
        }
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
            {t('hint')}{tris ? ` · ${tris.toLocaleString(language)} ${t('tris')}` : ''}
          </p>
        )}
      </div>

      {status === 'ready' && (
        <div className="shrink-0 flex flex-wrap justify-center gap-1.5">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`px-2.5 py-1.5 text-[0.65rem] sm:text-xs font-bold uppercase tracking-wide border transition-colors ${
                mode === m.id ? 'bg-white text-black border-white' : 'bg-black/40 text-white/80 border-white/30 hover:border-white hover:text-white'
              }`}
            >
              {m.label[language] || m.label.es}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
