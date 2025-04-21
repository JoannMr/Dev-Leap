"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course";

export default function PopularCoursesClient({ courses }: { courses: Course[] }) {
  return (
    <section id="popular-courses" className="py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text"
        >
          Cursos que ofrecemos
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-2 text-gray-600"
        >
          Explora algunos de nuestros cursos más populares
        </motion.p>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {courses.map((course: Course, index: number) => (
            <motion.div
              key={course.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
