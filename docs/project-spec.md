# MyBooks

MyBooks es una app personal para registrar lo que leo, lo que quiero leer y lo que tengo comprado sin leer, responder un cuestionario breve por cada libro leído, y pedir recomendaciones en lenguaje natural que un LLM razona a partir de mis respuestas y comentarios (no solo del rating). Es multiusuario desde el inicio —cada quien ve solo lo suyo— para poder compartirla con familia y amigos. Stack: Next.js (App Router) en Netlify, Supabase (Postgres + Auth + RLS), LLM detrás de una capa propia (Claude Haiku por defecto), TypeScript + Tailwind.

## Fuera del scope
- Capa social: posts, likes, comentarios entre usuarios, follows, feed.
- Recomendaciones con base vectorizada / embeddings (v1 es solo LLM sobre contexto estructurado).
- Precios automáticos (scraping, jobs) — precio y link se cargan a mano.
- UI de administración para editar el cuestionario (las preguntas se cambian por migración).
- Tags o categorías libres (los estados son un enum fijo).
- Dashboards o estadísticas de lectura.
- Bucle de feedback de recomendaciones.

(Cada uno tiene su costura prevista en el modelo; ver `docs/architecture.md` → Evolución.)

## Hitos
1. Esqueleto deployado con auth: Next.js en Netlify + Supabase (Auth + tabla con RLS). Inicias sesión, agregas un libro y lo ves en tu lista; solo tú ves lo tuyo.
2. CRUD de la biblioteca: estados (Por leer, Comprado, Leyendo, Leído, Abandonado), editar/borrar, link + precio manual, fechas que se autocompletan al cambiar de estado, vistas filtradas.
3. Metadata + descripción sin spoilers: buscar en Google Books al agregar, generar el blurb con el LLM, cachear en `books`.
4. Cuestionario + comentarios para libros leídos: set fijo de preguntas (respuestas en `jsonb`), comentario libre, follow-up de motivo al abandonar.
5. Recomendaciones: consulta en lenguaje natural + tu historial → LLM → sugerencias con el porqué, verificadas contra Google Books; habilitado desde 3 libros respondidos.

Listo = registras tu biblioteca, respondes el cuestionario de lo leído, y la app te da recomendaciones razonadas; todo deployado y usable por ti y un par de invitados.
