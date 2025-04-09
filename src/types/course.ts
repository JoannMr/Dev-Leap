export interface Language {
  id: string;
  name: string;
  slugLanguage: string;
  icono?: {
    url: string;
  };
}

export interface Lesson {
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

export interface Course {
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

export interface CoursesResponse {
  courses: Course[];
} 