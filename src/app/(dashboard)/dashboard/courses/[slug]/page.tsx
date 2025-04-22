// app/dashboard/courses/[slug]/page.tsx

import { graphQLClient } from "@/lib/graphql-client";
import { GET_COURSE_BY_SLUG } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { Course, Language, Lesson } from "@/types/course";
import CourseTabs from "@components/dashboard/CourseTabs";

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
  // Ambos vienen como promesas en Next.js 15
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Desempaquetas primero:
  const { slug } = await params;
  await searchParams; // aunque no lo uses

  const data = await graphQLClient.request<CourseResponse>(GET_COURSE_BY_SLUG, {
    slug,
  });
  
  const course = data.course;

  // Si no existe el curso, mostramos un mensaje
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-lg shadow-sm text-center max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-6">
            <svg className="w-full h-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 text-transparent bg-clip-text mb-3">Curso no encontrado</h2>
          <p className="text-gray-500 mb-8">No pudimos encontrar el curso que estás buscando.</p>
          <Link
            href="/dashboard/courses"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
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
            {/* Aquí usamos el componente de pestañas */}
            <CourseTabs 
              courseDescription={course.descripcion_curso.html}
            />
          </div>
          
          {/* Columna lateral - Lecciones y CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Tarjeta de inscripción */}
              <div className="border border-blue-100 rounded-lg overflow-hidden shadow-sm mb-6">
                <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100">
                  <h3 className="font-medium text-blue-800">Inscríbete ahora</h3>
                </div>
                <div className="p-6 bg-white">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {totalLessons} lecciones completas
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Acceso ilimitado
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Proyectos descargables
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Certificado de finalización
                    </li>
                  </ul>
                  
                  <Link 
                    href={course.lessons && course.lessons.length > 0 ? 
                      `/dashboard/courses/${course.slug_curso}/lessons/${course.lessons[0]?.slug || ''}` :
                      "#"
                    }
                    className={`block w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md text-center transition-colors hover:bg-blue-700 ${!course.lessons || course.lessons.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Comenzar curso
                  </Link>
                </div>
              </div>
              
              {/* Contenido del curso */}
              <div className="border border-blue-100 rounded-lg overflow-hidden shadow-sm">
                <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100 flex justify-between items-center">
                  <h3 className="font-medium text-blue-800">Contenido del curso</h3>
                  <span className="text-sm text-blue-600">{totalLessons} lecciones</span>
                </div>
                <div className="max-h-[50vh] overflow-y-auto bg-white">
                  <ul className="divide-y divide-blue-100">
                    {course.lessons && course.lessons.map((lesson: Lesson, idx: number) => (
                      <li key={lesson.id}>
                        <Link
                          href={`/dashboard/courses/${course.slug_curso}/lessons/${lesson.slug}`}
                          className="block px-6 py-4 hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-start">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs font-medium mr-3 mt-0.5">
                              {idx + 1}
                            </span>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 leading-5">
                                {lesson.titulo}
                              </h4>
                              <p className="text-xs text-blue-600 mt-1">Lección {idx + 1}</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">¿Listo para comenzar tu aprendizaje?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">Únete a miles de estudiantes que están transformando sus carreras con nuestros cursos de calidad.</p>
          <Link 
            href={course.lessons && course.lessons.length > 0 ? 
              `/dashboard/courses/${course.slug_curso}/lessons/${course.lessons[0]?.slug || ''}` :
              "#"
            }
            className={`inline-block py-3 px-8 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors ${!course.lessons || course.lessons.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Comenzar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
