// components/Hero.tsx

import React from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl text-center py-20 px-4">
      {/* Título principal con gradiente */}
      <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 text-transparent bg-clip-text ">
        ¡Desbloquea Tu Potencial Hoy Mismo!
        <br className="hidden sm:block" />
        Tu Centro para Cursos de Programación de Primera Categoría.
      </h1>

      {/* Subtítulo */}
      <p className="mt-10 text-gray-600 text-lg">
        Cursos, carreras y diplomaturas en inteligencia artificial, programación,
        marketing digital, diseño UX/UI, data, y más.
      </p>

      {/* Botones de acción */}
      <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-10 justify-center">
        {/* Botón "Empieza Ahora": si el usuario está autenticado va a /dashboard; si no, a /auth/login */}
        <SignedIn>
          <Link href="/dashboard">
            <button className="bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700">
              Empieza Ahora
            </button>
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href="/auth/login">
            <button className="bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700">
              Empieza Ahora
            </button>
          </Link>
        </SignedOut>
        {/* Botón "Saber más" que siempre lleva a la sección de cursos en la homepage */}
        <Link href="#popular-courses">
          <button className="bg-transparent border border-blue-600 text-blue-600 font-bold py-3 px-4 rounded hover:bg-blue-600 hover:text-white">
            Saber más
          </button>
        </Link>
      </div>

      {/* Video */}
      <div className="pt-10">
        <video className="rounded-xl" autoPlay muted loop>
          <source src="/videos/hero1.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
