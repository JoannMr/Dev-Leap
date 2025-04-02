// app/dashboard/courses/[slug]/lessons/[lessonSlug]/page.tsx

import { graphQLClient } from "@/lib/graphql-client";
import { GET_LESSON_BY_SLUG } from "@/lib/queries";

export default async function LessonDetailPage({
  params,
}: {
  params: { lessonSlug: string };
}) {
  // Realiza la consulta usando el slug de la lección
  const { lesson } = await graphQLClient.request(GET_LESSON_BY_SLUG, {
    slug: params.lessonSlug,
  });

  if (!lesson) {
    return <div>Lección no encontrada</div>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">{lesson.titulo}</h1>
      {/* Mostrar el contenido HTML de la lección */}
      <div
        className="prose mt-4"
        dangerouslySetInnerHTML={{ __html: lesson.content.html }}
      />
      {/* Mostrar video si existe */}
      {lesson.videoUrl && lesson.videoUrl.url && (
        <div className="mt-4">
          <iframe
            src={lesson.videoUrl.url}
            title={lesson.titulo}
            className="w-full h-64"
            allowFullScreen
          />
        </div>
      )}
    </main>
  );
}
