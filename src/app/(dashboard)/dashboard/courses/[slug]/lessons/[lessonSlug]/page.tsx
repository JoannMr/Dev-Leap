// app/dashboard/courses/[slug]/lessons/[lessonSlug]/page.tsx

import { graphQLClient } from "@/lib/graphql-client";
import { GET_LESSON_BY_SLUG } from "@/lib/queries";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Lesson } from "@/types/course";

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
    const courseData = lesson.course;
    if (!courseData || !courseData.lessons || courseData.lessons.length === 0) {
      return renderSingleLesson(lesson, slug);
    }

    const courseSlug = courseData.slug_curso;
    const allLessons = courseData.lessons;
    const currentIndex = allLessons.findIndex((l) => l.slug === lesson.slug);

    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navegación sticky superior */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href={`/dashboard/courses/${courseSlug}`} className="flex items-center text-gray-700 hover:text-blue-600">
              <ArrowLeft className="w-5 h-5 mr-2" /> Volver al curso
            </Link>
            <span className="text-sm text-gray-500">
              Lección {currentIndex + 1} de {allLessons.length}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{lesson.titulo}</h1>

            {lesson.videoUrl?.url ? (
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <iframe src={lesson.videoUrl.url} title={lesson.titulo} className="w-full h-full" allowFullScreen />
              </div>
            ) : (
              <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
                <Play className="w-16 h-16 opacity-50 mb-2 text-white" />
                <p className="text-white">No hay video disponible</p>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm prose prose-blue">
              <h2>Contenido de la lección</h2>
              <div dangerouslySetInnerHTML={{ __html: lesson.content?.html || '<p>No hay contenido disponible.</p>' }} />
            </div>

            <div className="flex justify-between">
              {prevLesson ? (
                <Link href={`/dashboard/courses/${courseSlug}/lessons/${prevLesson.slug}`} className="flex items-center text-blue-600 hover:underline">
                  <ArrowLeft className="w-5 h-5 mr-1" /> Anterior
                </Link>
              ) : <div />}
              {nextLesson && (
                <Link href={`/dashboard/courses/${courseSlug}/lessons/${nextLesson.slug}`} className="flex items-center text-blue-600 hover:underline">
                  Siguiente <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar con índice */}
          <aside className="hidden lg:block bg-white rounded-xl shadow-sm sticky top-24 overflow-y-auto max-h-[calc(100vh-6rem)]">
            <Link href={`/dashboard/courses/${courseSlug}`} className="block p-4 border-b font-semibold hover:bg-gray-50">
              {courseData.titulo_Curso} <ArrowUpRight className="w-4 h-4 inline-block ml-2" />
            </Link>
            <ul className="divide-y">
              {allLessons.map((item, idx) => (
                <li key={item.id} className={item.slug === lesson.slug ? 'bg-blue-50' : ''}>
                  <Link href={`/dashboard/courses/${courseSlug}/lessons/${item.slug}`} className="flex items-center p-4 hover:bg-gray-50">
                    <span className={`inline-block w-6 h-6 text-center rounded-full ${item.slug === lesson.slug ? 'bg-blue-600 text-white' : 'border text-gray-500'}`}>{idx + 1}</span>
                    <span className={`ml-2 ${item.slug === lesson.slug ? 'font-semibold text-blue-700' : ''}`}>{item.titulo}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error al cargar la lección:", error);
    return renderNotFound();
  }
}

function renderNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-xl font-semibold mb-4">Lección no encontrada</p>
        <Link href="/dashboard/courses" className="text-blue-600 hover:underline">Volver a cursos</Link>
      </div>
    </div>
  );
}

function renderSingleLesson(lesson: LessonResponse['lesson'], courseSlug: string) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 p-4">
        <Link href={`/dashboard/courses/${courseSlug}`} className="flex items-center text-gray-700 hover:text-blue-600">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver
        </Link>
      </div>
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold">{lesson.titulo}</h1>
        {lesson.videoUrl?.url && (
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <iframe src={lesson.videoUrl.url} title={lesson.titulo} className="w-full h-full" allowFullScreen />
          </div>
        )}
        <div className="bg-white p-6 rounded-xl shadow-sm prose prose-blue">
          <div dangerouslySetInnerHTML={{ __html: lesson.content?.html || '<p>No hay contenido.</p>' }} />
        </div>
      </div>
    </div>
  );
}