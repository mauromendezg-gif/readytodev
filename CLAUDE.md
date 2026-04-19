# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Rol y enfoque

Eres un experto en desarrollo web minimalista especializado en un tipo muy específico de sitio: **una plataforma de showcase de productos digitales** donde cada producto existe a nivel de prototipo — documentado, funcional y construido con AI — listo para ser tomado por un equipo de desarrollo y llevado a producción.

No es un portafolio personal, no es un blog, no es una tienda. Es una **vitrina técnica de producto** donde el artefacto principal es el producto en sí: su lógica, su documentación, su demo y sus archivos descargables.

Cuando escribas código para este sitio, toma decisiones como alguien que conoce tanto el mundo del producto digital (PRDs, prototipos, flujos) como el del desarrollo web moderno (performance, estructura, escalabilidad sin over-engineering).

---

## Proyecto: Portfolio de Productos Ficticios con AI

Sitio web minimalista que presenta productos ficticios pero completamente documentados, con prototipos funcionales construidos con AI y listos para desarrollo real. No es un blog ni un portafolio personal — es una vitrina de productos con profundidad técnica y de producto.

---

## Filosofía de diseño

- **Minimalista sin ser vacío**: cada elemento tiene propósito. Sin animaciones decorativas, sin ruido visual.
- **El producto es el héroe**: el diseño sirve al contenido, no al revés.
- **Credibilidad técnica**: cada producto debe verse listo para ser construido: tiene documentación real, prototipo funcional y contexto de negocio.
- **Sin ficción evidente**: los productos son hipotéticos pero presentados con rigor como si fueran reales.

---

## Qué es cada "producto" en este sitio

Cada producto publicado incluye:

| Elemento | Descripción |
|---|---|
| **Video demo** | Embebido desde YouTube, muestra el prototipo o walkthrough del producto |
| **Documentación** | PRD, flujos, arquitectura técnica, decisiones de diseño |
| **Prototipo funcional** | Construido con AI (v0, Cursor, Claude, etc.), linkeable o embebible |
| **Descargables** | Archivos como: PRD en PDF, design tokens, schema de DB, wireframes |
| **Stack sugerido** | Tecnologías recomendadas para construirlo en producción |
| **Estado** | Concepto / Prototipo / Listo para dev |

---

## Stack del sitio

> Actualizar cuando se defina. Candidatos preferidos:

- **Framework**: Next.js (App Router) — por soporte a SSG, rutas dinámicas y ecosistema
- **Estilos**: Tailwind CSS — utilidades, sin CSS custom salvo casos justificados
- **Tipografía**: Inter o Geist — legible, técnica, sin serif
- **Hosting**: Vercel
- **Contenido**: MDX o archivos JSON/Markdown por producto (sin CMS externo por ahora)
- **Videos**: YouTube embed vía `<iframe>` o componente wrapper ligero (sin player custom)
- **Descargables**: archivos estáticos en `/public/downloads/[producto]/`

---

## Convenciones de contenido

### Estructura de un producto (data model)

```ts
type Product = {
  slug: string               // identificador único, usado en la URL
  name: string               // nombre del producto
  tagline: string            // una línea, propuesta de valor
  status: 'concept' | 'prototype' | 'ready-to-build'
  category: string           // ej: "fintech", "edtech", "devtools"
  youtubeId: string          // ID del video de YouTube (no URL completa)
  prototypeUrl?: string      // URL del prototipo funcional (Figma, v0, etc.)
  docs: DocSection[]         // secciones de documentación
  downloads: Download[]      // archivos descargables
  stack: string[]            // tecnologías sugeridas
  builtWithAI: string[]      // herramientas AI usadas en la construcción
  publishedAt: string        // ISO date
}
```

### URLs

- Productos: `/products/[slug]`
- Descargas: `/public/downloads/[slug]/[archivo]`
- No usar rutas con ID numérico — siempre slug legible

---

## Videos de YouTube

Usar embed estándar con parámetros de privacidad mejorada:

```tsx
<iframe
  src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
```

- No autoplay por defecto
- Responsive: contenedor con aspect-ratio 16/9
- Sin JS personalizado de player

---

## Descargables

- Todos los archivos en `/public/downloads/[slug]/`
- Nombres de archivo descriptivos: `prd-v1.pdf`, `db-schema.sql`, `wireframes.fig`
- Mostrar tamaño y tipo antes de la descarga
- No rastrear descargas con analytics externos (privacidad por defecto)

---

## Decisiones de arquitectura

- **Sin base de datos**: todo el contenido vive en archivos (JSON o MDX). Si el volumen crece, migrar a un CMS headless.
- **Sin autenticación**: el sitio es público. Si se añaden features para usuarios, documentar aquí.
- **Sin comentarios ni interacción social**: el foco es consumo de contenido, no comunidad.
- **Internacionalización**: el sitio arranca en español. Si se agrega inglés, usar `next-intl`.
- **SEO**: metadata generada dinámicamente por producto. `og:image` generada con `@vercel/og` o imágenes estáticas por producto.

---

## Comandos

> Completar cuando se inicialice el proyecto.

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Lint
npm run lint

# Preview del build
npm run start
```

---

## Notas para instancias futuras de Claude

- La estructura detallada del sitio (páginas, componentes, rutas) está en `STRUCTURE.md`
- Cuando agregues un producto nuevo, sigue el tipo `Product` definido arriba — no improvises campos
- Los videos siempre van embebidos desde YouTube, nunca hosteados directamente
- El tono del copy es técnico-profesional, no corporativo ni informal
- Prioriza rendimiento: sin dependencias pesadas sin justificación
