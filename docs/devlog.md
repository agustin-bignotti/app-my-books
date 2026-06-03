# DEVLOG — MyBooks

Lo nuevo arriba. No edites entradas viejas.

---

## [2026-06-02] — Hito 0: Setup del proyecto
Qué hice:
- Organicé la documentación: `CLAUDE.md` en la raíz y `project-spec` / `architecture` / `devlog` en `docs/`.
- Ajusté el lenguaje a español latino neutro y agregué la sección "Colaboración" a `CLAUDE.md`.
- Realineé `main` local con `origin/main` (tenía un *initial commit* huérfano y vacío) y limpié copias sueltas.
- Verifiqué el MCP de Supabase (proyecto **App-My-Books**, `akachbjqymwyzdgqijzx`, activo) y que las skills (frontend-design, find-skills, superpowers) están instaladas globalmente.
- Documentación inicial entregada vía PR #1 (squash merge).

Decisiones:
- **Flujo de trabajo:** una branch + un PR por hito; squash merge a `main`. Docs y devlog también pasan por PR.
- **Modelo/esfuerzo por tarea:** planificación de hitos con Opus/esfuerzo alto; implementación con Sonnet/medio; edits triviales con Haiku/bajo.
- **Paralelización:** el design-system del frontend (paleta en `globals.css` + tema Tailwind) se hará en un workspace aparte, en paralelo al Hito 1, con la skill frontend-design.
- **Contexto entre workspaces:** un workspace nuevo arranca sin historial de chat; el contexto compartido vive en `docs/` + `CLAUDE.md` + memoria. Por eso mantenemos estos archivos al día.
- **Idea futura registrada:** landing page propia como ejercicio de diseño web (ver `project-spec.md` → Más adelante).

Próximo paso: planificar el **Hito 1** (esqueleto Next.js + Supabase Auth + tabla con RLS) en modo plan, en una branch nueva.

<!-- Formato de cada entrada (la nueva va arriba de todo, empujando las demás):

## [YYYY-MM-DD] — Hito N: [nombre]
Qué hice:
- [tarea terminada]
Decisiones/bugs:   (borra este bloque si la sesión fue limpia)
- [decisión y por qué — o bug y cómo se resolvió]
Próximo paso: [lo siguiente, + branch si importa]

-->
