// app/dashboard/courses/[slug]/page.tsx

import { graphQLClient } from "@/lib/graphql-client";
import { GET_COURSE_BY_SLUG } from "@/lib/queries";
import Link from "next/link";

export default async function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Hacemos la consulta usando el slug
  const { course } = await graphQLClient.request(GET_COURSE_BY_SLUG, {
    slug: params.slug,
  });

  // Si no existe el curso, mostramos un mensaje
  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">{course.titulo_Curso}</h1>

      {/* Descripción en HTML */}
      <div
        className="prose mt-2"
        dangerouslySetInnerHTML={{ __html: course.descripcion_curso.html }}
      />

      {/* Imagen destacada grande */}
      {course.imagenDestacada && (
        <img
          src={course.imagenDestacada.url}
          alt={course.titulo_Curso}
          className="w-full h-60 object-cover rounded mt-4"
        />
      )}

      {/* Lista de lecciones */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Lecciones</h2>
        {course.lessons && course.lessons.length > 0 ? (
          <ul className="space-y-2">
            {course.lessons.map((lesson: any) => (
              <li
                key={lesson.id}
                className="p-2 border rounded hover:bg-gray-100"
              >
              <Link href={`/dashboard/courses/${course.slug_curso}/lessons/${lesson.slug}`}>
                <p className="font-medium hover:underline">{lesson.titulo}</p>
              </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay lecciones.</p>
        )}
      </section>
    </main>
  );
}
