# CLAUDE.md — MyBooks

El *qué* construimos vive en `docs/project-spec.md`; el *dónde* vamos, en `docs/devlog.md`; el *porqué* de la arquitectura, en `docs/architecture.md`. Este archivo es solo reglas.

## Antes de cada hito
Entra en modo plan y escribe el plan del hito (qué tablas, rutas, componentes, y en qué orden) antes de tocar código. No empieces a implementar sin plan.

## Convenciones
- RLS siempre activado, con políticas (`auth.uid() = user_id`). Nunca lo desactives. Toda tabla con datos de usuario lleva `user_id`.
- Las claves secretas (service key de Supabase, API key del LLM) y las llamadas al LLM y a Google Books son solo server-side. Al navegador solo va la anon key.
- Toda llamada a un LLM pasa por `lib/llm.ts` (interfaz model-agnostic). Modelo por defecto el más barato (Claude Haiku). Cachea en la DB todo lo generado (descripciones): se genera una vez por libro global.
- Las respuestas del cuestionario van en `jsonb`, indexadas por la `key` de cada pregunta — nunca una columna por pregunta.
- Colores como variables CSS en `globals.css`, nunca hardcodeados. Define la paleta ahí.
- Textos y datos a su único lugar, nunca hardcodeados en el JSX.
- Mínima fricción siempre: captura datos como efecto secundario de una acción (las fechas al cambiar de estado), todo lo opcional es de verdad opcional, defaults inteligentes, y el cuestionario se responde rápido (likert y opciones), sin obligar a escribir.

## Skills
- Asegura que estas skills estén instaladas **globalmente** (instálalas si faltan) y úsalas activamente: Front-End Design, Superpowers, Find-Skills.
- Antes de cualquier trabajo de UI/frontend, usa Front-End Design. Para descubrir o evaluar skills, usa Find-Skills.
- Antes de tocar una librería que tenga su propia skill/SKILL.md, léela. No escribas su API de memoria.

## Colaboración (cómo trabajar con Agustín)
- **Modo enseñanza:** Agustín está aprendiendo a construir apps con buenas prácticas. Explica el *porqué* de cada decisión, no solo el *qué*. Prioriza que entienda sobre ir rápido.
- **Español latino neutro**, nunca argentino (nada de voseo ni modismos rioplatenses).
- En cada tarea, recomienda el **esfuerzo de Claude** sugerido (bajo/medio/alto) y el **modelo** (Haiku/Sonnet/Opus), con una línea de por qué.
- Si una tarea conviene hacerla con **GPT/Codex** en vez de Claude, avísalo.
- Sugiere de forma proactiva qué se puede **paralelizar en un nuevo workspace** de Conductor.
- Indica cuándo conviene hacer **`/clear`** (al cerrar un tema o antes de cambiar de foco) para no arrastrar contexto.
- Mantén los docs vivos: actualiza spec/arquitectura/devlog cuando una conversación cambie algo relevante.

## Cierre de sesión
Cuando diga "cierra la sesión": corre lint + types + tests (`npm run lint` · `npm run typecheck` · `npm test`). Si pasan, agrega una entrada NUEVA arriba en `docs/devlog.md` (fecha, hito, qué hice, decisiones/bugs, próximo paso) y haz commit. Si algo falla, arréglalo o avísame antes de commitear. Nunca edites entradas viejas.

## Git
- Commits en español, concisos.
- Nunca commitear `.env*` ni claves.
- Una branch por hito; merge a main cuando el hito quede listo.

## Lecciones
<!-- Vacío al inicio. Cuando me corrijas con `#` ("no vuelvas a hacer X"), la regla queda acá y no se repite. Acá también suben las lecciones de arquitectura durables del devlog. -->
