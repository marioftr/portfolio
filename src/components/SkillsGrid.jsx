import { useTranslation } from '../hooks/useTranslation';
import { skillCategories, allSkills, skillCategoriesOrder } from '../data/content';

import audacityImg from '../assets/optimized/audacity.png?url';
import blenderImg from '../assets/optimized/blender.png?url';
import brainstormImg from '../assets/optimized/brainstorm.png?url';
import canvaImg from '../assets/optimized/canva.png?url';
import asepriteImg from '../assets/optimized/aseprite.png?url';
import capcutImg from '../assets/optimized/capcut.jpg?url';
import davinciImg from '../assets/optimized/davinci.png?url';
import ffmpegImg from '../assets/optimized/ffmpeg.png?url';
import mkvtoolnixImg from '../assets/optimized/mkvtoolnix.png?url';
import unityImg from '../assets/optimized/unity.png?url';
import afterEffectsImg from '../assets/optimized/after effects.png?url';
import mayaImg from '../assets/optimized/maya.png?url';
import photoshopImg from '../assets/optimized/photoshop.png?url';
import premiereImg from '../assets/optimized/premiere.png?url';
import substanceImg from '../assets/optimized/substance.png?url';
import zbrushImg from '../assets/optimized/zbrush.png?url';
import unrealImg from '../assets/optimized/unreal.svg?url';
import microsoftWordImg from '../assets/optimized/microsoft_word.png?url';
import microsoftExcelImg from '../assets/optimized/microsoft_excel.png?url';
import microsoftPowerpointImg from '../assets/optimized/microsoft_powerpoint.png?url';
import affinityImg from '../assets/optimized/affinity.png?url';
import handbrakeImg from '../assets/optimized/handbrake.png?url';
import meguiImg from '../assets/optimized/megui.png?url';
import veedub64Img from '../assets/optimized/veedub64.png?url';
import riderImg from '../assets/optimized/rider.png?url';
import copilotImg from '../assets/optimized/copilot.png?url';
import antigravityImg from '../assets/optimized/antigravity.png?url';
import vscodeImg from '../assets/optimized/vscode.png?url';

const IMAGE_MAP = {
  audacity: audacityImg, blender: blenderImg, brainstorm: brainstormImg, canva: canvaImg, aseprite: asepriteImg,
  capcut: capcutImg, davinci: davinciImg, ffmpeg: ffmpegImg, mkvtoolnix: mkvtoolnixImg, unity: unityImg,
  after_effects: afterEffectsImg, maya: mayaImg, photoshop: photoshopImg, premiere: premiereImg, substance: substanceImg,
  zbrush: zbrushImg, unreal: unrealImg, word: microsoftWordImg, excel: microsoftExcelImg, powerpoint: microsoftPowerpointImg,
  affinity: affinityImg, handbrake: handbrakeImg, megui: meguiImg, veedub64: veedub64Img, rider: riderImg,
  copilot: copilotImg, antigravity: antigravityImg, vscode: vscodeImg,
};

export default function SkillsGrid({ activeRole = 'all' }) {
  const { language } = useTranslation();

  const categories = (skillCategoriesOrder[activeRole] || skillCategoriesOrder.all)
    .map((id) => skillCategories.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="md:columns-2 gap-x-10">
      {categories.map((cat) => (
        <div key={cat.id} className="break-inside-avoid mb-7 md:mb-9">
          <p className="text-ink-light font-bold uppercase tracking-[0.15em] text-xs mb-3 pb-2 border-b border-border">
            {cat.title[language] || cat.title.es}
          </p>

          {/* Móvil: chips compactos icono + nombre, sin descripción */}
          <ul className="flex sm:hidden flex-wrap gap-x-4 gap-y-2.5">
            {cat.items.map((skillId) => (
              <li key={skillId} className="group flex items-center gap-1.5 text-sm font-semibold text-ink">
                {IMAGE_MAP[skillId] && (
                  <img src={IMAGE_MAP[skillId]} alt="" className="w-4 h-4 object-contain grayscale group-hover:grayscale-0 transition-[filter] duration-300" />
                )}
                {allSkills[skillId]?.name || skillId}
              </li>
            ))}
          </ul>

          {/* Escritorio: lista con descripción, icono a color al pasar el ratón */}
          <ul className="hidden sm:flex flex-col gap-2.5">
            {cat.items.map((skillId) => (
              <li key={skillId} className="group flex items-baseline gap-2.5 text-sm leading-snug">
                <span className="w-4 h-4 shrink-0 translate-y-0.5 flex items-center justify-center">
                  {IMAGE_MAP[skillId] && (
                    <img src={IMAGE_MAP[skillId]} alt="" className="w-4 h-4 object-contain grayscale group-hover:grayscale-0 transition-[filter] duration-300" />
                  )}
                </span>
                <span>
                  <span className="font-semibold text-ink">{allSkills[skillId]?.name || skillId}</span>
                  <span className="text-ink-light"> — {allSkills[skillId]?.description[language] || allSkills[skillId]?.description.es}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
