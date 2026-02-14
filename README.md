# Valentine React para Anote 💘

Proyecto creado con **React + Vite**.

## Cómo usarlo

1. Abre una terminal en esta carpeta (`valentine-react-anote`).
2. Instala dependencias:

   ```bash
   npm install
   ```

3. Ejecuta en modo desarrollo:

   ```bash
   npm run dev
   ```

4. Abre el enlace que te indique Vite (normalmente `http://localhost:5173`).

## Imágenes

Coloca tus fotos en:

- `public/imagenes/`

Con los siguientes nombres (extensión **.jpg**):

- `cita_1` a `cita_10` (en el proyecto se usan `cita_1` a `cita_5`)
- `beso_1` a `beso_5`
- `primera_vez_1` a `primera_vez_5`
- `caracol_1` a `caracol_5` (en el proyecto se usan para la sección **primer hijo**)
- `navidad_1` a `navidad_5`
- `año_nuevo_1` a `año_nuevo_5`
- `propuesta_1` a `propuesta_10`
- `fotos_ultima_1` a `fotos_ultima_30`

Ejemplos:

- `public/imagenes/cita_1.jpg`
- `public/imagenes/año_nuevo_3.jpg`
- `public/imagenes/fotos_ultima_17.jpg`

> Nota: el nombre `año_nuevo_X.jpg` contiene **ñ**. Si te da problema al nombrar archivos en tu computadora, dímelo y lo adapto a `ano_nuevo_X.jpg`.

## Secciones y preguntas

1. ¿Te acuerdas de nuestra primera cita?
2. ¿Te acuerdas de nuestro primer beso?
3. ¿Te acuerdas de nuestra primera vez?
4. ¿Te acuerdas de nuestro primer hijo?
5. ¿Te acuerdas de nuestra primera Navidad?
6. ¿Te acuerdas de nuestro primer año nuevo?
7. ¿Te acuerdas de cuando te pedí ser novios? (collage de 10 fotos)
8. ¿Quieres ser mi Valentine? (collage final de 30 fotos)

## Optimización para ahorrar RAM/recursos (recomendado)

La app carga imágenes **solo cuando entran al viewport** (lazy real con IntersectionObserver) y reduce animaciones si el dispositivo/usuario lo solicita.

Aun así, la mayor diferencia la hacen tus fotos:

- Exporta tus imágenes a **1600px de ancho** (máximo) para desktop.
- En móvil, con **1200px** es más que suficiente.
- Calidad JPG: **70–80%** (se ve muy bien y baja muchísimo el peso).

## Extensión de imágenes (.jpeg y .jpg)

El proyecto **prefiere `.jpeg`**, pero si alguna imagen está como `.jpg` también la mostrará automáticamente (fallback).  
Recomendación: usa un solo tipo si puedes, pero ya no es obligatorio.

## Fotos completas (sin recorte)

Las fotos se muestran **completas** (sin recortes) usando `object-fit: contain`.  
Eso puede dejar márgenes (espacio) en algunas fotos, pero evita que se “corten”.
