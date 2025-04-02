// components/Footer.tsx

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Fila principal: en desktop, tres bloques en línea; en móvil, apilados */}
        <div className="flex flex-col md:flex-row items-center w-full">
          {/* Bloque 1: Logo a la izquierda en desktop */}
          <div className="md:mr-auto flex justify-center md:justify-start">
            <Link href="/">
              <Image
                src="/logo/devleap.webp"
                alt="DevLeap Logo"
                width={100}
                height={20}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Bloque 2: Menú al centro en desktop */}
          <div className="flex-1 flex justify-center mt-4 md:mt-0">
            <nav className="flex flex-wrap items-center space-x-20 text-lg font-normal">
              <Link href="/" className="hover:underline">
                Inicio
              </Link>
              <Link href="/programas" className="hover:underline">
                Programas
              </Link>
              <Link href="/empresas" className="hover:underline">
                DevLeap para empresas
              </Link>
              <Link href="/faqs" className="hover:underline">
                FAQ
              </Link>
              <SignedIn>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/auth/login" className="hover:underline">
                  Dashboard
                </Link>
              </SignedOut>
            </nav>
          </div>

          {/* Bloque 3: Iconos a la derecha en desktop */}
          <div className="md:ml-auto flex justify-center mt-4 md:mt-0 space-x-4">
            {/* Twitter */}
            <Link
              href="https://twitter.com/"
              className="flex items-center justify-center bg-gray-800 rounded-full w-10 h-10 hover:bg-blue-400"
            >
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.949.564-2.005.974-3.127 1.195-.897-.959-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.111-.85.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.376 4.604 3.416-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.788-.023-1.17-.067 2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 14.001-7.496 14.001-13.986 0-.209 0-.423-.015-.637.961-.695 1.8-1.562 2.46-2.549z" />
              </svg>
            </Link>
            {/* GitHub */}
            <Link
              href="https://github.com/"
              className="flex items-center justify-center bg-gray-800 rounded-full w-10 h-10 hover:bg-gray-300"
            >
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.011-1.04-.017-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.997.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3-.404 11.5 11.5 0 0 1 3 .404c2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .319.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
            {/* YouTube */}
            <Link
              href="https://youtube.com/"
              className="flex items-center justify-center bg-gray-800 rounded-full w-10 h-10 hover:bg-red-500"
            >
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M19.615 3.184C18.45 2.737 12 2.737 12 2.737s-6.45 0-7.615.447A4.329 4.329 0 0 0 2.08 7.08C1.63 8.245 1.63 12 1.63 12s0 3.755.45 4.92a4.329 4.329 0 0 0 2.305 3.896C5.55 21.263 12 21.263 12 21.263s6.45 0 7.615-.447a4.329 4.329 0 0 0 2.305-3.896c.45-1.165.45-4.92.45-4.92s0-3.755-.45-4.92a4.329 4.329 0 0 0-2.305-3.896zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-gray my-6"></div>

        {/* Texto de derechos */}
        <div className="text-center text-base text-white-300">
          © DevLeap 2025, Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
