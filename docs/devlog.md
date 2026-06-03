# DEVLOG — MyBooks

Lo nuevo arriba. No edites entradas viejas.

---

## [2026-06-03] — Hito 0 (cont.): Configuración de Git y convenciones
Qué hice:
- Fijé la identidad de Git del repo a la cuenta personal **agustin-bignotti** (config *local*; la global de la universidad queda intacta).
- Agregué configuración base: `.gitignore` (Next.js) y `.env.example` como plantilla versionada (PR #3).
- Mergeé la bitácora del Hito 0 que había quedado en un PR abierto (PR #2).
- Definí y documenté la convención de nombres de rama: `hito-N-descripcion`.

Decisiones/lecciones (para el framework de planeación):
- **Env files:** la regla pasó de "nunca commitear `.env*`" a la buena práctica real → se versiona `.env.example` (solo nombres, sin valores); los secretos van en `.env.local` (gitignored). El principio correcto es *"nunca subir secretos"*, no *"nunca subir un `.env*`"*.
- **Identidad Git local vs global:** un repo puede sobreescribir la identidad global con config local (`git config --local`); sirve para separar cuentas (personal vs trabajo/U). Verificar con `git config user.email` antes de commitear.
- **Squash merge re-firma el commit:** al mergear por la web/CLI de GitHub, el commit resultante lleva la cuenta de GitHub que mergea, no la identidad local de Git. Por eso un PR puede salir con la cuenta correcta aunque el commit local fuera de otra.
- **Tras un squash, la rama queda divergida:** no reusarla; cortar una nueva desde `main` o rebasear sobre `origin/main`.
- **Conductor — "Archive":** archivar un workspace borra el worktree y **cierra la sesión**, no solo la rama. El historial del chat sobrevive en `~/.claude/projects/<ruta>/<id>.jsonl` y se puede reanudar recreando el worktree en la misma ruta y usando `claude --resume <id>`.

Próximo paso: planificar el **Hito 1** (esqueleto Next.js + Supabase Auth + tabla con RLS) en modo plan, en la rama `hito-1-esqueleto-auth`.

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
