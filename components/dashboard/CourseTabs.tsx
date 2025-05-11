'use client';

import { useState } from 'react';
import { BookOpen, Info } from 'lucide-react';
import { Lesson } from '@/types/course';

interface CourseTabsProps {
  courseDescription: string;
  lessons?: Lesson[];
  courseSlug?: string;
  courseId?: string;
}

export default function CourseTabs({ courseDescription, lessons = [] }: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState<'acerca' | 'instructor' | 'opiniones'>('acerca');

  return (
    <>
      {/* Pestañas de navegación */}
      <div className="border-b border-blue-100 mb-10">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('acerca')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'acerca'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-blue-300'
            }`}
          >
            Acerca del curso
          </button>
          <button
            onClick={() => setActiveTab('instructor')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'instructor'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-blue-300'
            }`}
          >
            Instructor
          </button>
          <button
            onClick={() => setActiveTab('opiniones')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'opiniones'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-blue-300'
            }`}
          >
            Opiniones
          </button>
        </nav>
      </div>

      {/* Contenido de las pestañas */}
      <div>
        {/* Pestaña: Acerca del curso */}
        {activeTab === 'acerca' && (
          <div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 text-transparent bg-clip-text mb-6">Acerca de este curso</h2>
            <div
              className="prose prose-blue max-w-none mb-10"
              dangerouslySetInnerHTML={{ __html: courseDescription }}
            />

            {/* Lista de lecciones */}
            {lessons && lessons.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-10 border border-blue-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-blue-800">Lecciones del curso</h3>
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-700 flex items-center text-sm">
                    <Info className="w-4 h-4 mr-2" />
                    <span>Para acceder a las lecciones, inscríbete en el curso</span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {lessons.map((lesson, idx) => (
                    <li key={lesson.id} className="flex items-center p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-medium mr-3">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-medium text-gray-800 block">{lesson.titulo}</span>
                        <span className="text-sm text-gray-500 flex items-center mt-1">
                          <BookOpen className="w-4 h-4 mr-1" /> Lección {idx + 1}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    Para acceder a todas las lecciones y material del curso, por favor inscríbete utilizando el botón &ldquo;Comenzar curso&rdquo; que se encuentra en la barra lateral.
                  </p>
                </div>
              </div>
            )}

            {/* Lo que aprenderás */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-10 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Lo que aprenderás</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Dominarás los fundamentos y conceptos avanzados",
                  "Crearás proyectos del mundo real",
                  "Resolverás problemas eficientemente",
                  "Mejorarás tus habilidades técnicas",
                  "Desarrollarás un portafolio profesional",
                  "Estarás preparado para entrevistas técnicas"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Pestaña: Instructor */}
        {activeTab === 'instructor' && (
          <div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 text-transparent bg-clip-text mb-6">Tu instructor</h2>
            <div className="flex items-start gap-5 bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-green-500 p-0.5 overflow-hidden flex-shrink-0">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Pablo Martínez</h4>
                <p className="text-gray-500 text-sm">Desarrollador senior con 10+ años de experiencia</p>
                <p className="mt-3 text-gray-600">
                  Especialista en desarrollo web moderno con vasta experiencia en proyectos enterprise.
                  Ha formado a más de 10,000 estudiantes y es reconocido por su capacidad para explicar
                  conceptos complejos de forma simple y práctica.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Experiencia profesional</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-400 pl-4 bg-gradient-to-r from-blue-50 to-blue-100/30 p-4 rounded-r-lg">
                  <h4 className="font-medium text-blue-700">Lead Developer en TechCorp</h4>
                  <p className="text-sm text-blue-500">2018 - Presente</p>
                  <p className="mt-2 text-gray-600">
                    Lidera un equipo de desarrolladores en la creación de aplicaciones empresariales
                    utilizando las tecnologías más modernas como React, Next.js y Node.js.
                  </p>
                </div>
                <div className="border-l-2 border-green-400 pl-4 bg-gradient-to-r from-green-50 to-green-100/30 p-4 rounded-r-lg">
                  <h4 className="font-medium text-green-700">Desarrollador Frontend en StartupXYZ</h4>
                  <p className="text-sm text-green-500">2015 - 2018</p>
                  <p className="mt-2 text-gray-600">
                    Responsable del desarrollo de interfaces de usuario para múltiples proyectos
                    de clientes, implementando las mejores prácticas y patrones de diseño.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pestaña: Opiniones */}
        {activeTab === 'opiniones' && (
          <div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 text-transparent bg-clip-text mb-6">Opiniones de estudiantes</h2>
            
            <div className="flex items-center mb-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text mr-2">4.8</span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="ml-2 text-sm text-blue-600">Basado en 42 opiniones</span>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  name: "Ana García",
                  testimonial: "Este curso superó todas mis expectativas. El contenido es claro y los proyectos prácticos me ayudaron a consolidar lo aprendido. Recomendaría este curso a cualquiera que quiera mejorar sus habilidades de desarrollo.",
                  rating: 5,
                  date: "Hace 2 meses"
                },
                {
                  name: "Carlos Rodríguez",
                  testimonial: "Después de completar este curso, conseguí mi primer trabajo como desarrollador. La inversión valió totalmente la pena. El instructor explica los conceptos de manera clara y concisa.",
                  rating: 5,
                  date: "Hace 3 meses"
                },
                {
                  name: "Elena Martínez",
                  testimonial: "Excelente curso para principiantes. Me ha ayudado a entender conceptos que antes me parecían complicados. Los ejercicios prácticos son muy útiles.",
                  rating: 4,
                  date: "Hace 1 mes"
                },
                {
                  name: "Javier López",
                  testimonial: "Muy buen contenido, aunque algunas secciones podrían ser más detalladas. En general, una experiencia de aprendizaje satisfactoria.",
                  rating: 4,
                  date: "Hace 5 meses"
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="border border-blue-100 rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-medium mr-3">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-blue-600">{testimonial.date}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">&ldquo;{testimonial.testimonial}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
} 