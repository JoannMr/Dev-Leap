// components/dashboard/DashboardHeader.tsx

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import SearchBar from "@components/dashboard/SearchBar";

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow px-8 py-4 border-b border-gray-200">
      <div className="container mx-auto">
        {/* 
          Layout para móviles (visible en md:hidden)
          - Fila 1: Logo a la izquierda, Perfil a la derecha
          - Fila 2: Barra de búsqueda 
        */}
        <div className="md:hidden">
          {/* Fila 1: Logo + Perfil */}
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

            {/* Perfil */}
            <div className="flex items-center space-x-4">
              {/* Icono de Mis Cursos */}
              <Link href="/dashboard/mis-cursos" className="text-gray-700 hover:text-blue-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </Link>
              
              {/* Icono de Promociones */}
              <Link href="/dashboard/promociones" className="text-gray-700 hover:text-blue-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
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
          - Todo en una sola línea: Logo | SearchBar | Perfil 
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

          {/* Derecha: Perfil */}
          <div className="flex items-center space-x-4">
            {/* Icono de Mis Cursos */}
            <Link href="/dashboard/mis-cursos" className="text-gray-700 hover:text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </Link>
            
            {/* Icono de Promociones */}
            <Link href="/dashboard/promociones" className="text-gray-700 hover:text-blue-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
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
