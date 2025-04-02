// app/dashboard/courses/page.tsx

import Link from "next/link";
import { graphQLClient } from "@/lib/graphql-client";
import { GET_COURSES } from "@/lib/queries";

export default async function CoursesPage() {
  const data = await graphQLClient.request(GET_COURSES);
  const courses = data.courses;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cursos Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <div key={course.id} className="bg-white rounded-lg shadow p-4">
            {/* Imagen */}
            {course.imagenDestacada && (
              <img
                src={course.imagenDestacada.url}
                alt={course.titulo_Curso}
                className="w-full h-40 object-cover rounded"
              />
            )}

            {/* Enlace al detalle */}
            <Link href={`/dashboard/courses/${course.slug_curso}`}>
              <h2 className="text-lg font-semibold mt-2 hover:underline">
                {course.titulo_Curso}
              </h2>
            </Link>

            <p className="text-gray-600 mt-1">
              {course.descripcion_curso?.text?.substring(0, 60)}...
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {course.lessons.length} capítulos
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
