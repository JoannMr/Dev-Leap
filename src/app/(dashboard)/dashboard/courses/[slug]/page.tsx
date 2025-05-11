// app/dashboard/courses/[slug]/page.tsx

import { graphQLClient } from "@/lib/graphql-client";
import { GET_COURSE_BY_SLUG } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { Course, Language } from "@/types/course";
import CourseTabs from "@components/dashboard/CourseTabs";
import StartCourseButton from "@components/StartCourseButton";

interface CourseResponse {
  course: CourseDetail;
}

interface CourseDetail extends Course {
  descripcion_curso: {
    html: string;
  };
}

export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  await searchParams;

  const data = await graphQLClient.request<CourseResponse>(GET_COURSE_BY_SLUG, {
    slug,
  });

  const course = data.course;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-lg shadow-sm text-center max-w-md mx-auto">
          <h2 className="text-2xl font-medium text-red-600 mb-3">Curso no encontrado</h2>
          <Link href="/dashboard/courses" className="text-blue-600 underline">
            Volver a cursos
          </Link>
        </div>
      </div>
    );
  }

  const totalLessons = course.lessons?.length || 0;

  return (
    <div className="bg-white min-h-screen">
      {/* Navegación superior */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/dashboard/courses"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a cursos
          </Link>
        </div>
      </div>

      {/* Banner del curso */}
      <header className="relative bg-gradient-to-r from-blue-50 to-green-50 pt-16 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            {/* Etiquetas de lenguaje */}
            <div className="flex flex-wrap gap-2 mb-4">
              {course.languages?.map((lang: Language) => (
                <span
                  key={lang.id}
                  className="px-3 py-1 rounded-md bg-white text-blue-600 text-xs font-medium flex items-center shadow-sm"
                >
                  {lang.icono && (
                    <Image
                      src={lang.icono.url}
                      alt={lang.name}
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                  )}
                  {lang.name}
                </span>
              ))}
            </div>

            {/* Título del curso */}
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 text-transparent bg-clip-text mb-6">
              {course.titulo_Curso}
            </h1>

            {/* Meta información */}
            <div className="flex flex-wrap gap-6 text-gray-500 text-sm mb-8">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {totalLessons} {totalLessons === 1 ? 'lección' : 'lecciones'}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Actualizado recientemente
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Acceso ilimitado
              </div>
            </div>

            {/* Imagen destacada si existe */}
            {course.imagenDestacada && (
              <div className="mt-6 rounded-xl overflow-hidden relative h-[400px] shadow-lg">
                <Image
                  src={course.imagenDestacada.url}
                  alt={course.titulo_Curso}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-green-900/10"></div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Columna principal - Descripción e info */}
          <div className="lg:col-span-2">
            <CourseTabs 
              courseDescription={course.descripcion_curso.html} 
              lessons={course.lessons} 
              courseSlug={course.slug_curso}
              courseId={course.id}
            />
          </div>

          {/* Columna lateral - CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-blue-100 rounded-lg shadow-sm p-6">
              <h3 className="text-blue-800 font-semibold mb-4">Inscríbete ahora</h3>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>{totalLessons} lecciones completas</li>
                <li>Acceso ilimitado</li>
                <li>Proyectos descargables</li>
                <li>Certificado de finalización</li>
              </ul>
              <StartCourseButton
                courseId={course.id}
                slugCurso={course.slug_curso}
                lessons={course.lessons}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
