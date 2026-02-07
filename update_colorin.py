#!/usr/bin/env python3
import json

# Leer el archivo actual
with open('src/data/content.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Encontrar el inicio del longDescription de Colorín
colorin_start = content.find("'colorin',")
if colorin_start == -1:
    print("No se encontró colorin")
    exit(1)

# Buscar el objeto longDescription dentro de colorin
colorin_section = content[colorin_start:colorin_start+100000]
long_desc_start = colorin_section.find("longDescription: {")

if long_desc_start == -1:
    print("No se encontró longDescription")
    exit(1)

# Nuevos textos para cada idioma
new_es = """## INTRODUCCIÓN

Diseño y desarrollo de Colorín Decolorado, un cortometraje de animación híbrida orientado al público infantil elaborado en el marco del Trabajo de Fin de Grado de Comunicación Audiovisual con mención en Ideación y Creación de Contenidos Audiovisuales (USC).

La propuesta combina diferentes técnicas visuales y narrativas con la finalidad de explorar el potencial expresivo de la animación como herramienta de aprendizaje y crecimiento emocional, abordando los fundamentos teóricos del cine infantil y la animación, así como el proceso completo de preproducción del proyecto y la realización de tres teasers como muestra práctica, y una reflexión crítica sobre las decisiones adoptadas y los retos técnicos y conceptuales encontrados durante el proceso.

## TEASERS

<div style="display: flex; gap: 15px; overflow-x: auto; padding: 20px 0; scroll-behavior: smooth;">
<div style="flex: 0 0 calc(100% - 30px); min-width: 350px;"><div style="background: #f5f5f5; border-radius: 12px; padding: 15px; text-align: center;"><h4 style="margin: 0 0 10px 0; font-size: 1rem;">Teaser Nero</h4><p style="margin: 0 0 10px 0; font-size: 0.85rem; color: #666;">Presentación de Nero, el gato protagonista</p><iframe src="https://player.vimeo.com/video/1104936330" style="width: 100%; height: 280px; border-radius: 8px; border: none;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div></div>
<div style="flex: 0 0 calc(100% - 30px); min-width: 350px;"><div style="background: #f5f5f5; border-radius: 12px; padding: 15px; text-align: center;"><h4 style="margin: 0 0 10px 0; font-size: 1rem;">Teaser Coral</h4><p style="margin: 0 0 10px 0; font-size: 0.85rem; color: #666;">Presentación de Coral, la niña protagonista</p><iframe src="https://player.vimeo.com/video/1104936347" style="width: 100%; height: 280px; border-radius: 8px; border: none;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div></div>
<div style="flex: 0 0 calc(100% - 30px); min-width: 350px;"><div style="background: #f5f5f5; border-radius: 12px; padding: 15px; text-align: center;"><h4 style="margin: 0 0 10px 0; font-size: 1rem;">Teaser Craión</h4><p style="margin: 0 0 10px 0; font-size: 0.85rem; color: #666;">Presentación de Craión, el sabio protagonista</p><iframe src="https://player.vimeo.com/video/1104936375" style="width: 100%; height: 280px; border-radius: 8px; border: none;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div></div>
</div>

## OBJETIVOS

Este Trabajo de Fin de Grado tiene como objetivo cumplido centrarse en la experimentación práctica de distintas técnicas de animación para extraer sus ventajas y limitaciones, y así sentar las bases de un flujo de trabajo viable para la ideación de un cortometraje de animación —Colorín Decolorado— y la realización de tres teasers demostrativos.

Para alcanzar dicho objetivo de manera ordenada, la exploración fue guiada a través de los siguientes objetivos secundarios:

- **Elaboración de un marco teórico específico** sobre las técnicas de animación y las temáticas tratadas, que sirve de base conceptual para la experimentación práctica, justificando las decisiones metodológicas y orientando todo el proceso.
- **Definición y categorización de las distintas técnicas de animación utilizadas** —2D full-frame, 3D e integración con live-action, entre otras—, identificando sus rasgos formales y técnicos.
- **Demostración del sentido narrativo y visual** de dichas técnicas en el cortometraje, así como representación práctica mediante pequeños prototipos aplicados a diferentes fragmentos expositivos de los teasers.
- **Diseño de los flujos de trabajo de cada teaser** con la finalidad de integrar de forma coherente las técnicas seleccionadas, estableciendo la secuencia de pasos y las herramientas necesarias para optimizar la eficacia.
- **Definición de un flujo de trabajo global** que recoge la metodología a seguir para la potencial elaboración de la pieza final.

## DIAPOSITIVAS DE LA DEFENSA

<div style="display: flex; justify-content: center; margin: 20px 0;"><iframe style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; max-width: 100%; width: 100%; height: 400px;" src="https://www.canva.com/design/DAGyYsuIFkI/C7y8eMt1L-a6xJPKkImS_Q/view?embed" allowfullscreen></iframe></div>

## RESULTADOS

Los resultados de este proyecto se dividen en 2 vertientes fundamentales: aquellos asociados al cortometraje completo y aquellos vinculados a los tres teasers.

### Cortometraje
- Un guión final completo.
- Un storyboard completamente desarrollado y dos fragmentos de animatic.
- El diseño pormenorizado de los protagonistas y de los personajes secundarios.
- Una propuesta visual específica y definida.
- La base para una potencial producción futura completa.

### Teasers
- 3 fragmentos animados tangibles que demuestran la viabilidad técnica y artística del proyecto.
- La aplicación total y fundamentada de un pipeline adaptado a las necesidades concretas.
- Material promocional para el conjunto de la obra.
- Feedback positivo fruto de la demostración pública de los fragmentos.

### Flujo de Trabajo Desarrollado

**Preproducción**: Concepto, Guión, Storyboard, Animatic, Diseño de personajes, Propuesta visual.

**Producción**: Layout, Animación bidimensional, Animación tridimensional, Efectos, Elementos live action, Composición.

**Postproducción**: Montaje, Etalonaje, Máscaras de capa, Transiciones, Diseño y mezcla de sonido, Difusión y promoción.

## GALERÍA DEL PROYECTO

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 20px;"><img src="/images/colorin2.avif" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" /><img src="/images/colorin3.avif" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" /><img src="/images/colorin4.avif" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" /><img src="/images/colorin5.avif" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" /><img src="/images/colorin6.avif" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" /><img src="/images/colorin7.avif" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" /><img src="/images/colorin8.avif" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" /><img src="/images/colorin9.avif" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" /><img src="/images/colorin10.avif" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" /><img src="/images/colorin11.avif" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" /></div>"""

print(new_es)
print("\n✅ Textos actualizados. Copia y pega el longDescription manualmente o usa esta información.")
