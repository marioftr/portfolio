// Modelos 3D (GLB) de cada proyecto, mostrados en la lista de la página del
// proyecto. `file` es el nombre del GLB dentro de /public/models.
const n = (es, en, ca, gl) => ({ es, en, ca, gl });

export const MODEL_GROUPS = {
  props: n('Props y herramientas', 'Props and tools', 'Props i eines', 'Props e ferramentas'),
  boxes: n('Boxes de caballos', 'Horse stalls', 'Boxes de cavalls', 'Boxes de cabalos'),
  structure: n('Estructura del establo', 'Stable structure', 'Estructura de l\'estable', 'Estrutura do establo'),
};

const establo = [
  // Props y herramientas
  { file: 'WoodCart_LP', group: 'props', name: n('Carro de madera', 'Wooden cart', 'Carro de fusta', 'Carro de madeira') },
  { file: 'Wheelbarrow_LP', group: 'props', name: n('Carretilla', 'Wheelbarrow', 'Carretó', 'Carretilla') },
  { file: 'Barrel_LP', group: 'props', name: n('Barril', 'Barrel', 'Barril', 'Barril') },
  { file: 'Bucket_LP', group: 'props', name: n('Cubo', 'Bucket', 'Galleda', 'Balde') },
  { file: 'Trough_LP', group: 'props', name: n('Abrevadero', 'Water trough', 'Abeurador', 'Bebedoiro') },
  { file: 'HorseBridle_LP', group: 'props', name: n('Brida de caballo', 'Horse bridle', 'Brida de cavall', 'Brida de cabalo') },
  { file: 'HorseshoeRack_LP', group: 'props', name: n('Soporte de herraduras', 'Horseshoe rack', 'Suport de ferradures', 'Soporte de ferraduras') },
  { file: 'Boot_LP', group: 'props', name: n('Bota izquierda', 'Left boot', 'Bota esquerra', 'Bota esquerda') },
  { file: 'BootRigh_LP', group: 'props', name: n('Bota derecha', 'Right boot', 'Bota dreta', 'Bota dereita') },
  { file: 'Lamp_LP', group: 'props', name: n('Lámpara', 'Lantern', 'Llum', 'Lámpada') },
  { file: 'Ladder_LP', group: 'props', name: n('Escalera', 'Ladder', 'Escala', 'Escaleira') },
  { file: 'Pitchfork_LP', group: 'props', name: n('Horca', 'Pitchfork', 'Forca', 'Forca') },
  { file: 'Rake_LP', group: 'props', name: n('Rastrillo', 'Rake', 'Rasclet', 'Ancinho') },
  { file: 'Shovel_LP', group: 'props', name: n('Pala', 'Shovel', 'Pala', 'Pa') },
  { file: 'HayTied_LP', group: 'props', name: n('Fardo de heno', 'Hay bale', 'Bala de fenc', 'Fardo de feo') },
  { file: 'HayPile1_LP', group: 'props', name: n('Montón de heno 1', 'Hay pile 1', 'Munt de fenc 1', 'Monte de feo 1') },
  { file: 'HayPile2_LP', group: 'props', name: n('Montón de heno 2', 'Hay pile 2', 'Munt de fenc 2', 'Monte de feo 2') },
  { file: 'HayPile3_LP', group: 'props', name: n('Montón de heno 3', 'Hay pile 3', 'Munt de fenc 3', 'Monte de feo 3') },
  // Boxes
  { file: 'StableBox_Door_LP', group: 'boxes', name: n('Puerta de box', 'Stall door', 'Porta de box', 'Porta de box') },
  { file: 'StableBox_DoorFrame_LP', group: 'boxes', name: n('Marco de puerta de box', 'Stall door frame', 'Marc de porta de box', 'Marco de porta de box') },
  { file: 'StableBox_Wall1_LP', group: 'boxes', name: n('Pared de box 1', 'Stall wall 1', 'Paret de box 1', 'Parede de box 1') },
  { file: 'StableBox_Wall2_LP', group: 'boxes', name: n('Pared de box 2', 'Stall wall 2', 'Paret de box 2', 'Parede de box 2') },
  { file: 'StableBox_Wall3_LP', group: 'boxes', name: n('Pared de box 3', 'Stall wall 3', 'Paret de box 3', 'Parede de box 3') },
  // Estructura
  { file: 'StableWall_Flat_LP', group: 'structure', name: n('Pared lisa', 'Plain wall', 'Paret llisa', 'Parede lisa') },
  { file: 'StableWall_Small_LP', group: 'structure', name: n('Pared pequeña', 'Small wall', 'Paret petita', 'Parede pequena') },
  { file: 'StableWall_FrontWindow_LP', group: 'structure', name: n('Pared con ventana frontal', 'Wall with front window', 'Paret amb finestra frontal', 'Parede con fiestra frontal') },
  { file: 'StableWall_SideWindow1_LP', group: 'structure', name: n('Pared con ventana lateral 1', 'Wall with side window 1', 'Paret amb finestra lateral 1', 'Parede con fiestra lateral 1') },
  { file: 'StableWall_SideWindow2_LP', group: 'structure', name: n('Pared con ventana lateral 2', 'Wall with side window 2', 'Paret amb finestra lateral 2', 'Parede con fiestra lateral 2') },
  { file: 'Stable_DoorBig_LP', group: 'structure', name: n('Puerta grande', 'Large door', 'Porta gran', 'Porta grande') },
  { file: 'Stable_DoorSmall_LP', group: 'structure', name: n('Puerta pequeña', 'Small door', 'Porta petita', 'Porta pequena') },
  { file: 'Stable_Column1_LP', group: 'structure', name: n('Columna 1', 'Column 1', 'Columna 1', 'Columna 1') },
  { file: 'Stable_Column2_LP', group: 'structure', name: n('Columna 2', 'Column 2', 'Columna 2', 'Columna 2') },
  { file: 'Stable_CeilingFlat_LP', group: 'structure', name: n('Techo plano', 'Flat ceiling', 'Sostre pla', 'Teito plano') },
  { file: 'Stable_CeilingTilted_LP', group: 'structure', name: n('Techo inclinado', 'Sloped ceiling', 'Sostre inclinat', 'Teito inclinado') },
  { file: 'Stable_SecondFloor_LP', group: 'structure', name: n('Segunda planta', 'Second floor', 'Segona planta', 'Segunda planta') },
].map((m) => ({ ...m, url: `/models/${m.file}.glb` }));

export const modelsByProject = { establo };
