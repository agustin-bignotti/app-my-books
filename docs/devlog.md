# DEVLOG — MyBooks

Lo nuevo arriba. No edites entradas viejas.

---

## [2026-06-04] — Hito 1: Esqueleto Next.js + Supabase Auth + RLS
Qué hice:
- **Migración** (vía MCP Supabase): enum `book_status` (por_leer, comprado, leyendo, leido, abandonado) + tablas `books` (catálogo global, sin user_id) y `user_books` (ficha privada con `user_id`), ambas con RLS. Políticas: `books` legible/insertable por cualquier autenticado; `user_books` con `auth.uid() = user_id` en select/insert/update/delete.
- **Scaffold Next.js** (App Router, TS, Tailwind, ESLint). Scripts `typecheck` (tsc) y `test` (Vitest) agregados para que el cierre de sesión funcione.
- **Auth**: clientes Supabase SSR (browser + server), middleware que refresca sesión y protege rutas, login por magic link, `/auth/callback`, botón de cerrar sesión.
- **Biblioteca**: Server Component con la lista + Server Action para agregar libro (inserta en `books` y luego en `user_books`).
- **Deploy** en Netlify desde la rama del hito; redirect URL registrada en Supabase.
- **Email propio (Resend)** + dominio `agustinbignotti.com` verificado por DNS.
- **Verificación de RLS**: a nivel DB (simulando JWTs con `set_config('request.jwt.claims', ...)`) y end-to-end con dos cuentas reales — ninguna ve los libros de la otra. ✅

Decisiones/bugs:
- **Auth = magic link** (sin contraseña) por mínima fricción; es base aditiva (se puede sumar contraseña + Google después sin rehacer). Documentado en architecture.md → Evolución.
- **Dos tablas desde el inicio** (`books` global + `user_books`): respeta el modelo "difícil de revertir" (libros globales abaratan la descripción IA y lo social a futuro). La columna `status` se incluyó ya aunque su CRUD sea del Hito 2 (casi gratis, evita migración).
- **BUG — rate limit de email**: el email built-in de Supabase tiene tope fijo de **2 correos/hora**; bloqueó el smoke test multiusuario. Solución: SMTP propio con Resend (100/día). Detalle: Resend exige **dominio verificado** para enviar a terceros (sin dominio solo manda al dueño de la cuenta) → se compró y verificó `agustinbignotti.com` (DKIM + SPF + MX en `send` + DMARC en Namecheap; el MX requiere cambiar Mail Settings de "Email Forwarding" a "Custom MX").
- **Lección — magic link y escáneres**: un error `otp_expired` puede no ser por tiempo, sino porque un escáner de seguridad de email pre-consume el token de un solo uso.
- **Proceso**: no usé las skills (frontend-design, superpowers) al inicio como manda CLAUDE.md; corregido. La UI quedó funcional pero sin diseño real — el design-system va en workspace aparte.

Próximo paso: PR de `hito-1-esqueleto-auth` → `main` y mergear. Luego Hito 2 (CRUD de la biblioteca: estados, editar/borrar, link+precio, fechas automáticas, vistas filtradas). El design-system se hace en paralelo en otro workspace, partiendo de esta rama mergeada.

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
