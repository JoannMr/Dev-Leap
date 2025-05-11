// app/dashboard/courses/[slug]/lessons/[lessonSlug]/page.tsx

import { graphQLClient } from "@/lib/graphql-client";
import { GET_LESSON_BY_SLUG, GET_COURSE_BY_SLUG } from "@/lib/queries";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, CheckCircle2, BookOpen, Clock, List } from "lucide-react";
import { Lesson, Course } from "@/types/course";

interface LessonResponse {
  lesson: {
    id: string;
    titulo: string;
    slug: string;
    content?: { html?: string };
    videoUrl?: { url: string };
    course?: {
      id: string;
      titulo_Curso: string;
      slug_curso: string;
      lessons?: Lesson[];
    };
  };
}

interface CourseResponse {
  course: Course & {
    descripcion_curso: {
      html: string;
    };
  };
}

export default async function LessonDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Desempaquetar los valores asíncronos que Next.js proporciona en PageProps
  const { slug, lessonSlug } = await params;
  await searchParams;

  try {
    // Realiza la consulta usando el slug de la lección
    const { lesson } = await graphQLClient.request<LessonResponse>(
      GET_LESSON_BY_SLUG,
      { slug: lessonSlug }
    );

    if (!lesson) {
      return renderNotFound();
    }

    // Verificar datos del curso
    let courseData = lesson.course;
    let allLessons: Lesson[] = [];
    
    // Si no hay información completa del curso o no hay lecciones, intentamos obtener el curso directamente
    if (!courseData || !courseData.lessons || courseData.lessons.length === 0) {
      try {
        // Realizamos una consulta adicional para obtener el curso completo
        const courseResponse = await graphQLClient.request<CourseResponse>(
          GET_COURSE_BY_SLUG,
          { slug }
        );
        
        if (courseResponse.course) {
          courseData = {
            id: courseResponse.course.id,
            titulo_Curso: courseResponse.course.titulo_Curso,
            slug_curso: courseResponse.course.slug_curso,
            lessons: courseResponse.course.lessons
          };
          allLessons = courseResponse.course.lessons;
        }
      } catch {
        // Si hay algún error, continuamos con los datos que tengamos
      }
    } else {
      allLessons = courseData.lessons;
    }

    // Si aún no tenemos datos del curso o lecciones, mostramos la vista de lección única
    if (!courseData || !allLessons || allLessons.length === 0) {
      return renderSingleLesson(lesson, slug);
    }

    const courseSlug = courseData.slug_curso;
    const currentIndex = allLessons.findIndex((l) => l.slug === lesson.slug);

    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

    // Calculamos el progreso del curso
    const progress = Math.round(((currentIndex + 1) / allLessons.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Navegación sticky superior */}
        <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href={`/dashboard/courses/${courseSlug}`} className="flex items-center text-slate-700 hover:text-blue-600 transition-colors font-medium">
                <ArrowLeft className="w-5 h-5 mr-2" /> 
                <span className="hidden sm:inline">Volver al curso</span>
                <span className="sm:hidden">Volver</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center bg-blue-50 px-3 py-1.5 rounded-full">
                  <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">
                    {courseData.titulo_Curso}
                  </span>
                </div>
                <div className="bg-green-50 px-3 py-1.5 rounded-full flex items-center">
                  <span className="text-sm font-medium text-green-800">
                    Lección {currentIndex + 1} de {allLessons.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Barra de progreso */}
          <div className="w-full h-1 bg-gray-100">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 grid lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Video o placeholder */}
              {lesson.videoUrl?.url ? (
                <div className="aspect-video bg-black">
                  <iframe src={lesson.videoUrl.url} title={lesson.titulo} className="w-full h-full" allowFullScreen />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 opacity-50 mb-2 text-white mx-auto" />
                    <p className="text-white text-opacity-80">No hay video disponible</p>
                  </div>
                </div>
              )}
              
              {/* Título y metadatos */}
              <div className="p-6 md:p-8 border-b">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Capítulo {currentIndex + 1}
                  </span>
                  <span className="mx-2 text-slate-300">•</span>
                  <span className="text-slate-500 text-sm flex items-center">
                    <Clock className="inline w-4 h-4 mr-1" /> 15 min
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{lesson.titulo}</h1>
              </div>
              
              {/* Contenido de la lección */}
              <div className="p-6 md:p-8">
                <div className="prose prose-blue prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: lesson.content?.html || '<p>No hay contenido disponible.</p>' }} />
                </div>
              </div>
            </div>

            {/* Navegación entre lecciones */}
            <div className="flex justify-between mt-8">
              {prevLesson ? (
                <Link 
                  href={`/dashboard/courses/${courseSlug}/lessons/${prevLesson.slug}`} 
                  className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> 
                  <div>
                    <div className="text-xs text-slate-500">Anterior</div>
                    <div className="font-medium truncate max-w-[200px]">{prevLesson.titulo}</div>
                  </div>
                </Link>
              ) : <div />}
              
              {nextLesson && (
                <Link 
                  href={`/dashboard/courses/${courseSlug}/lessons/${nextLesson.slug}`} 
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm ml-auto"
                >
                  <div className="text-right">
                    <div className="text-xs text-blue-200">Siguiente</div>
                    <div className="font-medium truncate max-w-[200px]">{nextLesson.titulo}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              )}
            </div>

            {/* Lista de todas las lecciones del curso (móvil) */}
            <div className="mt-8 lg:hidden">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <List className="w-5 h-5 mr-2 text-blue-600" />
                  Contenido del curso
                </h2>
                <div className="space-y-2">
                  {allLessons.map((item, idx) => (
                    <Link 
                      key={item.id}
                      href={`/dashboard/courses/${courseSlug}/lessons/${item.slug}`}
                    >
                      <div className={`p-3 rounded-xl border ${item.slug === lesson.slug 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'border-slate-200 hover:border-blue-200 hover:bg-blue-50'} transition-colors`}>
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                            item.slug === lesson.slug 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-slate-100 text-slate-700'
                          } font-medium text-sm`}>
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-medium ${
                              item.slug === lesson.slug 
                                ? 'text-blue-800' 
                                : 'text-slate-700'
                            }`}>
                              {item.titulo}
                            </h3>
                          </div>
                          {item.slug === lesson.slug && (
                            <span className="text-blue-600">
                              <CheckCircle2 className="w-5 h-5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar con índice (escritorio) */}
          <aside className="hidden lg:block sticky top-24 h-fit self-start">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <Link href={`/dashboard/courses/${courseSlug}`} className="flex items-center justify-between text-slate-900 font-bold hover:text-blue-600 transition-colors">
                  <span>{courseData.titulo_Curso}</span> 
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <div className="mt-4 flex items-center">
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-slate-600">{progress}%</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-500 mb-3 px-2">CONTENIDO DEL CURSO</h3>
                <div className="space-y-1 max-h-[calc(100vh-12rem)] overflow-y-auto">
                  {allLessons.map((item, idx) => (
                    <Link 
                      key={item.id}
                      href={`/dashboard/courses/${courseSlug}/lessons/${item.slug}`}
                      className={`flex items-center p-2 rounded-lg ${
                        item.slug === lesson.slug 
                          ? 'bg-blue-50 text-blue-800' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                        item.slug === lesson.slug 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-100 text-slate-700'
                      } text-xs font-medium mr-3`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm ${item.slug === lesson.slug ? 'font-semibold' : 'font-medium'}`}>
                          {item.titulo}
                        </h4>
                      </div>
                      {item.slug === lesson.slug ? (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 ml-2" />
                      ) : (
                        idx < currentIndex && <CheckCircle2 className="w-4 h-4 text-green-500 ml-2 opacity-70" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  } catch {
    return renderNotFound();
  }
}

function renderNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-4">
        <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Lección no encontrada</h2>
        <p className="text-slate-500 mb-6">
          Lo sentimos, la lección que estás buscando no está disponible o ha sido eliminada.
        </p>
        <Link href="/dashboard/courses" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors">
          Volver a cursos
        </Link>
      </div>
    </div>
  );
}

function renderSingleLesson(lesson: LessonResponse['lesson'], courseSlug: string) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <Link href={`/dashboard/courses/${courseSlug}`} className="flex items-center text-slate-700 hover:text-blue-600 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5 mr-2" /> Volver al curso
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Video o placeholder */}
          {lesson.videoUrl?.url ? (
            <div className="aspect-video bg-black">
              <iframe src={lesson.videoUrl.url} title={lesson.titulo} className="w-full h-full" allowFullScreen />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 opacity-50 mb-2 text-white mx-auto" />
                <p className="text-white text-opacity-80">No hay video disponible</p>
              </div>
            </div>
          )}
          
          {/* Título y contenido */}
          <div className="p-6 md:p-8 border-b">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{lesson.titulo}</h1>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="prose prose-blue prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: lesson.content?.html || '<p>No hay contenido disponible.</p>' }} />
            </div>
          </div>
        </div>

        {/* Información sobre lección única */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Información del curso</h2>
          </div>
          <p className="text-slate-600 border-l-2 border-blue-200 pl-4 py-2 bg-blue-50 rounded-r-lg">
            Esta es la única lección disponible en este curso por el momento. Estamos trabajando para añadir más contenido pronto.
          </p>
          <div className="mt-6 flex justify-center">
            <Link 
              href={`/dashboard/courses/${courseSlug}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Volver al curso
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}