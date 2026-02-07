import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { skillCategories, allSkills } from '../data/content';
import audacityImg from '../assets/optimized/audacity.png?url';
import blenderImg from '../assets/optimized/blender.png?url';
import brainstormImg from '../assets/optimized/brainstorm.png?url';
import canvaImg from '../assets/optimized/canva.png?url';
import capcutImg from '../assets/optimized/capcut.jpg?url';
import davinciImg from '../assets/optimized/davinci.png?url';
import ffmpegImg from '../assets/optimized/ffmpeg.png?url';
import mkvtoolnixImg from '../assets/optimized/mkvtoolnix.png?url';
import unityImg from '../assets/optimized/unity.jpg?url';

const imageMap = {
    'audacity.png': audacityImg,
    'blender.png': blenderImg,
    'brainstorm.png': brainstormImg,
    'canva.png': canvaImg,
    'capcut.jpg': capcutImg,
    'davinci.png': davinciImg,
    'ffmpeg.png': ffmpegImg,
    'mkvtoolnix.png': mkvtoolnixImg,
    'unity.jpg': unityImg
};

export default function SkillsSection() {
    const { language } = useTranslation();
    const [expandedCategory, setExpandedCategory] = useState(null);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md" style={{ marginTop: 'var(--spacing-md)' }}>
            {skillCategories.map((cat, idx) => (
                <div key={idx} className="card" style={{ padding: 0, overflow: 'hidden', height: 'fit-content' }}>
                    <button
                        onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-md) var(--spacing-lg)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: expandedCategory === idx ? 'var(--color-secondary)' : 'white',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            textAlign: 'left'
                        }}
                    >
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {cat.title[language] || cat.title.es}
                        </h3>
                        <svg
                            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                            style={{
                                transform: expandedCategory === idx ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.3s',
                                color: 'var(--color-primary)'
                            }}
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    <div style={{
                        maxHeight: expandedCategory === idx ? '1000px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundColor: 'white'
                    }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-border)' }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                                {cat.items.map(skillId => (
                                    <div key={skillId} className="flex flex-col gap-xs">
                                        <div className="flex items-center gap-sm">
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                backgroundColor: 'var(--color-secondary)',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                {(() => {
                                                    // try png then jpg
                                                    const id = skillId;
                                                    const png = `${id}.png`;
                                                    const jpg = `${id}.jpg`;
                                                    const url = imageMap[png] || imageMap[jpg];
                                                    if (url) return <img src={url} alt={allSkills[skillId]?.name || id} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />;
                                                    return (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                            <polyline points="21 15 16 10 5 21"></polyline>
                                                        </svg>
                                                    );
                                                })()}
                                            </div>
                                            <span className="tag" style={{ width: 'fit-content', fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap' }}>
                                                {allSkills[skillId]?.name || skillId}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', lineHeight: 1.5, marginTop: '0.25rem' }}>
                                            {allSkills[skillId]?.description[language] || allSkills[skillId]?.description.es}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
