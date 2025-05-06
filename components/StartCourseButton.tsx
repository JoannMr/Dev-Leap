'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Lesson } from '@/types/course';

export default function StartCourseButton({
  courseId,
  slugCurso,
  lessons,
}: {
  courseId: string;
  slugCurso: string;
  lessons: Lesson[];
}) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [yaInscrito, setYaInscrito] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verificar = async () => {
      if (!user) return;
      
      setError(false);
      try {
        const res = await fetch('/api/comprobar-inscripcion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id, cursoId: courseId }),
        });

        const data = await res.json();
        setYaInscrito(data.yaInscrito);
      } catch {
        // Manejar el error sin exponerlo en consola
        setError(true);
      }
    };

    verificar();
  }, [user, courseId]);

  const handleStartCourse = async () => {
    if (!user || !lessons || lessons.length === 0) return;
    setLoading(true);
    setError(false);
    
    try {
      const res = await fetch('/api/inscripcion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          cursoId: courseId,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al guardar la inscripción');
      }

      router.push(`/dashboard/courses/${slugCurso}/lessons/${lessons[0].slug}`);
    } catch {
      // Manejar el error sin exponerlo en consola
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (yaInscrito) {
    return (
      <button
        onClick={() =>
          router.push(`/dashboard/courses/${slugCurso}/lessons/${lessons[0].slug}`)
        }
        className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md text-center hover:bg-green-700 transition-colors"
      >
        Continuar curso
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleStartCourse}
        disabled={loading || !lessons || lessons.length === 0}
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md text-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Inscribiendo...' : 'Comenzar curso'}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">
          Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.
        </p>
      )}
    </>
  );
}
