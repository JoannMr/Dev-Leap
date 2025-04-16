// components/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full shadow font-semibold">
      {/* Versión móvil */}
      <div className="md:hidden">
        <nav className="container mx-auto px-4 py-4">
          {/* Barra superior fija con logo y botón */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/">
                <Image
                  src="/logo/devleap.svg"
                  alt="DevLeap Logo"
                  className="h-8 w-auto"
                  width={100}
                  height={20}
                />
              </Link>
            </div>
            
            {/* Botón hamburguesa */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col space-y-1.5 p-2"
              aria-label="Abrir menú"
            >
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </button>
          </div>
          
          {/* Menú desplegable */}
          {isMobileMenuOpen && (
            <div className="py-4">
              {/* Links de navegación */}
              <ul className="flex flex-col space-y-4 border-b pb-4 mb-4">
                <li className="text-center">
                  <Link href="/">Inicio</Link>
                </li>
                <li className="text-center">
                  <Link href="/programas">Programas</Link>
                </li>
                <li className="text-center">
                  <Link href="/empresas">DevLeap para empresas</Link>
                </li>
                <li className="text-center">
                  <Link href="/faqs">FAQS</Link>
                </li>
              </ul>
              
              {/* Botones de acción */}
              <div className="flex flex-col space-y-3">
                <SignedIn>
                  <div className="flex justify-center items-center space-x-4">
                    <Link
                      href="/dashboard"
                      className="text-black font-semibold px-4 py-2 rounded transition-colors hover:bg-gray-100 text-center"
                    >
                      Dashboard
                    </Link>
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-9 h-9",
                        },
                      }}
                    />
                  </div>
                </SignedIn>
                <SignedOut>
                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/auth/login"
                      className="bg-transparent border border-blue-600 text-blue-600 font-bold py-2 px-4 rounded hover:bg-blue-600 hover:text-white text-center"
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/auth/register"
                      className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 text-center"
                    >
                      Registrar
                    </Link>
                  </div>
                </SignedOut>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Versión desktop/tablet (sin cambios) */}
      <nav className="hidden md:flex container mx-auto flex-wrap items-center justify-between py-7 px-4">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo/devleap.svg"
              alt="DevLeap Logo"
              className="h-8 w-auto"
              width={100}
              height={20}
            />
          </Link>
        </div>

        {/* Menú de navegación */}
        <ul className="flex flex-wrap items-center space-x-10 mt-6 md:mt-0">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/programas">Programas</Link>
          </li>
          <li>
            <Link href="/empresas">DevLeap para empresas</Link>
          </li>
          <li>
            <Link href="/faqs">FAQS</Link>
          </li>
        </ul>

        {/* Zona derecha: Botones condicionales */}
        <div className="flex flex-wrap items-center space-x-4 mt-4 md:mt-0">
          <SignedIn>
            {/* Si está autenticado, mostramos Dashboard y el UserButton de Clerk */}
            <Link
              href="/dashboard"
              className="text-black font-semibold px-4 py-2 rounded transition-colors hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9", // Ajusta el tamaño del avatar
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            {/* Si NO está autenticado, mostramos Entrar y Registrar */}
            <Link
              href="/auth/login"
              className="bg-transparent border border-blue-600 text-blue-600 font-bold py-2 px-4 rounded hover:bg-blue-600 hover:text-white"
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Registrar
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
