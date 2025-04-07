// components/dashboard/DashboardHeader.tsx

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import SearchBar from "@components/dashboard/SearchBar";

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow px-8 py-4">
      <div className="container mx-auto">
        {/* 
          Layout para móviles (visible en md:hidden)
          - Fila 1: Logo a la izquierda, Favoritos + Perfil a la derecha
          - Fila 2: Barra de búsqueda 
        */}
        <div className="md:hidden">
          {/* Fila 1: Logo + Favoritos + Perfil */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard">
              <Image
                src="/logo/devleap.svg"
                alt="DevLeap Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </Link>

            {/* Favoritos + Perfil */}
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/favoritos">
                <svg
                  className="w-6 h-6 text-gray-700 hover:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                           2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09 
                           C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 
                           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-7 h-7",
                  },
                }}
              />
            </div>
          </div>

          {/* Fila 2: Barra de búsqueda (debajo) */}
          <div className="mt-6 flex justify-center">
            <SearchBar />
          </div>
        </div>

        {/* 
          Layout para pantallas medianas y grandes (desktop/tablet)
          - Todo en una sola línea: Logo | SearchBar | Favoritos + Perfil 
        */}
        <div className="hidden md:flex items-center justify-between">
          {/* Izquierda: Logo */}
          <div className="flex items-center">
            <Link href="/dashboard">
              <Image
                src="/logo/devleap.svg"
                alt="DevLeap Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Centro: Barra de búsqueda */}
          <div className="flex-1 flex justify-center mx-4">
            <SearchBar />
          </div>

          {/* Derecha: Favoritos + Perfil */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/favoritos">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                         2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09 
                         C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 
                         c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
