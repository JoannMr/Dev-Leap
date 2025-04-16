import { gql } from "graphql-request";

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      titulo_Curso
      slug_curso
      descripcion_curso {
        html
        text
      }
      imagenDestacada {
        url
      }
      lessons {
        id
        titulo
        slug
      }
      languages {
        id
        name
        slugLanguage
        icono {
          url
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG = gql`
  query GetCourseBySlug($slug: String!) {
    course(where: { slug_curso: $slug }) {
      id
      titulo_Curso
      slug_curso
      descripcion_curso {
        html
      }
      imagenDestacada {
        url
      }
      lessons {
        id
        titulo
        slug
        content {
          html
        }
        videoUrl {
          url
        }
      }
      languages {
        id
        name
        slugLanguage
        icono {
          url
        }
      }
    }
  }
`;

// lib/queries.ts

export const GET_LESSON_BY_SLUG = gql`
  query GetLessonBySlug($slug: String!) {
    lesson(where: { slug: $slug }) {
      id
      titulo
      slug
      content {
        html
      }
      videoUrl {
        url
      }
      course {
        id
        titulo_Curso
        slug_curso
        lessons {
          id
          titulo
          slug
        }
      }
    }
  }
`;

export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      id
      name
      slugLanguage
      icono {
        url
      }
    }
  }
`;

