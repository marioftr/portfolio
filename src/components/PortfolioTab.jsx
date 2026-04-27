import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { projectList } from '../data/proyectos';
import { projects as contentProjects } from '../data/content';
import portfolioContent from '../data/portfolio_content.json';

export const profileImages = {
    all: {
        game_dev: [
            { 
                src: '/images/resaca4.png', 
                title_key: 'resaca_main', 
                projectId: 'resaca',
                process: [
                    { src: '/images/resaca1.jpg', label_index: 0 },
                    { src: '/images/resaca2.png', label_index: 1 },
                    { src: '/images/resaca3.png', label_index: 2 },
                    { src: '/images/resaca5.png', label_index: 3 },
                    { src: '/images/resaca6.png', label_index: 4 },
                    { src: '/images/resaca4.png', label_index: 5 },
                    { src: '/images/resaca4.png', type: 'video', videoUrl: 'https://www.youtube.com/embed/MAB_WVZ_87E', label: 'Gameplay Trailer' }
                ]
            }
        ],
        artist_2d_3d: [
            {
                src: '/images/IMG_Stable_5.png',
                type: 'video',
                title: 'Establo 3D',
                projectId: 'establo',
                videoUrl: 'https://www.youtube.com/embed/v2D9x7ZD-n4',
                process: [
                    { src: '/images/MapaConceptual.png', label: 'Mapa Conceptual del Entorno' },
                    { src: '/images/IMG_StableConcept_Maya_1.png', label: 'Blockout en Maya (Vista 1)' },
                    { src: '/images/IMG_StableConcept_Maya_2.png', label: 'Blockout en Maya (Vista 2)' },
                    { src: '/images/unreal_terreno1.png', label: 'Construcción de Terreno (Vista 1)' },
                    { src: '/images/unreal_terreno2.png', label: 'Construcción de Terreno (Vista 2)' },
                    { src: '/images/unreal_exterior.png', label: 'Construcción de Exterior (Vista 1)' },
                    { src: '/images/unreal_decals1.png', label: 'Aplicación de Decals (Vista 1)' },
                    { src: '/images/unreal_decals2.png', label: 'Aplicación de Decals (Vista 2)' },
                    { src: '/images/unreal_posprocesado.png', label: 'Ajuste de Posprocesado' },
                    { src: '/images/IMG_Stable_5.png', type: 'video', videoUrl: 'https://www.youtube.com/embed/v2D9x7ZD-n4', label: 'Resultado Final (Showcase)' }
                ]
            },
            { 
                src: '/images/WoodCart_3DSubstance_01.jpg', 
                type: 'image', 
                title_key: 'wood_cart_asset', 
                projectId: 'establo',
                externalLinks: [
                    { platform: 'artstation', url: 'https://marioftr.artstation.com/projects/3E5bn2' }
                ],
                process: [
                    { src: '/images/WoodCart_PureRef.png', label_index: 0 },
                    { src: '/images/WoodCart_ZBrush_01.png', label_index: 1 },
                    { src: '/images/WoodCart_ZBrush_02.png', label_index: 2 },
                    { src: '/images/WoodCart_ZBrush_03.png', label_index: 3 },
                    { src: '/images/WoodCart_ZBrush_04.png', label_index: 4 },
                    { src: '/images/WoodCart_3DSubstance_02.jpg', label: 'Vista general inferior' },
                    { src: '/images/WoodCart_3DSubstance_03.jpg', label: 'Detalle en Substance 3D (Vista 1)' },
                    { src: '/images/WoodCart_3DSubstance_04.jpg', label: 'Detalle en Substance 3D (Vista 2)' },
                    { src: '/images/WoodCart_3DSubstance_05.jpg', label: 'Detalle en Substance 3D (Vista 3)' },
                    { src: '/images/WoodCart_3DSubstance_06.jpg', label: 'Detalle en Substance 3D (Vista 4)' },
                    { src: '/images/WoodCart_3DSubstance_07.jpg', label: 'Detalle en Substance 3D (Vista 5)' },
                    { src: '/images/WoodCart_3DSubstance_08.jpg', label: 'Detalle en Substance 3D (Vista 6)' },
                    { src: '/images/WoodCart_3DSubstance_01.jpg', label_index: 5 }
                ]
            },
            { 
                src: '/images/Barril_3DSubstance_01.jpg', 
                type: 'image', 
                title_key: 'barrel_asset', 
                projectId: 'establo',
                process: [
                    { src: '/images/Barril_Maya.png', label_index: 0 },
                    { src: '/images/Barril_ZBrush.png', label_index: 1 },
                    { src: '/images/Barril_3DSubstance_03.jpg', label_index: 2 },
                    { src: '/images/Barril_3DSubstance_02.jpg', label_index: 3 },
                    { src: '/images/Barril_3DSubstance_01.jpg', label_index: 4 }
                ]
            },
            { 
                src: '/images/BridaCaballo_3DSubstance_01.jpg', 
                type: 'image', 
                title_key: 'bridle_asset', 
                projectId: 'establo',
                externalLinks: [
                    { platform: 'artstation', url: 'https://marioftr.artstation.com/projects/8BKmam' }
                ],
                process: [
                    { src: '/images/BridaCaballo_Maya.png', label_index: 0 },
                    { src: '/images/BridaCaballo_ZBrush.png', label_index: 1 },
                    { src: '/images/BridaCaballo_3DSubstance_03.jpg', label_index: 2 },
                    { src: '/images/BridaCaballo_3DSubstance_02.jpg', label_index: 3 },
                    { src: '/images/BridaCaballo_3DSubstance_01.jpg', label_index: 4 }
                ]
            },            { 
                src: '/images/resaca3.png', 
                type: 'image', 
                title_key: 'spatial_design', 
                projectId: 'resaca',
                process: [
                    { src: '/images/resaca4.png', label_index: 0 },
                    { src: '/images/resaca5.png', label_index: 1 },
                    { src: '/images/resaca6.png', label_index: 2 },
                    { src: '/images/resaca3.png', label_index: 3 }
                ]
            },
            { 
                src: '/images/cd_nero_imagen1.avif', 
                type: 'video', 
                title_key: 'nero_character', 
                projectId: 'colorin',
                process: [
                    { src: '/images/cd_nero_imagen11.avif', label_index: 0 },
                    { src: '/images/cd_nero_imagen10.avif', label_index: 1 },
                    { src: '/images/cd_nero_imagen3.avif',  label_index: 2 },
                    { src: '/images/cd_nero_imagen4.avif',  label_index: 3 },
                    { src: '/images/cd_nero_imagen5.avif',  label_index: 4 },
                    { src: '/images/cd_nero_imagen6.avif',  label_index: 5 },
                    { src: '/images/cd_nero_imagen9.avif',  label_index: 6 },
                    { src: '/images/cd_nero_imagen7.avif',  label_index: 7 },
                    { src: '/images/cd_nero_imagen8.avif',  label_index: 8 },
                    { src: '/images/cd_nero_imagen2.avif',  label_index: 9 },
                    { src: '/images/cd_nero_imagen1.avif',  label_index: 10 },
                    { src: '/images/cd_nero_imagen1.avif',  type: 'video', videoUrl: 'https://player.vimeo.com/video/1104936330', label_index: 11 }
                ]
            },
            { 
                src: '/images/cd_coral_imagen1.avif', 
                type: 'video', 
                title_key: 'coral_character', 
                projectId: 'colorin',
                process: [
                    { src: '/images/cd_coral_imagen7.avif', label_index: 0 },
                    { src: '/images/cd_coral_imagen8.avif', label_index: 1 },
                    { src: '/images/cd_coral_imagen3.avif', label_index: 2 },
                    { src: '/images/cd_coral_imagen4.avif', label_index: 3 },
                    { src: '/images/cd_coral_imagen5.avif', label_index: 4 },
                    { src: '/images/cd_coral_imagen6.avif', label_index: 5 },
                    { src: '/images/cd_coral_imagen2.avif', label_index: 6 },
                    { src: '/images/cd_coral_imagen1.avif', label_index: 7 },
                    { src: '/images/cd_coral_imagen1.avif', type: 'video', videoUrl: 'https://player.vimeo.com/video/1104936347', label_index: 8 }
                ]
            },
            { 
                src: '/images/cd_craion_imagen1.avif', 
                type: 'video', 
                title_key: 'craion_character', 
                projectId: 'colorin',
                process: [
                    { src: '/images/cd_craion_imagen10.avif', label_index: 0 },
                    { src: '/images/cd_craion_imagen10.avif', type: 'video', videoUrl: 'https://player.vimeo.com/video/1104957944', label_index: 1 },
                    { src: '/images/cd_craion_imagen5.avif',  label_index: 2 },
                    { src: '/images/cd_craion_imagen4.avif',  label_index: 3 },
                    { src: '/images/cd_craion_imagen6.avif',  label_index: 4 },
                    { src: '/images/cd_craion_imagen7.avif',  label_index: 5 },
                    { src: '/images/cd_craion_imagen8.avif',  label_index: 6 },
                    { src: '/images/cd_craion_imagen9.avif',  label_index: 7 },
                    { src: '/images/cd_craion_imagen3.avif',  label_index: 8 },
                    { src: '/images/cd_craion_imagen2.avif',  label_index: 9 },
                    { src: '/images/cd_craion_imagen1.avif',  label_index: 10 },
                    { src: '/images/cd_craion_imagen1.avif',  type: 'video', videoUrl: 'https://player.vimeo.com/video/1104936375', label_index: 11 }
                ]
            },
            { 
                src: '/images/kafeto3.avif', 
                type: 'image', 
                title_key: 'kafeto_asset', 
                projectId: 'kafeto',
                process: [
                    { src: '/images/kafeto5.avif', label_index: 0 },
                    { src: '/images/kafeto6.avif', label_index: 1 },
                    { src: '/images/kafeto7.avif', label_index: 2 },
                    { src: '/images/kafeto4.avif', label_index: 3 },
                    { src: '/images/kafeto3.avif', label_index: 4 }
                ]
            }
        ],
        video_editor: [
            { 
                src: '/images/cd_nero_imagen1.avif', 
                type: 'video', 
                title_key: 'nero_character', 
                projectId: 'colorin',
                process: [
                    { src: '/images/cd_nero_imagen11.avif', label_index: 0 },
                    { src: '/images/cd_nero_imagen10.avif', label_index: 1 },
                    { src: '/images/cd_nero_imagen3.avif',  label_index: 2 },
                    { src: '/images/cd_nero_imagen4.avif',  label_index: 3 },
                    { src: '/images/cd_nero_imagen5.avif',  label_index: 4 },
                    { src: '/images/cd_nero_imagen6.avif',  label_index: 5 },
                    { src: '/images/cd_nero_imagen9.avif',  label_index: 6 },
                    { src: '/images/cd_nero_imagen7.avif',  label_index: 7 },
                    { src: '/images/cd_nero_imagen8.avif',  label_index: 8 },
                    { src: '/images/cd_nero_imagen2.avif',  label_index: 9 },
                    { src: '/images/cd_nero_imagen1.avif',  label_index: 10 },
                    { src: '/images/cd_nero_imagen1.avif',  type: 'video', videoUrl: 'https://player.vimeo.com/video/1104936330', label_index: 11 }
                ]
            },
            { 
                src: '/images/cd_coral_imagen1.avif', 
                type: 'video', 
                title_key: 'coral_character', 
                projectId: 'colorin',
                process: [
                    { src: '/images/cd_coral_imagen7.avif', label_index: 0 },
                    { src: '/images/cd_coral_imagen8.avif', label_index: 1 },
                    { src: '/images/cd_coral_imagen3.avif', label_index: 2 },
                    { src: '/images/cd_coral_imagen4.avif', label_index: 3 },
                    { src: '/images/cd_coral_imagen5.avif', label_index: 4 },
                    { src: '/images/cd_coral_imagen6.avif', label_index: 5 },
                    { src: '/images/cd_coral_imagen2.avif', label_index: 6 },
                    { src: '/images/cd_coral_imagen1.avif', label_index: 7 },
                    { src: '/images/cd_coral_imagen1.avif', type: 'video', videoUrl: 'https://player.vimeo.com/video/1104936347', label_index: 8 }
                ]
            },
            { 
                src: '/images/cd_craion_imagen1.avif', 
                type: 'video', 
                title_key: 'craion_character', 
                projectId: 'colorin',
                process: [
                    { src: '/images/cd_craion_imagen10.avif', label_index: 0 },
                    { src: '/images/cd_craion_imagen10.avif', type: 'video', videoUrl: 'https://player.vimeo.com/video/1104957944', label_index: 1 },
                    { src: '/images/cd_craion_imagen5.avif',  label_index: 2 },
                    { src: '/images/cd_craion_imagen4.avif',  label_index: 3 },
                    { src: '/images/cd_craion_imagen6.avif',  label_index: 4 },
                    { src: '/images/cd_craion_imagen7.avif',  label_index: 5 },
                    { src: '/images/cd_craion_imagen8.avif',  label_index: 6 },
                    { src: '/images/cd_craion_imagen9.avif',  label_index: 7 },
                    { src: '/images/cd_craion_imagen3.avif',  label_index: 8 },
                    { src: '/images/cd_craion_imagen2.avif',  label_index: 9 },
                    { src: '/images/cd_craion_imagen1.avif',  label_index: 10 },
                    { src: '/images/cd_craion_imagen1.avif',  type: 'video', videoUrl: 'https://player.vimeo.com/video/1104936375', label_index: 11 }
                ]
            }
        ]
    }
};

// Use the same refined lists for specific profiles
profileImages.video_editor = profileImages.all.video_editor;

profileImages.game_dev = profileImages.all.game_dev;

profileImages.artist_2d_3d = profileImages.all.artist_2d_3d;

profileImages.design = [
    { src: '/images/afonte_banner.png', type: 'image', title: 'A Fonte - Brand Banner', projectId: 'carta_a_fonte' },
    { src: '/images/kafeto7.avif', type: 'video', videoUrl: 'https://www.youtube.com/embed/k-AKIa1uzpA', title: 'Kafeto - Social Media Ad', projectId: 'kafeto' },
    { src: '/images/kafeto6.avif', type: 'image', title: 'Kafeto - 3D Render', projectId: 'kafeto' },
    { src: '/images/kafeto5.avif', type: 'image', title: 'Kafeto - Interior Design', projectId: 'kafeto' },
    { src: '/images/colorin11.avif', type: 'image', title: 'Colorín Decolorado - Poster', projectId: 'colorin' },
    { src: '/images/colorin10.avif', type: 'image', title: 'Colorín Decolorado - Merchandising', projectId: 'colorin' }
];

export default function Portfolio({ roleId, onProjectSelect, onTabClick, externalOpenIndex, onExternalClose, switchProfileSlug, switchProfileLabel }) {
    const { t, language } = useTranslation();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [usePortraitLayout, setUsePortraitLayout] = useState(
        window.innerWidth < 768 || (window.innerWidth < 1024 && window.innerHeight > window.innerWidth)
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setUsePortraitLayout(
                window.innerWidth < 768 || (window.innerWidth < 1024 && window.innerHeight > window.innerWidth)
            );
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    // Abrir lightbox desde un componente padre (ej. PortfolioOverview)
    useEffect(() => {
        if (externalOpenIndex != null) setSelectedItemIndex(externalOpenIndex);
    }, [externalOpenIndex]);

    // Notificar al padre cuando el lightbox se cierra
    const wasOpenRef = useRef(false);
    useEffect(() => {
        if (selectedItemIndex !== null) {
            wasOpenRef.current = true;
        } else if (wasOpenRef.current) {
            wasOpenRef.current = false;
            onExternalClose?.();
        }
    }, [selectedItemIndex]);
    // isVideoPlaying stored per-slide index so switching slides auto-stops
    const [videoPlayingIdx, setVideoPlayingIdx] = useState(null);
    // Active process step by INDEX — null = last step (Resultado Final)
    const [activeProcessIndex, setActiveProcessIndex] = useState(null);
    const lightboxContainerRef = useRef(null);
    const isProgrammaticScrollRef = useRef(false);
    const scrollEndTimerRef = useRef(null);
    const animFrameRef = useRef(null);

    // Animación de scroll personalizada con easing (más lenta que behavior:'smooth')
    const scrollToEased = (container, targetLeft, duration = 800) => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        const start = container.scrollLeft;
        const diff = targetLeft - start;
        if (Math.abs(diff) < 1) { isProgrammaticScrollRef.current = false; return; }
        const startTime = performance.now();
        const easeInOut = t => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            container.scrollLeft = start + diff * easeInOut(progress);
            if (progress < 1) {
                animFrameRef.current = requestAnimationFrame(step);
            } else {
                isProgrammaticScrollRef.current = false;
            }
        };
        animFrameRef.current = requestAnimationFrame(step);
    };

    // Si es perfil general (all), usamos la estructura de secciones
    const isGeneralProfile = roleId === 'all';
    const generalProfileOrder = ['artist_2d_3d', 'game_dev', 'video_editor'];

    // Obtenemos las imágenes (directamente o por secciones)
    const imagesData = profileImages[roleId] || profileImages.all;

    // Aplanamos todos los items para la navegación del Lightbox
    const flatItems = useMemo(() => {
        if (isGeneralProfile) {
            return generalProfileOrder
                .flatMap((sectionKey) => {
                    const sectionItems = imagesData[sectionKey] || [];
                    return sectionItems.map(item => ({ ...item, categoryLabel: sectionKey }));
                });
        }
        return (imagesData || []).map(item => ({ ...item, categoryLabel: roleId }));
    }, [imagesData, isGeneralProfile, roleId]);

    // Cuando se abre el lightbox: posicionar sin animación y limpiar estado
    useEffect(() => {
        if (selectedItemIndex !== null) {
            document.body.style.overflow = 'hidden';
            setActiveProcessIndex(null);
            setVideoPlayingIdx(null);
            const timer = setTimeout(() => {
                const container = lightboxContainerRef.current;
                if (!container) return;
                const w = container.offsetWidth;
                if (w > 0) {
                    isProgrammaticScrollRef.current = true;
                    container.scrollTo({ left: selectedItemIndex * w, behavior: 'auto' });
                    setTimeout(() => { isProgrammaticScrollRef.current = false; }, 100);
                }
            }, 30);
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedItemIndex]);

    // Navegar a un índice concreto (flechas / teclado)
    const goToIndex = (newIdx) => {
        const container = lightboxContainerRef.current;
        if (!container || newIdx < 0 || newIdx >= flatItems.length) return;
        isProgrammaticScrollRef.current = true;
        clearTimeout(scrollEndTimerRef.current);
        scrollToEased(container, newIdx * container.offsetWidth, 800);
        setSelectedItemIndex(newIdx);
        setActiveProcessIndex(null);
        setVideoPlayingIdx(null);
    };

    const nextImage = () => goToIndex(selectedItemIndex + 1);
    const prevImage = () => goToIndex(selectedItemIndex - 1);

    // Detectar navegación nativa (trackpad / táctil) — debounce para esperar al final del scroll
    const handleLightboxScroll = () => {
        if (isProgrammaticScrollRef.current) return;
        clearTimeout(scrollEndTimerRef.current);
        scrollEndTimerRef.current = setTimeout(() => {
            const container = lightboxContainerRef.current;
            if (!container) return;
            const w = container.offsetWidth;
            if (!w) return;
            const newIdx = Math.round(container.scrollLeft / w);
            // Snap exacto al slide más cercano
            isProgrammaticScrollRef.current = true;
            scrollToEased(container, newIdx * w, 400);
            if (newIdx !== selectedItemIndex && newIdx >= 0 && newIdx < flatItems.length) {
                setSelectedItemIndex(newIdx);
                setActiveProcessIndex(null);
                setVideoPlayingIdx(null);
            }
        }, 120);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedItemIndex === null) return;
            if (e.key === 'ArrowRight') { e.preventDefault(); nextImage(); }
            if (e.key === 'ArrowLeft')  { e.preventDefault(); prevImage(); }
            if (e.key === 'Escape') setSelectedItemIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItemIndex, flatItems]);

    const handleViewFullProject = (projectId) => {
        // Encontrar el proyecto base de content.js para tener las descripciones localizadas
        const baseProject = contentProjects.find(p => p.id === projectId);
        // Encontrar el proyecto maestro de proyectos.js para tener los metadatos extendidos
        const masterProject = projectList.find(p => p.id === projectId);
        
        if (baseProject) {
            // Fusionar tal cual se hace en App.jsx para que el modal no falle
            const fullProject = {
                ...baseProject,
                ...masterProject,
                title: baseProject.title,
                summary: baseProject.summary,
                category: baseProject.category
            };
            onProjectSelect(fullProject);
            onTabClick('proyectos');
            setSelectedItemIndex(null);
        }
    };

    const sectionTitles = {
        video_editor: { es: 'Edición de Vídeo', en: 'Video Editing', ca: 'Edició de Vídeo', gl: 'Edición de Vídeo' },
        game_dev: { es: 'Desarrollo de Videojuegos', en: 'Game Development', ca: 'Desenvolupament de Videojocs', gl: 'Desenvolvemento de Videoxogos' },
        artist_2d_3d: { es: 'Arte 2D & 3D', en: '2D & 3D Art', ca: 'Art 2D i 3D', gl: 'Arte 2D e 3D' },
        design: { es: 'Diseño Gráfico', en: 'Graphic Design', ca: 'Disseny Gràfic', gl: 'Deseño Gráfico' }
    };

    const renderGrid = (items, startInFlatIndex) => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 'var(--spacing-sm)',
            marginTop: 'var(--spacing-md)',
            marginBottom: '1rem' 
        }}>
            {items.map((item, index) => (
                <div 
                    key={index} 
                    style={{
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                        aspectRatio: '16 / 9',
                        backgroundColor: '#f0f0f0',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    }}
                    onClick={() => setSelectedItemIndex(startInFlatIndex + index)}
                >
                    <img 
                        src={item.src} 
                        alt={item.title} 
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }} 
                    />
                    {item.type === 'video' && (
                        <div style={{
                            position: 'absolute', top: '8px', left: '8px',
                            backgroundColor: 'var(--color-primary)', color: 'white',
                            padding: '3px 8px', borderRadius: '10px',
                            fontSize: '0.6rem', fontWeight: 800, zIndex: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            display: 'flex', alignItems: 'center', gap: '4px',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}>
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                            VIDEO
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <>
            <section className="animate-fade-in container" style={{ paddingBottom: '0' }}>
<div className="section-title" style={{ marginTop: '3rem', marginBottom: 'var(--spacing-lg)' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, textAlign: 'center' }}>
                        {'Portfolio'}
                    </h2>
                    <div className="title-underline" style={{ margin: '0.5rem auto 0' }} />
                </div>

                {isGeneralProfile ? (
                    (() => {
                        let currentFlatIndex = 0;
                        return generalProfileOrder
                            .map((sectionKey) => [sectionKey, imagesData[sectionKey] || []])
                            .map(([sectionKey, sectionItems], index, array) => {
                                const grid = (
                                    <div key={sectionKey} style={{ marginBottom: index === array.length - 1 ? '0' : '2.5rem' }}>
                                        <h3 style={{ 
                                            fontSize: '1.25rem', 
                                            fontWeight: 800, 
                                            color: 'var(--color-primary)',
                                            borderLeft: '4px solid var(--color-primary)',
                                            paddingLeft: '1rem',
                                            marginBottom: '1rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            {sectionTitles[sectionKey]?.[language] || sectionTitles[sectionKey]?.es}
                                        </h3>
                                        {renderGrid(sectionItems, currentFlatIndex)}
                                    </div>
                                );
                                currentFlatIndex += sectionItems.length;
                                return grid;
                            });
                    })()
                ) : (
                    renderGrid(imagesData, 0)
                )}
                
            </section>

            {/* Lightbox / Overlay - Usamos createPortal para que escape de cualquier contexto de apilamiento */}
            {selectedItemIndex !== null && createPortal(
                <div 
                    className="portfolio-lightbox-overlay"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 999999, 
                        backgroundColor: 'rgba(0, 0, 0, 0.98)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => setSelectedItemIndex(null)}
                >
                    {/* Close Button */}
                    <button 
                        onClick={() => setSelectedItemIndex(null)}
                        style={{
                            position: 'absolute',
                            top: isMobile ? '1rem' : '2rem',
                            right: isMobile ? '1rem' : '2rem',
                            zIndex: 1000001,
                            backgroundColor: 'white',
                            border: 'none',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Botón Cambiar de perfil — solo visible cuando se abre desde el perfil general */}
                    {switchProfileSlug && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedItemIndex(null); navigate(`/${language}/${switchProfileSlug}/portfolio`); }}
                            style={{
                                position: 'absolute',
                                ...(isMobile
                                    ? { bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)' }
                                    : { top: '2rem', left: '2rem' }
                                ),
                                zIndex: 1000001,
                                background: 'rgba(255,255,255,0.12)',
                                border: '1px solid rgba(255,255,255,0.35)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '10px',
                                padding: '0.45rem 1.1rem',
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                color: 'white',
                                fontFamily: 'inherit',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                whiteSpace: 'nowrap',
                                transition: 'background 0.2s, border-color 0.2s'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>
                            {switchProfileLabel
                                ? (language === 'en' ? `Switch to ${switchProfileLabel}` : language === 'ca' ? `Canviar de perfil a ${switchProfileLabel}` : `Cambiar de perfil a ${switchProfileLabel}`)
                                : (language === 'en' ? 'Switch profile' : language === 'ca' ? 'Canviar de perfil' : 'Cambiar de perfil')
                            }
                        </button>
                    )}

                    {!isMobile && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                style={{
                                    position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '50%',
                                    width: '60px', height: '60px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    zIndex: 1000000, transition: 'all 0.2s ease', color: 'white'
                                }}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                style={{
                                    position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '50%',
                                    width: '60px', height: '60px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    zIndex: 1000000, transition: 'all 0.2s ease', color: 'white'
                                }}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </>
                    )}

                    <div 
                        ref={lightboxContainerRef}
                        onScroll={handleLightboxScroll}
                        style={{ 
                            width: '100%',
                            height: '100%', 
                            display: 'flex', 
                            overflowX: 'scroll',
                            overflowY: 'hidden',
                            WebkitOverflowScrolling: 'touch',
                            padding: 0,
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255,255,255,0.3) transparent'
                        }}
                    >
                        {flatItems.map((item, idx) => {
                            // Resolve localized process labels
                            const processImages = (item.process || []).map(pImg => {
                                if (pImg.label_index !== undefined && item.title_key && portfolioContent[item.title_key]) {
                                    const loc = portfolioContent[item.title_key].process_labels[pImg.label_index];
                                    return { ...pImg, label: loc ? (loc[language] || loc.es) : pImg.label };
                                }
                                return pImg;
                            });

                            const hasProcess = processImages.length > 0;

                            // Determine which step is active (by index to avoid duplicate-src issues)
                            const effectiveActiveIdx = (selectedItemIndex === idx && activeProcessIndex !== null)
                                ? activeProcessIndex
                                : (processImages.length > 0 ? processImages.length - 1 : -1);

                            const currentMedia = processImages.length > 0
                                ? processImages[effectiveActiveIdx] || processImages[processImages.length - 1]
                                : item;

                            const displaySrc   = currentMedia.src;
                            const isCurrentVideo = currentMedia.type === 'video' || !!currentMedia.videoUrl;
                            const currentVideoUrl = currentMedia.videoUrl || '';

                            const displayTitle = item.title_key && portfolioContent[item.title_key]
                                ? (portfolioContent[item.title_key].title[language] || portfolioContent[item.title_key].title.es)
                                : item.title;

                            const isVideoPlaying = videoPlayingIdx === idx;

                            return (
                                <div
                                    key={idx}
                                    style={{
                                        minWidth: '100%',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden',
                                        padding: isMobile ? '3.5rem 1rem 1rem' : '4rem 8rem 1.5rem 7rem',
                                        boxSizing: 'border-box',
                                        gap: '0.6rem'
                                    }}
                                    onClick={() => setSelectedItemIndex(null)}
                                >
                                    {/* Portrait: INFO at top */}
                                    {usePortraitLayout && (
                                        <div
                                            style={{ width: '100%', textAlign: 'center', flexShrink: 0 }}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <div style={{
                                                fontFamily: 'inherit',
                                                color: 'var(--color-primary)',
                                                fontSize: '0.7rem',
                                                fontWeight: 900,
                                                textTransform: 'uppercase',
                                                letterSpacing: '2px'
                                            }}>
                                                {sectionTitles[item.categoryLabel]?.[language] || sectionTitles[item.categoryLabel]?.es}
                                            </div>
                                            <h3 style={{
                                                fontFamily: 'inherit',
                                                color: 'white',
                                                fontSize: isMobile ? '1.2rem' : '1.5rem',
                                                fontWeight: 900,
                                                margin: '0.2rem 0 0',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {displayTitle}
                                            </h3>
                                        </div>
                                    )}

                                    {/* MAIN ROW: imagen + sidebar proceso */}
                                    <div
                                        style={{
                                            flex: 1,
                                            minHeight: 0,
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: usePortraitLayout ? 'column' : 'row',
                                            gap: usePortraitLayout ? '0.75rem' : '1.5rem',
                                            alignItems: 'stretch'
                                        }}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        {/* Desktop: columna izquierda (info + imagen + botón) / Portrait: solo imagen */}
                                        {!usePortraitLayout ? (
                                            <div style={{
                                                flex: 1, minWidth: 0, minHeight: 0,
                                                display: 'flex', flexDirection: 'column', gap: '0.6rem'
                                            }}>
                                                {/* Desktop INFO */}
                                                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                                                    <div style={{
                                                        fontFamily: 'inherit',
                                                        color: 'var(--color-primary)',
                                                        fontSize: '0.7rem',
                                                        fontWeight: 900,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '2px'
                                                    }}>
                                                        {sectionTitles[item.categoryLabel]?.[language] || sectionTitles[item.categoryLabel]?.es}
                                                    </div>
                                                    <h3 style={{
                                                        fontFamily: 'inherit',
                                                        color: 'white',
                                                        fontSize: '1.5rem',
                                                        fontWeight: 900,
                                                        margin: '0.2rem 0 0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>
                                                        {displayTitle}
                                                    </h3>
                                                </div>
                                                {/* Desktop media */}
                                                <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                                    {isCurrentVideo ? (
                                                        <div style={{
                                                            width: '100%',
                                                            maxWidth: 'min(100%, calc(100vh * 16/9 * 0.6))',
                                                            aspectRatio: '16/9',
                                                            borderRadius: '12px',
                                                            overflow: 'hidden',
                                                            boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
                                                            position: 'relative',
                                                            backgroundColor: '#000'
                                                        }}>
                                                            {!isVideoPlaying ? (
                                                                <div
                                                                    style={{ width: '100%', height: '100%', cursor: 'pointer', position: 'relative' }}
                                                                    onClick={() => setVideoPlayingIdx(idx)}
                                                                >
                                                                    <img src={displaySrc} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Preview" />
                                                                    <div style={{
                                                                        position: 'absolute', top: '50%', left: '50%',
                                                                        transform: 'translate(-50%, -50%)',
                                                                        backgroundColor: 'var(--color-primary)',
                                                                        width: '64px', height: '64px', borderRadius: '50%',
                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                                    }}>
                                                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '4px' }}>
                                                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <iframe
                                                                    width="100%" height="100%"
                                                                    src={currentVideoUrl.includes('?') ? `${currentVideoUrl}&autoplay=1` : `${currentVideoUrl}?autoplay=1`}
                                                                    frameBorder="0" allowFullScreen
                                                                    allow="autoplay; fullscreen"
                                                                />
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={displaySrc}
                                                            alt={displayTitle}
                                                            style={{
                                                                maxWidth: '100%',
                                                                maxHeight: '100%',
                                                                width: 'auto',
                                                                height: 'auto',
                                                                objectFit: 'contain',
                                                                borderRadius: '10px',
                                                                boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
                                                                display: 'block'
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                {/* Desktop BUTTON */}
                                                <div style={{ flexShrink: 0, textAlign: 'center', display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                    <button
                                                        onClick={() => handleViewFullProject(item.projectId)}
                                                        style={{
                                                            fontFamily: 'inherit',
                                                            background: 'none',
                                                            border: '1px solid var(--color-primary)',
                                                            color: 'var(--color-primary)',
                                                            cursor: 'pointer',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 700,
                                                            padding: '0.35rem 1.2rem',
                                                            borderRadius: '10px',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '6px',
                                                            transition: 'background 0.2s, color 0.2s'
                                                        }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                                                    >
                                                        {language === 'en' ? 'View Full Project' : 'Ver proyecto completo'} ➜
                                                    </button>
                                                    {item.externalLinks?.map((link, li) => {
                                                        const names = { artstation: 'ArtStation', github: 'GitHub', itch: 'itch.io', behance: 'Behance', vimeo: 'Vimeo', youtube: 'YouTube' };
                                                        const label = { es: 'Ver en', en: 'View on', ca: 'Veure a', gl: 'Ver en' }[language] || 'Ver en';
                                                        return (
                                                            <a key={li} href={link.url} target="_blank" rel="noopener noreferrer"
                                                                style={{
                                                                    fontFamily: 'inherit',
                                                                    background: 'none',
                                                                    border: '1px solid rgba(255,255,255,0.4)',
                                                                    color: 'rgba(255,255,255,0.85)',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.85rem',
                                                                    fontWeight: 700,
                                                                    padding: '0.35rem 1.2rem',
                                                                    borderRadius: '10px',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '6px',
                                                                    textDecoration: 'none',
                                                                    transition: 'background 0.2s, color 0.2s, border-color 0.2s'
                                                                }}
                                                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.color = 'white'; }}
                                                                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                                                            >
                                                                {link.platform === 'artstation' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}><path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.129-1.268H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/></svg>}
                                                                {link.platform === 'github' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>}
                                                                {label} {names[link.platform] || link.platform}
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ) : (
                                            /* Portrait: Imagen / Vídeo principal */
                                            <div style={{
                                                flex: 1,
                                                minWidth: 0,
                                                minHeight: 0,
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden'
                                            }}>
                                                {isCurrentVideo ? (
                                                    <div style={{
                                                        width: '100%',
                                                        maxWidth: 'min(100%, calc(100vh * 16/9 * 0.6))',
                                                        aspectRatio: '16/9',
                                                        borderRadius: '12px',
                                                        overflow: 'hidden',
                                                        boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
                                                        position: 'relative',
                                                        backgroundColor: '#000'
                                                    }}>
                                                        {!isVideoPlaying ? (
                                                            <div
                                                                style={{ width: '100%', height: '100%', cursor: 'pointer', position: 'relative' }}
                                                                onClick={() => setVideoPlayingIdx(idx)}
                                                            >
                                                                <img src={displaySrc} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Preview" />
                                                                <div style={{
                                                                    position: 'absolute', top: '50%', left: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    backgroundColor: 'var(--color-primary)',
                                                                    width: '64px', height: '64px', borderRadius: '50%',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                                }}>
                                                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '4px' }}>
                                                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <iframe
                                                                width="100%" height="100%"
                                                                src={currentVideoUrl.includes('?') ? `${currentVideoUrl}&autoplay=1` : `${currentVideoUrl}?autoplay=1`}
                                                                frameBorder="0" allowFullScreen
                                                                allow="autoplay; fullscreen"
                                                            />
                                                        )}
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={displaySrc}
                                                        alt={displayTitle}
                                                        style={{
                                                            maxWidth: '100%',
                                                            maxHeight: '100%',
                                                            width: 'auto',
                                                            height: 'auto',
                                                            objectFit: 'contain',
                                                            borderRadius: '10px',
                                                            boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
                                                            display: 'block'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}

                                        {/* Label foto activa — solo en portrait */}
                                        {usePortraitLayout && hasProcess && processImages[effectiveActiveIdx] && (
                                            <div
                                                onClick={e => e.stopPropagation()}
                                                style={{
                                                    flexShrink: 0,
                                                    textAlign: 'center',
                                                    color: 'rgba(255,255,255,0.9)',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600,
                                                    padding: '0.15rem 1rem 0',
                                                    lineHeight: 1.3
                                                }}
                                            >
                                                {processImages[effectiveActiveIdx].label}
                                            </div>
                                        )}

                                        {/* Sidebar del proceso — columna derecha en desktop, tira horizontal en mobile */}
                                        {hasProcess && (
                                            <div
                                                className="process-sidebar"
                                                style={{
                                                    width: usePortraitLayout ? '100%' : '200px',
                                                    flexShrink: 0,
                                                    display: 'flex',
                                                    flexDirection: usePortraitLayout ? 'row' : 'column',
                                                    gap: '0.75rem',
                                                    overflowY: usePortraitLayout ? 'hidden' : 'auto',
                                                    overflowX: usePortraitLayout ? 'auto' : 'hidden',
                                                    padding: usePortraitLayout ? '0.25rem 0' : '0.5rem 0',
                                                }}
                                            >
                                                {!usePortraitLayout && (
                                                    <p style={{
                                                        fontFamily: 'inherit',
                                                        color: 'rgba(255,255,255,0.45)',
                                                        fontSize: '0.65rem',
                                                        fontWeight: 700,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '1.5px',
                                                        margin: '0 0 0.25rem'
                                                    }}>
                                                        {language === 'en' ? 'Creation Process' : 'Proceso de creación'}
                                                    </p>
                                                )}
                                                {processImages.map((pImg, pIdx) => {
                                                    const isActive = selectedItemIndex === idx
                                                        ? pIdx === effectiveActiveIdx
                                                        : pIdx === processImages.length - 1;
                                                    return (
                                                        <div
                                                            key={pIdx}
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                setActiveProcessIndex(pIdx);
                                                                setVideoPlayingIdx(null);
                                                            }}
                                                            style={{
                                                                flexShrink: 0,
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                flexDirection: usePortraitLayout ? 'column' : 'row',
                                                                alignItems: 'center',
                                                                gap: '0.5rem',
                                                                opacity: isActive ? 1 : 0.45,
                                                                transition: 'opacity 0.2s',
                                                                minWidth: usePortraitLayout ? '90px' : 'auto'
                                                            }}
                                                        >
                                                            <div style={{ position: 'relative', flexShrink: 0, overflow: 'hidden', borderRadius: '8px', width: usePortraitLayout ? '72px' : '80px', height: usePortraitLayout ? '54px' : '60px' }}>
                                                                <img
                                                                    src={pImg.src}
                                                                    alt=""
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '8px',
                                                                        border: isActive ? '2px solid var(--color-primary)' : '2px solid rgba(255,255,255,0.1)',
                                                                        boxShadow: isActive ? '0 0 8px rgba(5,150,105,0.6)' : 'none'
                                                                    }}
                                                                />
                                                                {(pImg.type === 'video' || pImg.videoUrl) && (
                                                                    <div style={{
                                                                        position: 'absolute', top: '50%', left: '50%',
                                                                        transform: 'translate(-50%,-50%)',
                                                                        backgroundColor: 'rgba(var(--color-primary-rgb, 5,150,105), 0.9)',
                                                                        width: '24px', height: '24px', borderRadius: '50%',
                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                                    }}>
                                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                                                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                        </svg>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {!usePortraitLayout && (
                                                                <>
                                                                    <span style={{
                                                                        fontFamily: 'inherit',
                                                                        color: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.8)',
                                                                        fontSize: '0.72rem',
                                                                        fontWeight: isActive ? 700 : 400,
                                                                        lineHeight: 1.3,
                                                                        flex: 1,
                                                                        minWidth: 0,
                                                                        overflow: 'hidden',
                                                                        wordBreak: 'break-word'
                                                                    }}>{pImg.label}</span>
                                                                    <span style={{ flexShrink: 0, width: '8px' }} />
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* Portrait: BUTTON at bottom */}
                                    {usePortraitLayout && (
                                        <div
                                            style={{ flexShrink: 0, textAlign: 'center', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <button
                                                onClick={() => handleViewFullProject(item.projectId)}
                                                style={{
                                                    fontFamily: 'inherit',
                                                    background: 'none',
                                                    border: '1px solid var(--color-primary)',
                                                    color: 'var(--color-primary)',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                    padding: '0.35rem 1.2rem',
                                                    borderRadius: '10px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    transition: 'background 0.2s, color 0.2s'
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                                            >
                                                {language === 'en' ? 'View Full Project' : 'Ver proyecto completo'} ➜
                                            </button>
                                            {item.externalLinks?.map((link, li) => {
                                                const names = { artstation: 'ArtStation', github: 'GitHub', itch: 'itch.io', behance: 'Behance', vimeo: 'Vimeo', youtube: 'YouTube' };
                                                const label = { es: 'Ver en', en: 'View on', ca: 'Veure a', gl: 'Ver en' }[language] || 'Ver en';
                                                return (
                                                    <a key={li} href={link.url} target="_blank" rel="noopener noreferrer"
                                                        style={{
                                                            fontFamily: 'inherit',
                                                            background: 'none',
                                                            border: '1px solid rgba(255,255,255,0.4)',
                                                            color: 'rgba(255,255,255,0.85)',
                                                            cursor: 'pointer',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 700,
                                                            padding: '0.35rem 1.2rem',
                                                            borderRadius: '10px',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '6px',
                                                            textDecoration: 'none',
                                                            transition: 'background 0.2s, color 0.2s, border-color 0.2s'
                                                        }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.color = 'white'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                                                    >
                                                        {link.platform === 'artstation' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}><path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.129-1.268H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/></svg>}
                                                        {link.platform === 'github' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>}
                                                        {label} {names[link.platform] || link.platform}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>, 
                document.body
            )}
        </>
    );
}
