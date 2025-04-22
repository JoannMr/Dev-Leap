// app/dashboard/courses/page.tsx

import { graphQLClient } from "@/lib/graphql-client";
import { GET_COURSES, GET_LANGUAGES } from "@/lib/queries";
import CourseCard from "@components/dashboard/CourseCard";
import Link from "next/link";
import Image from "next/image";
import { Course, Language, CoursesResponse } from "@/types/course";

interface LanguagesData {
  languages: Language[];
}

export default async function CoursesPage({
  searchParams,
}: {
  // Next.js 15 te pasa los searchParams envueltos en una Promise
  searchParams: Promise<{ language?: string }>;
}) {
  // Desempaqueta antes de usar
  const { language: activeLanguage } = await searchParams;

  const data = await graphQLClient.request<CoursesResponse>(GET_COURSES);
  const langData = await graphQLClient.request<LanguagesData>(GET_LANGUAGES);

  const allCourses = data.courses;
  const languages = langData.languages;
  const filteredCourses = activeLanguage
    ? allCourses.filter(course =>
        course.languages?.some(lang => lang.slugLanguage === activeLanguage)
      )
    : allCourses;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center mb-10">
        <h1
          className="
            text-5xl sm:text-6xl font-extrabold 
            bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 
            text-transparent bg-clip-text
            mb-2
          "
        >
          Explora nuestros cursos
        </h1>
        <p className="text-lg text-gray-600">
          Contenido de calidad creado por expertos en desarrollo web
        </p>
      </section>

      {/* Sticky filtros */}
      <div className="sticky top-0 bg-white backdrop-blur-sm bg-opacity-90 py-4 mb-8 z-20">
        <div className="flex overflow-x-auto space-x-3 px-1">
          <Link
            href="/dashboard/courses"
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              !activeLanguage
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos
          </Link>
          {languages.map((lang) => (
            <Link
              key={lang.id}
              href={`/dashboard/courses?language=${lang.slugLanguage}`}
              className={`flex items-center flex-shrink-0 gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeLanguage === lang.slugLanguage
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {lang.icono && (
                <Image
                  src={lang.icono.url}
                  alt={lang.name}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              )}
              {lang.name}
            </Link>
          ))}
        </div>
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

      {/* Sin resultados */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No se encontraron cursos
          </h2>
          <p className="text-gray-600">
            Prueba otro filtro o vuelve a “Todos”.
          </p>
        </div>
      )}

      {/* CTA Final */}
      {filteredCourses.length > 0 && (
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl text-center">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-blue-600 mb-6">
            Solicita un tema y lo añadiremos.
          </p>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-shadow shadow-sm">
            Solicitar un tema
          </button>
        </div>
      )}
    </div>
  );
}
