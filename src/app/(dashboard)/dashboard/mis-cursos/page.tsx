'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Inscripcion {
  id: string;
  userId: string;
  course: {
    id: string;
    titulo_Curso: string;
    slug_curso: string;
    imagenDestacada?: {
      url: string;
    };
    lessons?: {
      id: string;
      slug: string;
    }[];
  };
}

export default function MyCoursesPage() {
  const { user } = useUser();
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchInscripciones() {
      if (!user) return;
      try {
        const res = await fetch('/api/mis-cursos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        });

        const data = await res.json();
        setInscripciones(data.inscripcions || []);
      } catch {
        // Manejar error sin exponerlo
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchInscripciones();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-teal-100 h-16 w-16 flex items-center justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-lg font-medium text-teal-600">Cargando tus cursos...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-gray-200">
          <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Acceso Restringido</h2>
          <p className="text-gray-600 mb-6">Debes estar autenticado para ver tus cursos.</p>
          <Link href="/sign-in" className="inline-block bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-6 rounded-lg font-medium transition-all hover:opacity-90">
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-gray-200">
          <svg className="w-16 h-16 text-orange-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-orange-600 mb-2">Error al cargar tus cursos</h2>
          <p className="text-gray-600 mb-6">No hemos podido cargar tus cursos. Por favor, inténtalo de nuevo más tarde.</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-block bg-gradient-to-r from-orange-500 to-amber-400 text-white py-2 px-6 rounded-lg font-medium transition-all hover:opacity-90"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (inscripciones.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-gray-200">
          <div className="bg-teal-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-blue-600 mb-3">No hay cursos inscritos</h2>
          <p className="text-gray-600 mb-6">Todavía no te has inscrito a ningún curso. ¡Explora nuestro catálogo y comienza tu aprendizaje hoy!</p>
          <Link 
            href="/dashboard/courses" 
            className="inline-flex items-center bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2.5 px-6 rounded-lg font-medium transition-all hover:opacity-90"
          >
            Explorar cursos
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  // Generar un color de fondo aleatorio suave si no hay imagen
  const getRandomBgColor = () => {
    const backgroundColors = [
      'bg-blue-50', 'bg-teal-50', 'bg-cyan-50', 
      'bg-sky-50', 'bg-emerald-50', 'bg-green-50'
    ];
    return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  };

  const totalCapitulos = inscripciones.reduce((sum, insc) => 
    sum + (insc.course.lessons?.length || 0), 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-white py-10 px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 mb-2">Mis cursos</h1>
              <p className="text-gray-600 max-w-xl">
                Continúa tu aprendizaje donde lo dejaste. Tu progreso, a un solo clic.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-teal-400/10 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-100">
                <p className="text-3xl font-bold text-blue-600">{inscripciones.length}</p>
                <p className="text-xs text-teal-500">Cursos inscritos</p>
              </div>
              <div className="bg-gradient-to-br from-teal-400/10 to-green-400/10 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-100">
                <p className="text-3xl font-bold text-teal-500">{totalCapitulos}</p>
                <p className="text-xs text-blue-500">Capítulos totales</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Lista de cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inscripciones.map((insc) => {
            const curso = insc.course;
            const isHovered = hoveredCardId === insc.id;
            const randomBgColor = getRandomBgColor();
            
            return (
              <div 
                key={insc.id} 
                className={`
                  relative group overflow-hidden
                  bg-white rounded-lg border border-gray-100
                  transition-all duration-300 flex flex-col
                  ${isHovered ? 'shadow-md translate-y-[-4px]' : 'shadow-sm'}
                `}
                onMouseEnter={() => setHoveredCardId(insc.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                {/* Top Banner con imagen o gradiente */}
                <div className={`relative h-40 w-full overflow-hidden ${!curso.imagenDestacada?.url ? randomBgColor : ''}`}>
                  {curso.imagenDestacada?.url ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={curso.imagenDestacada.url}
                        alt={curso.titulo_Curso}
                        fill
                        className={`
                          object-cover w-full transition-all duration-500
                          ${isHovered ? 'scale-105' : ''}
                        `}
                      />
                      <div className={`
                        absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent
                        transition-opacity duration-300
                        ${isHovered ? 'opacity-30' : 'opacity-50'}
                      `}/>
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="text-4xl text-gray-300">
                        <svg className="w-10 h-10 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Contenido */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Título */}
                  <h2 className="text-lg font-medium text-gray-800 transition-colors line-clamp-2 mb-4">
                    {curso.titulo_Curso}
                  </h2>
                  
                  {/* Footer con botones */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                      </svg>
                      <span>{curso.lessons?.length || 0} {curso.lessons?.length === 1 ? 'capítulo' : 'capítulos'}</span>
                    </div>
                    
                    <Link 
                      href={`/dashboard/courses/${curso.slug_curso}/lessons/${curso.lessons?.[0]?.slug}`} 
                      className={`
                        inline-flex items-center text-xs font-medium px-3 py-1 rounded-md
                        transition-all duration-300 hover:bg-blue-50
                        ${isHovered ? 'text-teal-500' : 'text-blue-500'}
                      `}
                    >
                      Continuar curso
                      <svg className={`
                        w-3.5 h-3.5 ml-1 transition-all duration-300
                        ${isHovered ? 'transform translate-x-0.5' : ''}
                      `} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}