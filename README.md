# app-my-books

App para registrar y puntuar los libros que lees, con un cuestionario que
alimenta recomendaciones. Stack: Next.js + Supabase + TypeScript + Tailwind.
Ver `docs/` para spec, arquitectura y bitácora.

## Configuración local

Las variables de entorno necesarias están listadas en `.env.example` (sin
valores). Cópialo y rellena los valores reales:

```bash
cp .env.example .env.local
```

`.env.local` está en `.gitignore` y nunca se sube. Lo público lleva el prefijo
`NEXT_PUBLIC_`; el resto es secreto y solo se usa server-side.
