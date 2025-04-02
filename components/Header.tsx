// components/Header.tsx

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="w-full shadow font-semibold">
      <nav className="container mx-auto flex flex-wrap items-center justify-between py-7 px-4">
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
