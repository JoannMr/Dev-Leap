// components/PopularCoursesSection.tsx

import Image from "next/image";
import Link from "next/link";
import { graphQLClient } from "@/lib/graphql-client";
import { GET_COURSES } from "@/lib/queries";

export default async function PopularCoursesSection() {
  // Realizamos la consulta a Hygraph para obtener los cursos
  const data = await graphQLClient.request(GET_COURSES);
  // Tomamos los primeros 3 cursos (puedes ajustar la lógica según tus criterios)
  const courses = data.courses.slice(0, 3);

  return (
    <section id="popular-courses" className="py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
          Cursos que ofrecemos
        </h2>
        <p className="mt-2 text-gray-600">
          Explora algunos de nuestros cursos más populares
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {courses.map((course: any) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-48">
                <Image
                  src={course.imagenDestacada?.url || "/images/placeholder.png"}
                  alt={course.titulo_Curso}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 text-left">
                <h3 className="text-lg font-bold text-gray-800">
                  {course.titulo_Curso}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {course.descripcion_curso?.text?.substring(0, 500)}
                </p>
                <Link
                  href={`/dashboard/courses/${course.slug_curso}`}
                  className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
                >
                  Ver curso
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
