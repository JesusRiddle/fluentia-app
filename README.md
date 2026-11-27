# Fluentia

Practica vocabulario y expresiones desde el español con tarjetas y ejercicios. El contenido está organizado por nivel, categoría y tema.

**[Abrir Fluentia](https://jesusriddle.github.io/fluentia-app/)**

## Cómo usarla

1. Elige un idioma: inglés, francés, italiano, portugués o alemán. El alemán se incorpora por módulo, así que todavía no está disponible en todos los temas.
2. Usa **Buscar tema** para encontrar un mazo o **Buscar palabras y frases** para encontrar tarjetas en todos los mazos. Prueba con «coladera baño» y abre la tarjeta que te interese.
3. En **Flashcards**, voltea las tarjetas, escucha la pronunciación y marca las que quieras repasar. En los módulos que ya incluyen ejemplos, puedes leer y escuchar la frase en el reverso y ver su traducción al español.
4. En **Práctica**, escucha la palabra o expresión y elige su equivalente en español.

## Desarrollo local

Fluentia usa React y Vite. Usa **Node.js 22 (22.13.0 o posterior)** y npm.

```bash
git clone https://github.com/JesusRiddle/fluentia-app.git
cd fluentia-app
npm ci
npm run dev
```

Abre la URL que indique Vite. Antes de abrir un PR, ejecuta `npm run lint` y `npm run build`. Puedes probar la compilación con `npm run preview`.

## Editar contenido

- Los mazos están en [`public/data/`](public/data/). Sigue la [guía editorial](GUIA_EDITORIAL.md) para revisar traducciones, ejemplos e identificadores.
- Registra los mazos nuevos en [`src/data/modules.js`](src/data/modules.js) con su nivel y categoría. Los conteos y los índices de búsqueda se generan al iniciar o compilar la app.

Los PR hacia `main` se validan con GitHub Actions. Cuando se integra un cambio a `main`, se publica automáticamente en GitHub Pages si pasan las validaciones.

Proyecto de [Víctor Pacheco](https://github.com/JesusRiddle).
