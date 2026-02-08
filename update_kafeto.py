import os
import re

file_path = r'c:\Users\mario\Documents\git\portfolio\src\data\content.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_kafeto_long_desc = """        longDescription: {
            es: `## INTRODUCCIÓN
Render 3D animado en Blender de un anuncio publicitario de la marca imaginaria **Kafeto**, realizado en el marco de la materia **Animación y CGI** del Grado en Comunicación Audiovisual (USC).

La animación muestra la **construcción por piezas de una cafetera**, haciendo uso de diferentes herramientas de modelado tridimensional y simulación de líquidos y partículas de Blender.

<iframe width="100%" height="360" src="https://www.youtube.com/embed/k-AKIa1uzpA" title="Kafeto - Project Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## TÉCNICAS Y METODOLOGÍA

**Modelado 3D**: El modelado tridimensional de la cafetera fue realizado a partir de **imágenes de referencia de una cafetera real**. Tanto dicho modelo como los de objetos complementarios hacen uso de diversos **modificadores del programa**, siempre partiendo del modelado con primitivas.

**Texturas**: Las texturas alternan entre las de creación propia y las descargas de add-ons gratuitos como **Poliigon y BlenderKit** (apoyadas con una modificación personalizada posterior).

**Animación**: La animación de las diferentes partes de la cafetera fue realizada en cada objeto de manera individual, y consiste, en su mayor parte, en **traslaciones y rotaciones**. También se utilizan **modos de interpolación entre key-frames** predefinidos por el programa, como el "rebote" o "bounce" (en efectos dinámicos). El agua está conformada por un **sistema de partículas de "metaballs"** con texturas propias (transparencia, IOR 1.300, etc.), programadas para seguir un **campo de fuerza personalizado** con forma curva.

**Iluminación**: Simple, consistente en un **foco "spot" cenital animado** y en una **luz de área constante de frente**, así como un HDR prefabricado.

**Cámara**: La cámara cuenta con una **animación de seguimiento continuo** en la primera parte y con un **plano estático** en la segunda. La profundidad de campo, la distancia focal y la apertura del diafragma digitales están **animadas para mantener el enfoque**. El desenfoque forzado durante el logo también forma parte del proyecto de Blender, y no de la posproducción.

**Render**: Optimizado para ser realizado en **Cycles**.

**Posproducción**: Realizada en **Adobe Premiere Pro**. Consiste únicamente en un corte intermedio y en la superposición de dos cuadros de texto, sin modificar ningún otro parámetro como el color o la iluminación.

## GALERÍA DEL PROYECTO

<div class="custom-gallery"><div><img src="/images/kafeto2.avif" alt="Kafeto - Render 1" /></div><div><img src="/images/kafeto3.avif" alt="Kafeto - Render 2" /></div><div><img src="/images/kafeto4.avif" alt="Kafeto - Render 3" /></div><div><img src="/images/kafeto5.avif" alt="Kafeto - Render 4" /></div><div><img src="/images/kafeto6.avif" alt="Kafeto - Render 6" /></div><div><img src="/images/kafeto7.avif" alt="Kafeto - Render 7" /></div></div>`,
            ca: `## INTRODUCCIÓ
Render 3D animat en Blender d'un anunci publicitari de la marca imaginària **Kafeto**, realitzat en el marc de la matèria **Animació i CGI** del Grau en Comunicació Audiovisual (USC).

L'animació mostra la **construcció per peces d'una cafetera**, fent ús de diferents eines de modelatge tridimensional i simulació de líquids i partícules de Blender.

<iframe width="100%" height="360" src="https://www.youtube.com/embed/k-AKIa1uzpA" title="Kafeto - Project Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## TÈCNIQUES I METODOLOGIA

**Modelatge 3D**: El modelatge tridimensional de la cafetera va ser realitzat a partir d'**imatges de referència d'una cafetera real**. Tant aquest model com els d'objectes complementaris fan ús de diversos **modificadors del programa**, sempre partint del modelatge amb primitives.

**Textures**: Les textures alternen entre les de creació pròpia i les descàrregues d'add-ons gratuïts com **Poliigon i BlenderKit** (suportades amb una modificació personalitzada posterior).

**Animació**: L'animació de les diferents parts de la cafetera va ser realitzada en cada objecte de manera individual, i consisteix, en la seva major part, en **traslacions i rotacions**. També s'utilitzen **modes d'interpolació entre key-frames** predefinits pel programa, com el "rebot" o "bounce" (en efectes dinàmics). L'aigua està conformada per un **sistema de partícules de "metaballs"** amb textures pròpies (transparència, IOR 1.300, etc.), programades per seguir un **camp de força personalitzat** amb forma curva.

**Il·luminació**: Simple, consistent en un **foco "spot" cenital animat** i en una **llum d'àrea constant de front**, així com un HDR prefabricat.

**Càmera**: La càmera compta amb una **animació de seguiment continu** en la primera part i amb un **pla estàtic** en la segona. La profunditat de camp, la distància focal i l'obertura del diafragma digitals estan **animades per mantenir l'enfocament**. El desenfocament forçat durant el logo també forma part del projecte de Blender, i no de la postproducció.

**Render**: Optimitzat per ser realitzat en **Cycles**.

**Postproducció**: Realitzada en **Adobe Premiere Pro**. Consisteix únicament en un tall intermedi i en la superposició de dos quadres de text, sense modificar cap altre paràmetre com el color o la il·luminació.

## GALERIA DEL PROJECTE

<div class="custom-gallery"><div><img src="/images/kafeto2.avif" alt="Kafeto - Render 1" /></div><div><img src="/images/kafeto3.avif" alt="Kafeto - Render 2" /></div><div><img src="/images/kafeto4.avif" alt="Kafeto - Render 3" /></div><div><img src="/images/kafeto5.avif" alt="Kafeto - Render 4" /></div><div><img src="/images/kafeto6.avif" alt="Kafeto - Render 6" /></div><div><img src="/images/kafeto7.avif" alt="Kafeto - Render 7" /></div></div>`,
            en: `## INTRODUCTION
3D animated render in Blender for a commercial of the imaginary brand **Kafeto**, produced as part of the **Animation and CGI** course of the Bachelor's Degree in Audiovisual Communication (USC).

The animation shows the **assembly of a coffee machine** using different **3D modeling tools and fluid/particle simulations** in Blender.

<iframe width="100%" height="360" src="https://www.youtube.com/embed/k-AKIa1uzpA" title="Kafeto - Project Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## TECHNIQUES AND METHODOLOGY

**3D Modeling**: The 3D model was created from **reference images of a real coffee machine**. Both the main model and complementary objects use various **program modifiers**, always starting from primitive modeling.

**Textures**: Textures alternate between original creations and downloads from free add-ons like **Poliigon and BlenderKit** (enhanced with custom modifications).

**Animation**: Animation of different coffee machine parts was done individually on each object, consisting mainly of **translations and rotations**. **Interpolation modes between key-frames** predefined by the program are also used, such as "bounce" (in dynamic effects). Water is formed by a **"metaballs" particle system** with custom textures (transparency, IOR 1.300, etc.), programmed to follow a **custom force field** with curved shape.

**Lighting**: Simple setup with an **animated cenital "spot" light** and a **constant front area light**, plus a prefabricated HDR.

**Camera**: The camera features **continuous tracking animation** in the first part and a **static shot** in the second. Digital depth of field, focal distance, and aperture are **animated to maintain focus**. The forced blur during the logo is also part of the Blender project, not post-production.

**Render**: Optimized for **Cycles** rendering.

**Post-production**: Done in **Adobe Premiere Pro**. Consists only of intermediate cutting and text overlay, without modifying other parameters like color or lighting.

## PROJECT GALLERY

<div class="custom-gallery"><div><img src="/images/kafeto2.avif" alt="Kafeto - Render 1" /></div><div><img src="/images/kafeto3.avif" alt="Kafeto - Render 2" /></div><div><img src="/images/kafeto4.avif" alt="Kafeto - Render 3" /></div><div><img src="/images/kafeto5.avif" alt="Kafeto - Render 4" /></div><div><img src="/images/kafeto6.avif" alt="Kafeto - Render 6" /></div><div><img src="/images/kafeto7.avif" alt="Kafeto - Render 7" /></div></div>`,
            gl: `## INTRODUCIÓN
Render 3D animado en Blender dun anuncio publicitario da marca imaxinaria **Kafeto**, realizado no marco da materia **Animación e CGI** do Grao en Comunicación Audiovisual (USC).

A animación mostra a **construción por pezas dunha cafeteira**, facendo uso de diferentes ferramentas de modelado tridimensional e simulación de líquidos e partículas de Blender.

<iframe width="100%" height="360" src="https://www.youtube.com/embed/k-AKIa1uzpA" title="Kafeto - Project Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## TÉCNICAS E METODOLOXÍA

**Modelado 3D**: O modelado tridimensional da cafeteira foi realizado a partir de **imaxes de referencia dunha cafeteira real**. Tanto este modelo como os de obxectos complementarios fan uso de diversos **modificadores do programa**, sempre partindo do modelado con primitivas.

**Texturas**: As texturas alternan entre as de creación propia e as descargas de add-ons gratuítos como **Poliigon e BlenderKit** (apoiadas cunha modificación personalizada posterior).

**Animación**: A animación das diferentes partes da cafeteira foi realizada en cada obxecto de maneira individual, e consiste, na súa maior parte, en **traslacións e rotacións**. Tamén se utilizan **modos de interpolación entre key-frames** predefinidos polo programa, como o "rebote" ou "bounce" (en efectos dinámicos). A auga está conformada por un **sistema de partículas de "metaballs"** con texturas propias (transparencia, IOR 1.300, etc.), programadas para seguir un **campo de forza personalizado** con forma curva.

**Iluminación**: Simple, consistente nun **foco "spot" cenital animado** e nunha **luz de área constante de fronte**, así como un HDR prefabricado.

**Cámara**: A cámara conta cunha **animación de seguimento continuo** na primeira parte e cun **plano estático** na segunda. A profundidade de campo, a distancia focal e a apertura do diafragma dixitais están **animadas para manter o enfoque**. O desenfoque forzado durante o logo tamén forma parte do proxecto de Blender, e non da posprodución.

**Render**: Optimizado para ser realizado en **Cycles**.

**Posprodución**: Realizada en **Adobe Premiere Pro**. Consiste unicamente nun corte intermedio e na superposición de dous cadros de texto, sen modificar ningún outro parámetro como a cor ou a iluminación.

## GALERÍA DO PROXECTO

<div class="custom-gallery"><div><img src="/images/kafeto2.avif" alt="Kafeto - Render 1" /></div><div><img src="/images/kafeto3.avif" alt="Kafeto - Render 2" /></div><div><img src="/images/kafeto4.avif" alt="Kafeto - Render 3" /></div><div><img src="/images/kafeto5.avif" alt="Kafeto - Render 4" /></div><div><img src="/images/kafeto6.avif" alt="Kafeto - Render 6" /></div><div><img src="/images/kafeto7.avif" alt="Kafeto - Render 7" /></div></div>`
        },"""

# Find the start of kafeto project
start_index = content.find("id: 'kafeto',")
if start_index == -1:
    print("Could not find kafeto project start")
    exit(1)

# Find the longDescription block within that project
long_desc_start = content.find("longDescription: {", start_index)
if long_desc_start == -1:
    print("Could not find longDescription start")
    exit(1)

# Find the next property after longDescription
# It should be image: or roles: 
next_prop = content.find("image: '/images/kafeto1.avif',", long_desc_start)

# Let's verify we have the right content range
actual_end = next_prop

replaced_content = content[:long_desc_start] + new_kafeto_long_desc.strip() + "," + content[actual_end:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(replaced_content)

print("Kafeto longDescription updated successfully")
