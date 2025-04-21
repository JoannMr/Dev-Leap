// app/dashboard/courses/[slug]/lessons/[lessonSlug]/page.tsx

import { graphQLClient } from "@/lib/graphql-client";
import { GET_LESSON_BY_SLUG } from "@/lib/queries";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Home, Play } from "lucide-react";
import { Lesson } from "@/types/course";

interface LessonResponse {
  lesson: {
    id: string;
    titulo: string;
    slug: string;
    content?: {
      html?: string;
    };
    videoUrl?: {
      url: string;
    };
    course?: {
      id: string;
      titulo_Curso: string;
      slug_curso: string;
      lessons?: Lesson[];
    };
  };
}

export default async function LessonDetailPage({
  params,
}: {
  params: { slug: string; lessonSlug: string };
}) {
  try {
  // Realiza la consulta usando el slug de la lección
    const { lesson } = await graphQLClient.request<LessonResponse>(GET_LESSON_BY_SLUG, {
    slug: params.lessonSlug,
  });

  if (!lesson) {
      return renderNotFound();
    }

    // Verificamos que course y lessons existan
    if (!lesson.course || !lesson.course.lessons || lesson.course.lessons.length === 0) {
      // Si no hay datos del curso o lecciones, mostramos solo la lección actual
      return renderSingleLesson(lesson, params.slug);
    }

    const courseSlug = lesson.course.slug_curso;
    const allLessons = lesson.course.lessons;
    const currentLessonIndex = allLessons.findIndex((l) => l.slug === lesson.slug);
    
    // Determinar lección anterior y siguiente
    const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
    const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Barra de navegación superior */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link 
                  href={`/dashboard/courses/${courseSlug}`}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span className="font-medium">Volver al curso</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <span className="hidden sm:block text-sm text-gray-500">
                  Lección {currentLessonIndex + 1} de {allLessons.length}
                </span>
                <div className="flex items-center space-x-2">
                  {prevLesson && (
                    <Link
                      href={`/dashboard/courses/${courseSlug}/lessons/${prevLesson.slug}`}
                      className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title={`Anterior: ${prevLesson.titulo}`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Link>
                  )}
                  {nextLesson && (
                    <Link
                      href={`/dashboard/courses/${courseSlug}/lessons/${nextLesson.slug}`}
                      className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title={`Siguiente: ${nextLesson.titulo}`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  )}
                  <Link
                    href={`/dashboard/courses/${courseSlug}`}
                    className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Índice del curso"
                  >
                    <Home className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenido principal - Video y descripción */}
            <div className="lg:col-span-2 space-y-6">
              {/* Título de la lección */}
              <div>
                <span className="text-blue-600 font-medium text-sm">Lección {currentLessonIndex + 1}</span>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">{lesson.titulo}</h1>
              </div>

              {/* Reproductor de video */}
              {lesson.videoUrl && lesson.videoUrl.url ? (
                <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video">
                  <iframe
                    src={lesson.videoUrl.url}
                    title={lesson.titulo}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl flex items-center justify-center aspect-video">
                  <div className="text-center text-white p-8">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-40" />
                    <p className="text-lg font-medium">No hay video disponible para esta lección</p>
                  </div>
                </div>
              )}

              {/* Navegación entre lecciones (móvil) */}
              <div className="flex items-center justify-between lg:hidden mt-4 border-t border-b border-gray-200 py-4">
                {prevLesson ? (
                  <Link
                    href={`/dashboard/courses/${courseSlug}/lessons/${prevLesson.slug}`}
                    className="flex items-center text-sm font-medium text-blue-600"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    <span className="truncate max-w-[150px]">{prevLesson.titulo}</span>
                  </Link>
                ) : (
                  <div></div>
                )}
                {nextLesson && (
                  <Link
                    href={`/dashboard/courses/${courseSlug}/lessons/${nextLesson.slug}`}
                    className="flex items-center text-sm font-medium text-blue-600"
                  >
                    <span className="truncate max-w-[150px]">{nextLesson.titulo}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
              </div>
              
              {/* Contenido de la lección */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contenido de la lección</h2>
                <div
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: lesson.content?.html || '<p>No hay contenido disponible para esta lección.</p>' }}
                />
              </div>

              {/* Navegación entre lecciones (detallada) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {prevLesson && (
                  <Link
                    href={`/dashboard/courses/${courseSlug}/lessons/${prevLesson.slug}`}
                    className="group bg-white rounded-xl shadow-sm p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <ArrowLeft className="w-4 h-4 mr-1 group-hover:text-blue-600" />
                      <span>Lección anterior</span>
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {prevLesson.titulo}
                    </h3>
                  </Link>
                )}

                {nextLesson && (
                  <Link
                    href={`/dashboard/courses/${courseSlug}/lessons/${nextLesson.slug}`}
                    className="group bg-white rounded-xl shadow-sm p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all sm:text-right"
                  >
                    <div className="flex items-center justify-end text-sm text-gray-500 mb-2">
                      <span>Siguiente lección</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {nextLesson.titulo}
                    </h3>
                  </Link>
                )}
              </div>
            </div>

            {/* Barra lateral - Índice del curso */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-4 border-b border-gray-100">
                  <Link 
                    href={`/dashboard/courses/${courseSlug}`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors flex items-center"
                  >
                    {lesson.course.titulo_Curso}
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{allLessons.length} {allLessons.length === 1 ? 'lección' : 'lecciones'}</p>
                </div>

                <ul className="divide-y divide-gray-100 max-h-[calc(100vh-180px)] overflow-y-auto">
                  {allLessons.map((lessonItem, index) => {
                    const isCurrentLesson = lessonItem.slug === lesson.slug;
                    return (
                      <li key={lessonItem.id} className="relative">
                        <Link
                          href={`/dashboard/courses/${courseSlug}/lessons/${lessonItem.slug}`}
                          className={`flex items-start p-4 transition-colors group ${
                            isCurrentLesson 
                              ? 'bg-blue-50 hover:bg-blue-50' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {/* Indicador de lección (actual o número) */}
                          <div className="flex-shrink-0 mr-3 mt-0.5">
                            <div 
                              className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                                isCurrentLesson
                                  ? 'bg-blue-600 text-white'
                                  : 'border border-gray-300 text-gray-500 group-hover:border-blue-500 group-hover:text-blue-600'
                              }`}
                            >
                              {index + 1}
                            </div>
                          </div>

                          <div className="flex-grow min-w-0">
                            <h3 
                              className={`text-base font-medium truncate pr-8 ${
                                isCurrentLesson
                                  ? 'text-blue-700'
                                  : 'text-gray-800 group-hover:text-blue-600'
                              } transition-colors`}
                            >
                              {lessonItem.titulo}
                            </h3>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error al cargar la lección:", error);
    return renderNotFound();
  }
}

// Función para renderizar la página cuando la lección no se encuentra
function renderNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-red-100 rounded-full">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="mt-4 text-xl font-semibold text-gray-700">Lección no encontrada</h1>
        <p className="mt-2 text-gray-500">La lección que estás buscando no existe o no está disponible.</p>
        <Link href={`/dashboard/courses`} className="mt-6 inline-block px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Volver a cursos
        </Link>
      </div>
    </div>
  );
}

// Función para renderizar una lección individual sin navegación de curso
function renderSingleLesson(lesson: LessonResponse['lesson'], courseSlug: string) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación superior simplificada */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                href={`/dashboard/courses/${courseSlug}`}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Volver</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Título de la lección */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lesson.titulo}</h1>
          </div>

          {/* Reproductor de video */}
          {lesson.videoUrl && lesson.videoUrl.url ? (
            <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video">
          <iframe
            src={lesson.videoUrl.url}
            title={lesson.titulo}
                className="w-full h-full"
            allowFullScreen
          />
        </div>
          ) : (
            <div className="bg-gray-800 rounded-xl flex items-center justify-center aspect-video">
              <div className="text-center text-white p-8">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">No hay video disponible para esta lección</p>
              </div>
        </div>
      )}
          
          {/* Contenido de la lección */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contenido de la lección</h2>
            <div
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content?.html || '<p>No hay contenido disponible para esta lección.</p>' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
