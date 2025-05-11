# 🚀 DevLeap - Plataforma de Cursos Online 🎓

DevLeap es una plataforma de cursos online especializada en tecnologías de desarrollo web, programación, diseño UX/UI y marketing digital. La plataforma permite a los usuarios explorar cursos, inscribirse y acceder a lecciones estructuradas con contenido multimedia.

**🌐 [Visita la plataforma en vivo](https://dev-leap.vercel.app/)**

![DevLeap Home Page](/public/images/mockup-mac.png)

![Curso en Tablet](/public/images/mockup-tablet.png)

## ✨ Funcionalidades

- 🔒 **Autenticación de Usuarios**: Integración con Clerk para manejo seguro de usuarios.
- 📚 **Catálogo de Cursos**: Exploración de cursos disponibles con filtros.
- 📖 **Detalles de Cursos**: Páginas detalladas con descripción, lecciones e información del instructor.
- 📝 **Sistema de Inscripción**: Los usuarios pueden inscribirse a cursos y acceder al contenido.
- 🎥 **Visualización de Lecciones**: Interfaz intuitiva para consumir el contenido de las lecciones.
- 📈 **Seguimiento de Progreso**: Indicadores visuales del avance en los cursos.
- 👤 **Área Personal**: Sección "Mis Cursos" para gestionar inscripciones.
- 💸 **Promociones**: Sistema para mostrar ofertas y descuentos en cursos.

## 🏗️ Arquitectura del Sistema

### 📐 Arquitectura General

DevLeap sigue una arquitectura moderna basada en:

- **Frontend**: Next.js 15 con App Router y React 19
- **Styling**: Tailwind CSS v4 para diseño moderno y responsive
- **Animaciones**: Framer Motion para interacciones fluidas y transiciones
- **Autenticación**: Clerk para manejo de usuarios y sesiones
- **CMS Headless**: Hygraph (GraphQL) para gestión de contenidos
- **Notificaciones**: Sonner para toasts y alertas elegantes
- **Iconografía**: Lucide React y React Icons para sistema de iconos
- **Manejo de formularios**: React Hook Form con Zod para validación
- **Email**: React Email para plantillas de correo modernas y responsive
- **APIs**: Rutas de API de Next.js para endpoints del backend

```
┌─────────────────┐          ┌──────────────┐
│                 │          │              │
│  Next.js App    │◄─────────┤ Clerk Auth   │
│  (Frontend)     │          │              │
│                 │          └──────────────┘
└────────┬────────┘
         │
         ▼
┌────────────────┐          ┌──────────────┐
│                │          │              │
│  Next.js API   ├─────────►│ Hygraph CMS  │
│  (Backend)     │◄─────────┤ (GraphQL)    │
│                │          │              │
└────────────────┘          └──────────────┘
```

### 📊 Diagramas

#### 🏷️ Diagrama de Clases (UML)

```
┌───────────────┐      ┌───────────────┐
│    Course     │      │    Lesson     │
├───────────────┤      ├───────────────┤
│ id            │      │ id            │
│ titulo_Curso  │      │ titulo        │
│ slug_curso    │1    *│ slug          │
│ descripcion   ├──────┤ content       │
│ imagenDestacada│     │ videoUrl      │
│ languages     │      └───────────────┘
└───────┬───────┘
        │
        │        ┌───────────────┐
        │       *│   Language    │
        ├────────┤               │
        │        │ id            │
        │        │ name          │
        │        │ slugLanguage  │
        │        │ icono         │
        │        └───────────────┘
        │
        ▼
┌───────────────┐
│  Inscripcion  │
├───────────────┤
│ id            │
│ userId        │
│ course        │
└───────────────┘
```

#### 📁 Diagrama ER (Base de Datos)

```
┌───────────────┐       ┌───────────────┐
│    Course     │       │    Lesson     │
├───────────────┤       ├───────────────┤
│ id (PK)       │       │ id (PK)       │
│ titulo_Curso  │       │ titulo        │
│ slug_curso    │1     *│ slug          │
│ descripcion   ├───────┤ content       │
│ imagenDestacada│      │ videoUrl      │
└───────┬───────┘       │ courseId (FK) │
        │               └───────────────┘
        │
        │
        │               ┌───────────────┐
        │               │ CourseLanguage│
        │               │ (JOIN TABLE)  │
        ├───────────────┤               │
        │              *│ courseId (FK) │*
        │               │ languageId (FK)│
        │               └───────┬───────┘
        │                       │
        │                       │
        │                       │
        │                       ▼
        │               ┌───────────────┐
        │               │   Language    │
        │               ├───────────────┤
        │               │ id (PK)       │
        │               │ name          │
        │               │ slugLanguage  │
        │               │ icono         │
        │               └───────────────┘
        │
        │
        ▼
┌───────────────┐
│  Inscripcion  │
├───────────────┤
│ id (PK)       │
│ userId        │
│ courseId (FK) │
└───────────────┘
```

## 🔍 Detalles de Implementación

### 📂 Estructura de Directorios

```
src/
├── app/
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── page.tsx                     # Dashboard principal
│   │       ├── layout.tsx                   # Layout para el área de dashboard
│   │       ├── courses/
│   │       │   ├── page.tsx                 # Lista de todos los cursos
│   │       │   └── [slug]/
│   │       │       ├── page.tsx             # Página detalle de curso
│   │       │       └── lessons/
│   │       │           └── [lessonSlug]/
│   │       │               └── page.tsx     # Visualizador de lecciones
│   │       ├── mis-cursos/
│   │       │   └── page.tsx                 # Cursos inscritos por el usuario
│   │       └── promociones/
│   │           └── page.tsx                 # Promociones y descuentos
│   ├── (public)/
│   │   ├── page.tsx                         # Página de inicio (landing)
│   │   ├── layout.tsx                       # Layout para área pública
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx                 # Página de inicio de sesión
│   │   │   └── register/
│   │   │       └── page.tsx                 # Página de registro
│   │   ├── empresas/
│   │   │   └── page.tsx                     # Sección para empresas
│   │   ├── faqs/
│   │   │   └── page.tsx                     # Preguntas frecuentes
│   │   └── programas/
│   │       └── page.tsx                     # Programas educativos
│   ├── api/
│   │   ├── comprobar-inscripcion/
│   │   │   └── route.ts                     # API para verificar inscripción
│   │   ├── inscripcion/
│   │   │   └── route.ts                     # API para inscribir usuario a curso
│   │   ├── mis-cursos/
│   │   │   └── route.ts                     # API para obtener cursos del usuario
│   │   ├── promociones/
│   │   │   └── route.tsx                    # API para obtener promociones
│   │   └── send-email/
│   │       └── route.ts                     # API para envío de emails
│   ├── globals.css                          # Estilos globales (Tailwind)
│   └── favicon.ico                          # Favicon del sitio
├── middleware.ts                            # Middleware de autenticación Clerk
├── context/
│   └── SearchContext.tsx                    # Contexto para búsqueda de cursos
├── emails/
│   └── SubscriptionConfirmation.tsx         # Plantilla de email de confirmación
├── lib/
│   ├── graphql-client.ts                    # Cliente GraphQL
│   ├── queries.ts                           # Consultas GraphQL
│   └── utils.ts                             # Utilidades generales
└── types/
    └── course.ts                            # Tipos para cursos y lecciones
```

```
components/
├── Footer.tsx                            # Pie de página global
├── Header.tsx                            # Cabecera global
├── StartCourseButton.tsx                 # Botón para inscripción a cursos
├── dashboard/
│   ├── CourseCard.tsx                    # Tarjeta para mostrar curso
│   ├── CourseFilters.tsx                 # Filtros para catálogo de cursos
│   ├── CourseHero.tsx                    # Hero para página de curso
│   ├── CourseTabs.tsx                    # Pestañas en detalle de curso
│   └── ...
├── empresas/
│   ├── ContactoEmpresas.tsx              # Formulario contacto empresas
│   ├── EmpresasHero.tsx                  # Hero sección empresas
│   ├── SolucionesGrid.tsx                # Grid de soluciones para empresas
│   └── ...
├── faqs/
│   ├── AccordionFaqs.tsx                 # Acordeón de preguntas
│   ├── CategoriesSection.tsx             # Categorías de preguntas
│   └── FaqsHero.tsx                      # Hero de FAQs
├── home/
│   ├── CommunityMotion.tsx               # Animación comunidad (landing)
│   ├── HeroMotion.tsx                    # Animación hero (landing)
│   ├── PopularCoursesClient.tsx          # Cursos populares (cliente)
│   └── ...
├── programas/
│   ├── Benefits.tsx                      # Beneficios de programas
│   ├── Hero.tsx                          # Hero de programas
│   ├── ProgramGrid.tsx                   # Grid de programas
│   └── ...
└── ui/
    └── Toaster.tsx                       # Componente de notificaciones
```

### 🧩 Componentes Clave

- **CourseCard**: Tarjeta visual para mostrar cursos en el catálogo.
- **CourseTabs**: Componente de pestañas para mostrar diferentes secciones de información del curso.
- **StartCourseButton**: Gestiona la inscripción y acceso a los cursos.

### 🔄 Patrones de Diseño

- **Page Pattern**: Cada ruta tiene su propio componente Page que maneja la lógica y renderizado.
- **Container/Presentational Pattern**: Separación entre componentes de UI y lógica.
- **Serverless Functions**: APIs implementadas como funciones serverless.
- **Data Fetching Pattern**: Consultas GraphQL para obtención de datos.

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "@clerk/nextjs": "^6.14.2",    // 🔑 Autenticación y gestión de usuarios
    "@hookform/resolvers": "^5.0.1", // Integración de validadores con React Hook Form
    "@react-email/components": "^0.0.36", // 📧 Componentes para emails
    "clsx": "^2.1.1",              // Utilidad para combinar clases condicionales
    "framer-motion": "^12.7.3",    // 🎞️ Biblioteca de animaciones avanzadas
    "graphql-request": "^7.1.2",   // 📡 Cliente GraphQL para consultas
    "lucide-react": "^0.484.0",    // 🎨 Iconos modernos para la UI
    "next": "15.2.4",              // 🚀 Framework principal
    "react": "^19.0.0",            // ⚛️ Biblioteca base
    "react-dom": "^19.0.0",        // Renderizado de componentes
    "react-hook-form": "^7.55.0",  // 🛠️ Gestión de formularios
    "react-icons": "^5.5.0",       // 🎨 Biblioteca adicional de iconos
    "resend": "^4.4.0",            // 📧 Envío de emails
    "sonner": "^2.0.3",            // 🔔 Notificaciones toast
    "tailwind-merge": "^3.0.2",    // Utilidad para Tailwind
    "zod": "^3.24.2"               // ✅ Validación de datos
  },
  "devDependencies": {
    "eslint": "^9",                // Linting de código
    "tailwindcss": "^4.0.17",      // 🎨 Framework CSS utility-first
    "typescript": "^5",            // Lenguaje tipado basado en JavaScript
    "react-email": "^4.0.7"        // 📧 Herramientas de desarrollo para emails
  }
}
```

## 🔗 Endpoints de API

| Endpoint | Método | Descripción | Parámetros |
|----------|--------|-------------|------------|
| `/api/inscripcion` | POST | Inscribe al usuario en un curso | `{ userId, cursoId }` |
| `/api/comprobar-inscripcion` | POST | Verifica si el usuario está inscrito en un curso | `{ userId, cursoId }` |
| `/api/mis-cursos` | GET | Obtiene los cursos en los que el usuario está inscrito | Auth header |
| `/api/send-email` | POST | Envía emails de confirmación | `{ email, name, courseTitle }` |

## 📜 Modelos de Datos

### Course
```typescript
interface Course {
  id: string;
  titulo_Curso: string;
  slug_curso: string;
  descripcion_curso?: {
    text?: string;
    html?: string;
  };
  imagenDestacada?: {
    url: string;
  };
  lessons: Lesson[];
  languages?: Language[];
}
```

### Lesson
```typescript
interface Lesson {
  id: string;
  titulo: string;
  slug: string;
  content?: {
    html?: string;
  };
  videoUrl?: {
    url: string;
  };
}
```

### Language
```typescript
interface Language {
  id: string;
  name: string;
  slugLanguage: string;
  icono?: {
    url: string;
  };
}
```

### Inscripcion
```typescript
interface Inscripcion {
  id: string;
  userId: string;
  course: {
    id: string;
    titulo_Curso: string;
    slug_curso: string;
    imagenDestacada?: {
      url: string;
    };
    lessons: {
      id: string;
      slug: string;
    }[];
  };
}
```

## 🔄 Consultas GraphQL

El sistema utiliza consultas GraphQL para comunicarse con el CMS Hygraph. Algunas consultas principales:

- **GET_COURSES**: Obtiene todos los cursos disponibles.
- **GET_COURSE_BY_SLUG**: Obtiene detalles de un curso por su slug.
- **GET_LESSON_BY_SLUG**: Obtiene detalles de una lección por su slug.
- **CHECK_INSCRIPCION**: Verifica si un usuario está inscrito en un curso.
- **CREATE_INSCRIPCION**: Crea una nueva inscripción de usuario en un curso.
- **GET_ALL_INSCRIPCIONES**: Obtiene todas las inscripciones de usuarios.

## ⚙️ Configuración del Proyecto

1. **Requisitos previos**:
   - Node.js 18+ y npm/yarn
   - Cuenta en Clerk para autenticación
   - Proyecto configurado en Hygraph CMS

2. **Variables de entorno**:
   ```
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_WEBHOOK_SECRET=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   HYGRAPH_ENDPOINT=
   HYGRAPH_TOKEN=
   RESEND_API_KEY=
   ```

3. **Instalación y ejecución**:
```bash
npm install
npm run dev
```

## 📞 Contacto y Soporte

Para más información o soporte, contactar a través de:
- 🔗 GitHub: [Dev-Leap](https://github.com/Dev-Leap)
- 🌐 Web: [dev-leap.vercel.app](https://dev-leap.vercel.app/)

### 👨‍💻 Desarrollado por:
- **Joan Merino** 
- **Dylan Fiallos** 

© 2024 DevLeap 🌟 - Todos los derechos reservados 