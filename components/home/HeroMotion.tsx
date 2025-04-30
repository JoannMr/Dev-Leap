"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function HeroMotion() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mx-auto max-w-6xl text-center py-20 px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 text-transparent bg-clip-text"
      >
        ¡Desbloquea Tu Potencial Hoy Mismo!
        <br className="hidden sm:block" />
        Tu Centro para Cursos de Programación de Primera Categoría.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-10 text-gray-600 text-lg"
      >
        Cursos, carreras y diplomaturas en inteligencia artificial, programación,
        marketing digital, diseño UX/UI, data, y más.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-10 justify-center"
      >
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
        <Link href="#popular-courses">
          <button className="bg-transparent border border-blue-600 text-blue-600 font-bold py-3 px-4 rounded hover:bg-blue-600 hover:text-white">
            Saber más
          </button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="pt-10"
      >
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src="/videos/hero1.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
        </div>
      </motion.div>
    </motion.section>
  );
}