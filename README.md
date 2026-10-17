
# 🌍 FLUENTIA

**Aprende idiomas a tu ritmo.**

Aplicación web interactiva para estudiar vocabulario, expresiones y estructuras comunicativas en distintos idiomas, mediante tarjetas de estudio, ejercicios y herramientas de práctica.

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=github)](https://pages.github.com/)

### 🚀 Aplicación publicada

**[Abrir FLUENTIA](https://jesusriddle.github.io/fluentia-app/)**

## 📖 Descripción

FLUENTIA es una aplicación de aprendizaje de idiomas diseñada para facilitar el estudio autónomo mediante contenidos organizados por niveles, categorías y temas.

El español funciona como idioma de referencia, permitiendo estudiar:

- 🇬🇧 Inglés
- 🇫🇷 Francés
- 🇮🇹 Italiano
- 🇧🇷 Portugués

## ✨ Funcionalidades

- Contenido organizado por niveles de aprendizaje.
- Vocabulario y expresiones agrupados por temas.
- Tarjetas interactivas (flashcards).
- Modo de estudio y modo de práctica.
- Reproducción de pronunciaciones mediante síntesis de voz.
- Control de reproducción automática (Auto-Play).
- Temporizador para sesiones de estudio.
- Interfaz responsive para móvil y escritorio.
- Tema claro y oscuro.
- Selección del idioma objetivo.

## 🛠️ Tecnologías

| Tecnología | Propósito |
|---|---|
| React 19 | Interfaz y componentes |
| Vite 8 | Desarrollo y compilación |
| JavaScript / JSX | Lógica de aplicación |
| CSS | Diseño y responsividad |
| JSON | Contenido lingüístico |
| Web Speech API | Síntesis de voz |
| ESLint | Análisis estático |
| Git / GitHub | Control de versiones |
| GitHub Pages | Publicación web |

## 📁 Estructura del proyecto

```text
fluentia-app/
├── public/
│   └── data/               # Módulos de contenido JSON
├── scripts/
│   └── generate-card-counts.mjs
├── src/
│   ├── components/         # Componentes React
│   ├── App.jsx             # Componente principal
│   └── index.css           # Estilos globales
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 💻 Instalación y desarrollo local

### Requisitos

- Node.js compatible con la versión de Vite utilizada.
- npm.
- Git.
- Editor de código, preferentemente Visual Studio Code.

### 1. Clonar el repositorio

```bash
git clone https://github.com/JesusRiddle/fluentia-app.git
cd fluentia-app
```

### 2. Instalar dependencias

```bash
npm ci
```

`npm ci` instala las dependencias según `package-lock.json`. Para una instalación inicial sin un lockfile válido puede utilizarse `npm install`.

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Vite mostrará en la terminal la URL local para abrir la aplicación en el navegador.

Los cambios realizados en los archivos fuente se reflejan durante el desarrollo mediante Hot Module Replacement.

## ⚙️ Referencia de comandos

| Comando | Función |
|---|---|
| `npm install` | Instalar o actualizar dependencias |
| `npm ci` | Instalación reproducible usando el lockfile |
| `npm run dev` | Iniciar el servidor local |
| `npm run lint` | Revisar el código con ESLint |
| `npm run build` | Compilar la aplicación para producción |
| `npm run preview` | Previsualizar la compilación |
| `npm run deploy` | Publicar en GitHub Pages |
| `git status` | Revisar archivos modificados |
| `git add .` | Preparar cambios para commit |
| `git commit -m "Mensaje"` | Registrar cambios |
| `git push origin main` | Subir cambios al repositorio |
| `git pull origin main` | Obtener cambios remotos |

### Automatizaciones del proyecto

El archivo `package.json` incluye scripts automáticos:

- `predev`: genera conteos de tarjetas antes de iniciar Vite.
- `prebuild`: genera conteos de tarjetas antes de compilar.
- `predeploy`: ejecuta el build antes de publicar.

Por lo tanto, **no es necesario ejecutar manualmente** `generate-card-counts.mjs` ni realizar un build adicional antes de `npm run deploy`.

## 🚀 Flujo de trabajo para publicar cambios

### Paso 1. Desarrollo

Editar los archivos correspondientes en Visual Studio Code.

Para probar los cambios localmente:

```bash
npm run dev
```

### Paso 2. Validaciones

```bash
npm run lint
npm run build
```

Resolver cualquier error antes de publicar.

### Paso 3. Guardar cambios en GitHub

```bash
git status
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

Sustituir el mensaje del commit por una descripción concreta.

### Paso 4. Publicar en GitHub Pages

```bash
npm run deploy
```

Este comando:

1. Ejecuta automáticamente `npm run build`.
2. Genera los archivos de producción en `dist/`.
3. Publica el contenido mediante `gh-pages`.

### Paso 5. Verificar el despliegue

Abrir:

https://jesusriddle.github.io/fluentia-app/

Si el navegador muestra contenido anterior, realizar una recarga forzada o comprobar el estado del despliegue en GitHub.

**Importante:** subir cambios a `main` y publicar con `npm run deploy` son procesos distintos en esta configuración. El sitio público no se actualiza únicamente por hacer `git push`, salvo que se configure una automatización adicional.

## 📚 Administración de contenidos

Los módulos de aprendizaje se almacenan en archivos JSON dentro de:

```text
public/data/
```

Para modificar contenidos:

1. Abrir el archivo JSON correspondiente.
2. Agregar, corregir o eliminar las entradas necesarias.
3. Mantener la estructura de datos utilizada por la aplicación.
4. Evitar registros duplicados.
5. Validar la sintaxis JSON.
6. Ejecutar el proyecto localmente.
7. Comprobar las tarjetas y los ejercicios.
8. Publicar mediante el flujo habitual.

Cuando se agreguen nuevos módulos, también se deberá revisar su registro y configuración en la aplicación.

### Recomendaciones

- Utilizar UTF-8 para conservar caracteres y acentos.
- Mantener consistencia entre los idiomas.
- Usar nombres descriptivos para los archivos.
- No modificar la estructura de los objetos JSON sin actualizar los componentes que los consumen.
- Comprobar que las rutas de los módulos sean correctas.

## 🌐 Configuración de GitHub Pages

El archivo `vite.config.js` contiene:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/fluentia-app/',
})
```

La propiedad `base` permite resolver correctamente los recursos de la aplicación dentro de la ruta del repositorio.

El despliegue utiliza:

```bash
gh-pages -d dist
```

La carpeta `dist/` se genera automáticamente y no debe editarse manualmente.

## 🔧 Resolución de problemas

### No aparecen los cambios publicados

- Verificar que `npm run deploy` haya finalizado correctamente.
- Comprobar el estado de GitHub Pages.
- Refrescar la caché del navegador.

### Error al cargar un módulo JSON

- Validar la sintaxis del archivo.
- Comprobar el nombre y la ruta.
- Revisar la consola del navegador.
- Confirmar que el archivo exista en `public/data/`.

### Errores durante la compilación

Ejecutar:

```bash
npm run lint
npm run build
```

Revisar los mensajes de error y corregirlos antes de publicar.

### Problemas con dependencias

Para reinstalar las dependencias del proyecto:

```bash
npm ci
```

### El sitio funciona localmente, pero falla publicado

Comprobar:

- La propiedad `base` de Vite.
- Las rutas de los recursos estáticos.
- El uso de `import.meta.env.BASE_URL` cuando corresponda.
- La existencia de los archivos dentro de `dist/`.

## 📌 Estado del proyecto

Proyecto en desarrollo y mejora continua.

Áreas de evolución:

- Ampliación de los contenidos por nivel.
- Incorporación de nuevos temas y expresiones.
- Mejoras en la experiencia móvil.
- Refinamiento de los modos de estudio y práctica.
- Mejoras de accesibilidad y experiencia de usuario.

## 👨‍💻 Autor

**Víctor Pacheco **

GitHub: [@JesusRiddle](https://github.com/JesusRiddle)

---

**FLUENTIA — Aprende, practica y sigue avanzando.**
