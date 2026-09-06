# StackMyHobbies — Frontend

> Aplicación web para gestionar, seguir y organizar tus hobbies y contenidos favoritos (series, películas, anime, libros, videojuegos, etc.).

## Qué hace este programa

**StackMyHobbies** es un tracker personal de entretenimiento. Su objetivo es permitir a cada usuario registrar los contenidos que consume —o planea consumir— y llevar un control detallado de su progreso, calificación y metadatos.

En la práctica, un "content item" puede ser un libro, un videojuego, una serie, una película, un anime, un manga, etc. Cada contenido se acompaña de información como:

- Título, descripción, notas personales e imagen de portada.
- Tipo de contenido (`content_type`) y estado de progreso (`progress_status`).
- Progreso actual/total con su unidad (episodios, capítulos, páginas, minutos, etc.).
- Segmentación: temporada, volumen, parte, edición, película, etc.; con subsegmentos como capítulos, episodios, páginas, OVAs, especiales.
- Fechas de inicio/fin de visionado y fechas de emisión.
- Día de la semana asociado (por ejemplo, para seguimiento de estrenos).
- Puntuación de 1 a 5 estrellas.
- Etiquetas (`tags`) para clasificar y filtrar.

La app también cuenta con autenticación completa (registro, inicio de sesión, verificación de correo, recuperación de contraseña) y un listado paginado con filtros, ordenamiento y columnas configurables.

## Stack tecnológico

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- **Build tool:** [Vite](https://vitejs.dev/)
- **Tipado:** [TypeScript](https://www.typescriptlang.org/) + [vue-tsc](https://github.com/vuejs/language-tools)
- **Enrutamiento:** [Vue Router 4](https://router.vuejs.org/)
- **Estado global:** [Pinia](https://pinia.vuejs.org/)
- **Estado servidor:** [TanStack Query (Vue Query)](https://tanstack.com/query/latest)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) + [daisyUI 5](https://daisyui.com/)
- **Formularios y validación:** [VeeValidate](https://vee-validate.logaretm.com/) + [Zod](https://zod.dev/)
- **UI complementaria:** [Headless UI Vue](https://headlessui.com/), [Floating UI Vue](https://floating-ui.com/), [VueUse](https://vueuse.org/)
- **Iconos:** [Iconify Vue](https://iconify.design/)
- **Calendario:** [Cally](https://cally.dev/)
- **Notificaciones:** [Vue3 Toastify](https://vue3-toastify.js-bridge.com/)
- **Internacionalización:** [Vue I18n](https://vue-i18n.intlify.dev/)
- **Testing:** [Vitest](https://vitest.dev/) (unitarios) + [Cypress](https://www.cypress.io/) (e2e)
- **Lint/Format:** [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Gestor de paquetes recomendado:** [Bun](https://bun.sh/)

## Estructura del proyecto

El proyecto está organizado por **módulos funcionales** y usa un alias `@` apuntando a `src`:

```
src/
├── api/                    # Configuración base de Axios (stackMyHobbiesApi)
├── assets/                 # Estilos globales y recursos estáticos
├── components/             # Componentes de prueba (Vitest)
├── i18n/                   # Configuración de Vue I18n y locales (es, en)
├── modules/                # Módulos de negocio
│   ├── auth/               # Autenticación
│   │   ├── actions/        # Llamadas a la API de auth
│   │   ├── components/     # Componentes reutilizables de auth
│   │   ├── guards/         # Guards de Vue Router
│   │   ├── interfaces/     # Tipos e interfaces
│   │   ├── layouts/        # Layouts de auth
│   │   ├── pages/          # Páginas (SignIn, SignUp, Forgot, Reset, etc.)
│   │   ├── routes/         # Definición de rutas
│   │   └── stores/         # Pinia store de autenticación
│   └── content-items/      # Gestión de hobbies/contenidos
│       ├── actions/        # Llamadas a la API de content-items
│       ├── components/      # Componentes de listado, formulario y drawers
│       ├── composable/     # Composables de lógica reutilizable
│       ├── directives/     # Directivas personalizadas (fallback de imagen, badges)
│       ├── dto/            # DTOs para crear/actualizar
│       ├── enum/           # Enums de negocio (segmentos, unidades, días, etc.)
│       ├── interfaces/     # Tipos de respuesta de la API
│       ├── layouts/        # Layouts del módulo
│       ├── mutations/      # Mutaciones de TanStack Query
│       ├── pages/          # ListPage, CreatePage, EditPage, DetailPage
│       ├── queries/        # Queries de TanStack Query
│       ├── routes/         # Definición de rutas
│       └── schemas/        # Esquemas Zod de validación
├── router/                 # Configuración global de Vue Router
├── shared/                 # Componentes, composables y utilidades compartidas
│   ├── components/         # AppInput, AppSelect, AppPagination, etc.
│   ├── composables/        # useToast, useDebounce
│   ├── icons/              # Iconos SVG personalizados
│   └── utils/              # Utilidades de formateo
├── stores/                 # Stores globales (theme, lang, toggle, counter)
└── utils/                  # Utilidades generales (manejo de errores, form data, etc.)
```

## Requisitos

- Node.js >= 22 (o Bun)
- Acceso a la API backend de StackMyHobbies (configurar en `.env`)

## Configuración

Copia el archivo de plantilla de entorno y ajusta la URL base:

```sh
cp .env.template .env
```

```env
VITE_STACKMYHOBBIES_BASE_URL=https://api.stackmyhobbies.example.com
```

## Instalación

```sh
bun install
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `bun dev` | Inicia el servidor de desarrollo con Vite |
| `bun run build` | Verifica tipos y genera el build de producción |
| `bun preview` | Previsualiza el build de producción |
| `bun test:unit` | Ejecuta tests unitarios con Vitest |
| `bun test:e2e:dev` | Abre Cypress en modo desarrollo |
| `bun test:e2e` | Ejecuta tests e2e contra el build de producción |
| `bun lint` | Ejecuta ESLint con auto-fix |
| `bun format` | Formatea `src/` con Prettier |

## Convenciones principales

- **Composition API** con `<script setup>` y TypeScript.
- **Feature-based modules**: cada módulo agrupa sus propias páginas, componentes, stores, acciones API, queries, mutations, tipos y esquemas.
- **Separación de estado cliente/servidor**: Pinia para estado local; TanStack Query para cacheo y sincronización de datos del servidor.
- **Validación declarativa**: formularios validados con VeeValidate + Zod.
- **Estilos utilitarios**: Tailwind CSS + componentes de daisyUI.
- **Internacionalización**: textos gestionados con Vue I18n.
- **Tipado estricto**: `vue-tsc` en el build.

## Pruebas

- **Unitarias:** `bun test:unit` (Vitest + Vue Test Utils).
- **E2E:** `bun test:e2e:dev` para desarrollo o `bun test:e2e` para CI (requiere build previo).

## Licencia

Proyecto privado — StackMyHobbies.
