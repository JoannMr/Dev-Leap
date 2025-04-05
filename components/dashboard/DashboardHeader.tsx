// components/dashboard/DashboardHeader.tsx
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@components/dashboard/SearchBar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardHeader() {
  return (
    <header className="bg-gray-50 shadow px-6 py-3 flex items-center">
      {/* Sección Izquierda: Logo */}
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

      {/* Sección Central: Barra de Búsqueda más pequeña y centrada */}
      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>

      {/* Sección Derecha: Favoritos y Perfil */}
      <div className="flex items-center space-x-4 ml-4">
        <Link href="/dashboard/favoritos">
          <svg
            className="w-6 h-6 text-gray-700 hover:text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {/* Icono de corazón para favoritos */}
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
              userButtonAvatarBox: "w-10 h-10",
            },
          }}
        />
      </div>
    </header>
  );
}
