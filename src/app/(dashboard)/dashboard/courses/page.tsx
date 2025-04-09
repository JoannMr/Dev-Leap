// app/dashboard/courses/page.tsx

import { graphQLClient } from "@/lib/graphql-client";
import { GET_COURSES, GET_LANGUAGES } from "@/lib/queries";
import CourseCard from "@components/dashboard/CourseCard";
import Link from "next/link";
import Image from "next/image";

interface Language {
  id: string;
  name: string;
  slugLanguage: string;
  icono?: {
    url: string;
  };
}

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
  lessons: Array<any>;
  languages?: Language[];
}

interface CoursesData {
  courses: Course[];
}

interface LanguagesData {
  languages: Language[];
}

export default async function CoursesPage({ searchParams }: { searchParams: { language?: string } }) {
  const data = await graphQLClient.request(GET_COURSES) as CoursesData;
  const langData = await graphQLClient.request(GET_LANGUAGES) as LanguagesData;
  
  // Obtenemos todos los cursos
  const allCourses = data.courses;
  // Obtenemos los lenguajes
  const languages = langData.languages;
  
  // Filtramos los cursos por lenguaje si es necesario
  const activeLanguage = searchParams.language;
  
  const filteredCourses = activeLanguage 
    ? allCourses.filter(course => 
        course.languages?.some(lang => lang.slugLanguage === activeLanguage)
      )
    : allCourses;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Explora nuestros cursos</h1>
        <p className="text-gray-600">Descubre contenido de calidad creado por expertos en el desarrollo web</p>
      </div>
      
      {/* Filtros por lenguaje */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link 
          href="/dashboard/courses" 
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${!activeLanguage 
              ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' 
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }
          `}
        >
          Todos
        </Link>
        
        {languages.map((language) => (
          <Link
            key={language.id}
            href={`/dashboard/courses?language=${language.slugLanguage}`}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2
              ${
                activeLanguage === language.slugLanguage
                  ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              }
            `}
          >
            {language.icono && (
              <Image
                src={language.icono.url}
                alt={language.name}
                width={16}
                height={16}
                className="w-4 h-4"
              />
            )}
            {language.name}
          </Link>
        ))}
      </div>
      
      {/* Grid de cursos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.titulo_Curso}
            slug={course.slug_curso}
            description={course.descripcion_curso?.text}
            imageUrl={course.imagenDestacada?.url}
            lessonsCount={course.lessons.length}
            languages={course.languages}
          />
        ))}
      </div>
      
      {/* Si no hay cursos con el filtro seleccionado */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron cursos para este lenguaje</h2>
          <p className="text-gray-600">Intenta con otro filtro o explora todos nuestros cursos</p>
        </div>
      )}
      
      {/* CTA al final de la página */}
      {filteredCourses.length > 0 && (
        <div className="mt-12 p-8 bg-blue-50 rounded-xl text-center">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">¿No encuentras lo que buscas?</h2>
          <p className="text-blue-600 mb-6">Estamos constantemente añadiendo nuevos cursos a nuestra plataforma.</p>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm">
            Solicitar un tema
          </button>
        </div>
      )}
    </div>
  );
}
