# STRUCTURE.md

Estructura detallada del sitio de portfolio de productos digitales construidos con AI.

---

## Rutas del sitio

```
/                          → Home — listado de todos los productos
/products/[slug]           → Página individual de producto
/about                     → Quién está detrás del sitio y el método
/downloads/[slug]/[file]   → Descarga directa de archivos (redirige a /public)
```

---

## Árbol de archivos (Next.js App Router)

```
src/
├── app/
│   ├── layout.tsx                  # Layout raíz: fuente, metadata global, nav, footer
│   ├── page.tsx                    # Home: grid de productos
│   ├── about/
│   │   └── page.tsx                # Página about
│   └── products/
│       └── [slug]/
│           └── page.tsx            # Página de producto dinámica
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                 # Navegación superior minimalista
│   │   └── Footer.tsx              # Footer con links mínimos
│   │
│   ├── home/
│   │   ├── ProductGrid.tsx         # Grid de tarjetas de productos
│   │   └── ProductCard.tsx         # Tarjeta de preview de un producto
│   │
│   └── product/
│       ├── ProductHero.tsx         # Nombre, tagline, status badge, categoría
│       ├── YoutubeEmbed.tsx        # Iframe con youtube-nocookie, aspect 16/9
│       ├── ProductDocs.tsx         # Renderiza secciones de documentación (MDX o JSON)
│       ├── DownloadList.tsx        # Lista de archivos descargables con tipo y peso
│       ├── PrototypeLink.tsx       # CTA hacia el prototipo funcional externo
│       ├── TechStack.tsx           # Chips del stack sugerido
│       └── AIToolsBadges.tsx       # Badges de herramientas AI usadas
│
├── content/
│   └── products/
│       ├── [slug].json             # Data de cada producto (ver tipo Product en CLAUDE.md)
│       └── [slug]/
│           └── docs.mdx            # Documentación larga del producto en MDX
│
├── lib/
│   ├── products.ts                 # Funciones: getProduct(slug), getAllProducts()
│   └── utils.ts                   # Helpers: formatDate, formatFileSize, etc.
│
├── types/
│   └── product.ts                  # Tipos TypeScript: Product, DocSection, Download
│
└── public/
    └── downloads/
        └── [slug]/                 # Archivos estáticos descargables por producto
            ├── prd-v1.pdf
            ├── db-schema.sql
            └── wireframes.fig
```

---

## Páginas

### `/` — Home

- Header con título del sitio y descripción en una línea
- Filtro opcional por categoría (sin JS de servidor, solo query params)
- `ProductGrid`: grid de 2-3 columnas responsivo
- Cada `ProductCard` muestra: nombre, tagline, status badge, categoría, thumbnail del video

### `/products/[slug]` — Producto

Secciones en orden vertical:

1. **`ProductHero`** — nombre, tagline, status, categoría, fecha de publicación
2. **`YoutubeEmbed`** — demo o walkthrough del producto
3. **`PrototypeLink`** — botón hacia el prototipo funcional (si existe)
4. **`ProductDocs`** — documentación completa: PRD, flujos, arquitectura, decisiones
5. **`TechStack`** — stack sugerido para desarrollo real
6. **`AIToolsBadges`** — herramientas AI usadas para construirlo
7. **`DownloadList`** — archivos disponibles para descarga

### `/about`

- Párrafo corto sobre el método: qué significa "producto construido con AI"
- Qué incluye cada producto publicado
- Sin foto personal ni bio extensa — el foco es el método, no la persona

---

## Componentes clave

### `YoutubeEmbed.tsx`

```tsx
// aspect-ratio fijo 16/9, sin autoplay, privacy-enhanced embed
<div className="relative w-full aspect-video">
  <iframe
    className="absolute inset-0 w-full h-full"
    src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>
```

### `ProductCard.tsx`

- Thumbnail generado desde YouTube: `https://img.youtube.com/vi/[id]/mqdefault.jpg`
- Status badge con color semántico: `concept` → gris, `prototype` → azul, `ready-to-build` → verde
- Sin hover animations complejas — solo cambio de opacidad o borde

### `DownloadList.tsx`

- Lista cada archivo con: ícono de tipo (PDF, SQL, FIG, ZIP), nombre, tamaño
- `<a href="/downloads/[slug]/[file]" download>` — descarga directa sin JS extra

### `ProductDocs.tsx`

- Si el contenido es MDX: renderiza con `next-mdx-remote` o `@next/mdx`
- Si el contenido es JSON: itera `DocSection[]` con título + contenido en prosa
- Soporta: párrafos, listas, tablas, bloques de código, callouts

---

## Generación de metadata (SEO)

En cada `page.tsx` de producto:

```ts
export async function generateMetadata({ params }) {
  const product = getProduct(params.slug)
  return {
    title: `${product.name} — Product Portfolio`,
    description: product.tagline,
    openGraph: {
      images: [`https://img.youtube.com/vi/${product.youtubeId}/maxresdefault.jpg`]
    }
  }
}
```

`generateStaticParams` para prerenderizar todas las páginas de producto en build time.

---

## Convenciones de componentes

- Un archivo por componente, nombrado en PascalCase
- Props tipadas con TypeScript inline (no tipos separados salvo que se reusen)
- Sin estado local salvo casos de UI pura (ej: toggle de sección en docs)
- Tailwind para todo el estilo — sin `style={{}}` inline salvo valores dinámicos imposibles de expresar con clases

---

## Datos y contenido

- Cada producto vive en `src/content/products/[slug].json`
- La documentación larga va en `src/content/products/[slug]/docs.mdx`
- `lib/products.ts` expone `getProduct(slug)` y `getAllProducts()` — estas son las únicas funciones que leen el filesystem; el resto de la app no importa archivos de contenido directamente
- Para agregar un producto: crear el `.json`, el `.mdx` de docs, y los archivos en `/public/downloads/[slug]/`
