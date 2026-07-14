# Nihongo (日本語)

MVP navegable de una escuela online de japonés, inspirado en la estructura pública de
`japonesenlanube.com` y construido con React, TypeScript, Vite y pnpm.

La primera versión incluye:

- Inicio responsive con una jerarquía y ritmo visual similares a la referencia.
- Rutas públicas para cursos, libros, materiales, recursos gratuitos, equipo y contacto.
- Imágenes de muestra generadas con CSS, sin reutilizar imágenes del sitio original.
- Formularios interactivos de demostración sin envío de datos.
- Estados claros para las funciones que llegarán después (aula, compra e inicio de sesión).

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Verificación

```bash
pnpm lint
pnpm format:check
pnpm build
```

## Despliegue

Cada push a `master` ejecuta el workflow de GitHub Actions y publica el contenido de `dist` en
GitHub Pages. La aplicación usa rutas con hash para que todas las páginas públicas funcionen en
un alojamiento estático.
