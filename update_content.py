import os

file_path = r'c:\Users\mario\Documents\git\portfolio\src\data\content.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Colorin - Correcting the whole object to ensure it's perfect
new_colorin_long_desc = """        longDescription: {
            es: `## INTRODUCCIÓN

Diseño y desarrollo de Colorín Decolorado, un cortometraje de animación híbrida orientado al público infantil elaborado en el marco del Trabajo de Fin de Grado de Comunicación Audiovisual con mención en Ideación y Creación de Contenidos Audiovisuales (USC).

La propuesta combina diferentes técnicas visuales y narrativas con la finalidad de explorar el potencial expresivo de la animación como herramienta de aprendizaje y crecimiento emocional, abordando los fundamentos teóricos del cine infantil y la animación, así como el proceso completo de preproducción del proyecto y la realización de tres teasers como muestra práctica, y una reflexión crítica sobre las decisiones adoptadas y los retos técnicos y conceptuales encontrados durante el proceso.

## TEASERS

A continuación se presentan los tres teasers desarrollados como muestra práctica del proyecto:

<div class="custom-video-carousel"><div><h3>Teaser Nero</h3><p>Presentación de Nero, el gato protagonista de Colorín Decolorado</p><iframe src="https://player.vimeo.com/video/1104936330" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div><h3>Teaser Coral</h3><p>Presentación de Coral, la niña protagonista de Colorín Decolorado</p><iframe src="https://player.vimeo.com/video/1104936347" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div><h3>Teaser Craión</h3><p>Presentación de Craión, el sabio protagonista de Colorín Decolorado</p><iframe src="https://player.vimeo.com/video/1104936375" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div></div>

## OBJETIVOS

Este Trabajo de Fin de Grado tiene como objetivo cumplido centrarse en la experimentación práctica de distintas técnicas de animación para extraer sus ventajas y limitaciones, y así sentar las bases de un flujo de trabajo viable para la ideación de un cortometraje de animación —Colorín Decolorado— y la realización de tres teasers demostrativos.

Para alcanzar dicho objetivo de manera ordenada, la exploración fue guiada a través de los siguientes objetivos secundarios:

- **Elaboración de un marco teórico específico** sobre las técnicas de animación y las temáticas tratadas, que sirve de base conceptual para la experimentación práctica, justificando las decisiones metodológicas y orientando todo el proceso.

- **Definición y categorización de las distintas técnicas de animación utilizadas** —2D full-frame, 3D e integración con live-action, entre otras—, identificando sus rasgos formales y técnicos.

- **Demostración del sentido narrativo y visual** de dichas técnicas en el cortometraje, así como representación práctica mediante pequeños prototipos aplicados a diferentes fragmentos expositivos de los teasers.

- **Diseño de los flujos de trabajo de cada teaser** con la finalidad de integrar de forma coherente las técnicas seleccionadas, estableciendo la secuencia de pasos y las herramientas necesarias para optimizar la eficacia.

- **Definición d'un fluxo de traballo global** que recolle a metodoloxía a seguir para a potencial elaboración da peza final.

## DIAPOSITIVAS DE LA DEFENSA

Las siguientes imágenes resumen de forma visual el proceso de elaboración del Trabajo de Fin de Grado, y sirvieron como apoyo para la presentación realizada frente a un tribunal académico en septiembre de 2025.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1); width: 100%; max-width: 800px;" height="450" src="https://www.canva.com/design/DAGyYsuIFkI/C7y8eMt1L-a6xJPKkImS_Q/view?embed" allowfullscreen></iframe>

## RESULTADOS

Los resultados de este proyecto se dividen en 2 vertientes fundamentales: aquellos asociados al cortometraje completo y aquelotros vinculados a los tres teasers.

Del cortometraje podemos extraer los siguientes rendimientos:

- Un guión final completo.
- Un storyboard completamente desarrollado y dos fragmentos de animatic.
- El diseño pormenorizado de los protagonistas y de los personajes secundarios.
- Una propuesta visual específica y definida.
- La base para una potencial producción futura completa.

De los teasers obtenemos:

- 3 fragmentos animados tangibles.
- La demostración de la viabilidad artística y técnica del proyecto.
- La aplicación total y fundamentada de un pipeline adaptado a las necesidades concretas.
- Material promocional para el conjunto de la obra.
- Feedback positivo fruto de la demostración pública de los fragmentos.

### Flujo de Trabajo

**Preproducción**: Concepto, Guión, Storyboard, Animatic, Diseño de personajes, Propuesta visual.

**Producción**: Layout, Animación bidimensional, Animación tridimensional, Efectos, Elementos live action, Composición.

**Postproducción**: Montaje, Etalonaje, Máscaras de capa, Transiciones, Diseño y mezcla de sonido, Difusión y promoción.

## GALERÍA DE IMÁGENES

<div class="custom-gallery"><div><img src="/images/colorin2.avif" alt="Colorín Decolorado - Escena 2" /></div><div><img src="/images/colorin3.avif" alt="Colorín Decolorado - Escena 3" /></div><div><img src="/images/colorin4.avif" alt="Colorín Decolorado - Escena 4" /></div><div class="tall"><img src="/images/colorin5.avif" alt="Colorín Decolorado - Escena 5" /></div><div class="wide"><img src="/images/colorin6.avif" alt="Colorín Decolorado - Escena 6" /></div><div><img src="/images/colorin7.avif" alt="Colorín Decolorado - Escena 7" /></div><div><img src="/images/colorin8.avif" alt="Colorín Decolorado - Escena 8" /></div><div class="tall"><img src="/images/colorin9.avif" alt="Colorín Decolorado - Escena 9" /></div><div><img src="/images/colorin10.avif" alt="Colorín Decolorado - Escena 10" /></div><div><img src="/images/colorin11.avif" alt="Colorín Decolorado - Escena 11" /></div></div>`,
            ca: `## INTRODUCCIÓ

Disseny i desenvolupament de Colorín Decolorat, una curtmetratge de animació híbrida orientada al públic infantil elaborada en el marc del Treball de Fi de Grau de Comunicació Audiovisual amb menció en Ideació i Creació de Continguts Audiovisuals (USC).

La proposta combina diferents tècniques visuals i narratives amb la finalitat d'explorar el potencial expressiu de l'animació com a ferramenta d'aprenentatge i creixement emocional, abordant els fonaments teòrics del cinema infantil i l'animació, així com el procés complet de preproducció del projecte i la realització de tres teasers com a mostra pràctica, i una reflexió crítica sobre les decisions adoptades i els reptes tècnics i conceptuals trobats durant el procés.

## TEASERS

A continuació es presenten els tres teasers desenvolupats com a mostra pràctica del projecte:

<div class="custom-video-carousel"><div><h3>Teaser Nero</h3><p>Presentació de Nero, el gat protagonista de Colorín Decolorat</p><iframe src="https://player.vimeo.com/video/1104936330" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div><h3>Teaser Coral</h3><p>Presentació de Coral, la nena protagonista de Colorín Decolorat</p><iframe src="https://player.vimeo.com/video/1104936347" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div><h3>Teaser Craió</h3><p>Presentació de Craió, el savi protagonista de Colorín Decolorat</p><iframe src="https://player.vimeo.com/video/1104936375" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div></div>

## OBJECTIUS

Aquest Treball de Fi de Grau té com a objectiu cumprid centro-se en l'experimentació pràctica de diferents tècniques d'animació per extreure les seves avantatges i limitacions, i així sentar les bases d'un flux de treball viable per a la ideació d'una curtmetratge d'animació —Colorín Decolorat— i la realització de tres teasers demostratius.

Per assolir aquest objectiu de manera ordenada, l'exploració va ser guiada a través dels següents objectius secundaris:

- **Elaboració d'un marc teòric específic** sobre les tècniques d'animació i les temàtiques tractades, que serveix de base conceptual per a l'experimentació pràctica, justificant les decisions metodològiques i orientant tot el procés.

- **Definició i categorització de les distintes tècniques d'animació utilitzades** —2D full-frame, 3D i integració amb live-action, entre altres—, identificant els seus trets formals i tècnics.

- **Demostració del sentit narratiu i visual** d'aquestes tècniques a la curtmetratge, així como representació pràctica mitjançant petits prototips aplicats a diferents fragments expositius dels teasers.

- **Disseny dels fluxos de treball de cada teaser** amb la finalitat d'integrar de forma coherent les tècniques seleccionades, establint la seqüència de passos i les eines necessàries per optimitzar l'eficàcia.

- **Definició d'un flux de treball global** que recull la metodologia a seguir per a la potencial elaboració de la peça final.

## DIAPOSITIVES DE LA DEFENSA

Les següents imatges resumeixen de forma visual el procés d'elaboració del Treball de Fi de Grau, i van servir com a suport per a la presentació realitzada davant un tribunal acadèmic en setembre de 2025.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1); width: 100%; max-width: 800px;" height="450" src="https://www.canva.com/design/DAGyYsuIFkI/C7y8eMt1L-a6xJPKkImS_Q/view?embed" allowfullscreen></iframe>

## GALERIA D'IMATGES

<div class="custom-gallery"><div><img src="/images/colorin2.avif" alt="Colorín Decolorat - Escena 2" /></div><div><img src="/images/colorin3.avif" alt="Colorín Decolorat - Escena 3" /></div><div><img src="/images/colorin4.avif" alt="Colorín Decolorat - Escena 4" /></div><div><img src="/images/colorin5.avif" alt="Colorín Decolorat - Escena 5" /></div><div><img src="/images/colorin6.avif" alt="Colorín Decolorat - Escena 6" /></div><div><img src="/images/colorin7.avif" alt="Colorín Decolorat - Escena 7" /></div><div><img src="/images/colorin8.avif" alt="Colorín Decolorat - Escena 8" /></div><div><img src="/images/colorin9.avif" alt="Colorín Decolorat - Escena 9" /></div><div><img src="/images/colorin10.avif" alt="Colorín Decolorat - Escena 10" /></div><div><img src="/images/colorin11.avif" alt="Colorín Decolorat - Escena 11" /></div></div>

## RESULTATS

Els resultats d'aquest projecte es divideixen en 2 vertents fonamentals: aquells associats a la curtmetratge completa i aquells vinculats als tres teasers.

De la curtmetratge podem extreure els següents rendiments:

- Un guió final complet.
- Un storyboard completament desenvolupat i dos fragments d'animatic.
- O disseny pormenoritzat dels protagonists i dels personatges secundaris.
- Una proposta visual específica i definida.
- La base per a una potencial producció futura completa.

Dels teasers obtenim:

- 3 fragments animats tangibles.
- La demostració de la viabilitat artística i tècnica del projecte.
- L'aplicació total i fonamentada d'un pipeline adaptat a les necessitats concretes.
- Material promocional per al conjunt de l'obra.
- Feedback positiu froito da demostración pública dos fragments.

### Flux de Treball

**Preproducció**: Concepte, Guió, Storyboard, Animatic, Disseny de personagges, Proposta visual.

**Producció**: Layout, Animació bidimensional, Animació tridimensional, Efectes, Elements live action, Composició.

**Postproducció**: Muntatge, Etalonaje, Màscares de capa, Transicions, Disseny i mescla de so, Difusió i promoció.`,
            en: `## INTRODUCTION

Design and development of Colorín Decolorado, a hybrid animation short film oriented towards children, created as a Bachelor Thesis in Audiovisual Communication with mention in Ideation and Creation of Audiovisual Content (USC).

The proposal combines different visual and narrative techniques to explore the expressive potential of animation as a learning and emotional growth tool, addressing the theoretical foundations of children's cinema and animation, as well as the complete pre-production process and the creation of three demo teasers, with critical reflection on decisions made and technical and conceptual challenges encountered during the process.

## TEASERS

Below are the three teasers developed as a practical demonstration of the project:

<div class="custom-video-carousel"><div><h3>Teaser Nero</h3><p>Presentation of Nero, the cat protagonist of Colorín Decolorado</p><iframe src="https://player.vimeo.com/video/1104936330" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div><h3>Teaser Coral</h3><p>Presentation of Coral, the girl protagonist of Colorín Decolorado</p><iframe src="https://player.vimeo.com/video/1104936347" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div><h3>Teaser Craión</h3><p>Presentation of Craión, the wise protagonist of Colorín Decolorado</p><iframe src="https://player.vimeo.com/video/1104936375" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div></div>

## OBJECTIVES

This Bachelor Thesis aims to focus on practical experimentation with different animation techniques to extract their advantages and limitations, thus laying the foundation for a viable workflow for ideating an animated short film—Colorín Decolorado— and creating three demo teasers.

To achieve this goal in an organized manner, the exploration was guided through the following secondary objectives:

- **Development of a specific theoretical framework** on animation techniques and covered topics, serving as a conceptual basis for practical experimentation, justifying methodological decisions and guiding the entire process.

- **Definition and categorization of different animation techniques used** —2D full-frame, 3D and live-action integration, among others—, identifying their formal and technical characteristics.

- **Demonstration of narrative and visual meaning** of these techniques in the short film, as well as practical representation through small prototypes applied to different fragments of the teasers.

- **Design of workflow pipelines for each teaser** to coherently integrate selected techniques, establishing the sequence of steps and tools necessary to optimize efficiency.

- **Definition of a global workflow** that outlines the methodology to follow for potential creation of the final piece.

## DEFENSE PRESENTATION SLIDES

The following images visually summarize the process of developing the Bachelor Thesis and served as support for the presentation given before an academic committee in September 2025.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1); width: 100%; max-width: 800px;" height="450" src="https://www.canva.com/design/DAGyYsuIFkI/C7y8eMt1L-a6xJPKkImS_Q/view?embed" allowfullscreen></iframe>

## IMAGE GALLERY

<div class="custom-gallery"><div><img src="/images/colorin2.avif" alt="Colorín Decolorado - Scene 2" /></div><div><img src="/images/colorin3.avif" alt="Colorín Decolorado - Scene 2" /></div><div><img src="/images/colorin4.avif" alt="Colorín Decolorado - Scene 4" /></div><div class="tall"><img src="/images/colorin5.avif" alt="Colorín Decolorado - Scene 5" /></div><div class="wide"><img src="/images/colorin6.avif" alt="Colorín Decolorado - Scene 6" /></div><div><img src="/images/colorin7.avif" alt="Colorín Decolorado - Scene 7" /></div><div><img src="/images/colorin8.avif" alt="Colorín Decolorado - Scene 8" /></div><div class="tall"><img src="/images/colorin9.avif" alt="Colorín Decolorado - Scene 9" /></div><div><img src="/images/colorin10.avif" alt="Colorín Decolorado - Scene 10" /></div><div><img src="/images/colorin11.avif" alt="Colorín Decolorado - Scene 11" /></div></div>

## RESULTS

The results of this project are divided into 2 fundamental aspects: those associated with the complete short film and those linked to the three teasers.

From the short film we can extract the following outputs:

- A complete final script.
- A fully developed storyboard and two animatic fragments.
- Detailed design of protagonists and secondary characters.
- A specific and defined visual proposal.
- The foundation for potential complete future production.

From the teasers we obtain:

- 3 tangible animated clips.
- Demonstration of the artistic and technical viability of the project.
- Total and well-founded application of a pipeline adapted to specific needs.
- Promotional material for the overall work.
- Positive feedback from public demonstration of the clips.

### Workflow

**Pre-production**: Concept, Script, Storyboard, Animatic, Character Design, Visual Proposal.

**Production**: Layout, 2D Animation, 3D Animation, Effects, Live Action Elements, Compositing.

**Post-production**: Editing, Color Grading, Layer Masks, Transitions, Sound Design and Mixing, Distribution and Promotion.`,
            gl: `## INTRODUCIÓN

Deseño e desenvolvemento de Colorín Decolorado, unha curtametraxe de animación híbrida orientada ao público infantil elaborada como TFG en Comunicación Audiovisual cunha mención en Ideación e Creación de Contidos Audiovisuais (USC).

A proposta combina diferentes técnicas visuais e narrativas coa finalidade de explorar o potencial expresivo da animación como ferramenta de aprendizaxe e crecemento emocional, abordando os fundamentos teóricos do cine infantil e a animación, así como o proceso completo de preprodución do proxecto e a realización de tres teasers como mostra práctica, e unha reflexión crítica sobre as decisións adoptadas e os retos técnicos e conceptuais atopados durante o proceso.

## TEASERS

A continuación preséntanse os tres teasers desenvolvidos como mostra práctica do proxecto:

<div class="custom-video-carousel"><div><h3>Teaser Nero</h3><p>Presentación de Nero, o gato protagonista de Colorín Decolorado</p><iframe src="https://player.vimeo.com/video/1104936330" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div><h3>Teaser Coral</h3><p>Presentación de Coral, a nena protagonista de Colorín Decolorado</p><iframe src="https://player.vimeo.com/video/1104936347" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div><h3>Teaser Craión</h3><p>Presentación de Craión, o sabio protagonista de Colorín Decolorado</p><iframe src="https://player.vimeo.com/video/1104936375" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div></div>

## OBXECTIVOS

Este Traballo de Fin de Grao ten como obxectivo cumprido centrarse na experimentación práctica de distintas técnicas de animación para extraer as súas vantaxes e limitacións, e así sentar as bases dun fluxo de traballo viable para a ideación dunha curtametraxe de animación —Colorín Decolorado— e a realización de tres teasers demostrativos.

Para alcanzar ese obxectivo de maneira ordenada, a exploración foi guiada a través dos seguintes obxectivos secundarios:

- **Elaboración dun marco teórico específico** sobre as técnicas de animación e as temáticas tratadas, que serve de base conceptual para a experimentación práctica, xustificando as decisións metodolóxicas e orientando todo o proceso.

- **Definición e categorización das distintas técnicas de animación utilizadas** —2D full-frame, 3D e integración con live-action, entre outras—, identificando os seus trazos formais e técnicos.

- **Demostración do sentido narrativo e visual** desas técnicas na curtametraxe, así como representación práctica mediante pequenos prototipos aplicados a diferentes fragmentos expositivos dos teasers.

- **Deseño dos fluxos de traballo de cada teaser** coa finalidade de integrar de forma coherente as técnicas seleccionadas, establecendo a secuencia de pasos e as ferramentas necesarias para optimizar a eficacia.

- **Definición dun fluxo de traballo global** que recolla a metodoloxía a seguir para a potencial elaboración da peza final.

## DIAPOSITIVES DA DEFENSA

As seguintes imaxes resumen de forma visual o proceso de elaboración do Traballo de Fin de Grao, e serviron como apoio para a presentación realizada fronte a un tribunal académico en setembro de 2025.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1); width: 100%; max-width: 800px;" height="450" src="https://www.canva.com/design/DAGyYsuIFkI/C7y8eMt1L-a6xJPKkImS_Q/view?embed" allowfullscreen></iframe>

## GALERÍA DE IMAXES

<div class="custom-gallery"><div><img src="/images/colorin2.avif" alt="Colorín Decolorado - Escena 2" /></div><div><img src="/images/colorin3.avif" alt="Colorín Decolorado - Escena 3" /></div><div><img src="/images/colorin4.avif" alt="Colorín Decolorado - Escena 4" /></div><div><img src="/images/colorin5.avif" alt="Colorín Decolorado - Escena 5" /></div><div><img src="/images/colorin6.avif" alt="Colorín Decolorado - Escena 6" /></div><div><img src="/images/colorin7.avif" alt="Colorín Decolorado - Escena 7" /></div><div><img src="/images/colorin8.avif" alt="Colorín Decolorado - Escena 8" /></div><div><img src="/images/colorin9.avif" alt="Colorín Decolorado - Escena 9" /></div><div><img src="/images/colorin10.avif" alt="Colorín Decolorado - Escena 10" /></div><div><img src="/images/colorin11.avif" alt="Colorín Decolorado - Escena 11" /></div></div>

## RESULTADOS

Os resultados deste proxecto divídense en 2 vertentes fundamentais: aqueles asociados á curtametraxe completa e aqueles vinculados aos tres teasers.

Da curtametraxe podemos extraer os seguintes rendementos:

- Un guión final completo.
- Un storyboard completamente desenvolvido e dous fragmentos de animatic.
- O deseño pormenorizado dos protagonistas e dos personaxes secundarios.
- Unha proposta visual específica e definida.
- A base para unha potencial produción futura completa.

Dos teasers obtemos:

- 3 fragmentos animados tanxibles.
- A demostración da viabilidade artística e técnica do proxecto.
- A aplicación total e fundamentada dun pipeline adaptado ás necesidades concretas.
- Material promocional para o conxunto da obra.
- Feedback positivo froito da demostración pública dos fragmentos.

### Fluxo de Traballo

**Preprodución**: Concepto, Guión, Storyboard, Animatic, Deseño de personaxes, Proposta visual.

**Produución**: Layout, Animación bidimensional, Animación tridimensional, Efectos, Elementos live action, Composición.

**Postprodución**: Montaxe, Etalonaje, Máscaras de capa, Transicións, Deseño e mestura de son, Difusión e promoción.`
        },"""

# Use a more robust split method or regex if needed, 
# but for now I'll just look for the id: 'colorin' block.

import re

# Find the start of colorin project
start_index = content.find("id: 'colorin',")
if start_index == -1:
    print("Could not find colorin project start")
    exit(1)

# Find the longDescription block within that project
long_desc_start = content.find("longDescription: {", start_index)
if long_desc_start == -1:
    print("Could not find longDescription start")
    exit(1)

# Find the end of longDescription block
# It ends with }, followed by image: or similar
long_desc_end_search = content.find("},", long_desc_start + 100) # skip a bit
# Actually, let's look for the next property after longDescription
next_prop = content.find("image: '/images/colorin1.png',", long_desc_end_search)

# The end of our replacement should be right before the next property
# but we want to include the closing }, 

# Let's verify we have the right content
old_desc = content[long_desc_start : next_prop].strip()
if not old_desc.endswith("}"):
    # try to find the actual closing brace
    last_brace = content.rfind("}", long_desc_start, next_prop)
    actual_end = last_brace + 1
else:
    actual_end = next_prop

replaced_content = content[:long_desc_start] + new_colorin_long_desc.strip() + "," + content[actual_end:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(replaced_content)

print("Colorin longDescription updated successfully")
