// components/dashboard/DashboardSidebar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de toggle para móvil */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 focus:outline-none"
        >
          {isOpen ? (
            // Icono para cerrar (X)
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Icono de hamburguesa para abrir
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar: visible siempre en desktop (md:block) y en móvil según estado */}
      <aside className={`${isOpen ? "block" : "hidden"} md:block w-64 bg-gray-100 p-4`}>
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="hover:text-blue-600">
            Inicio
          </Link>
          <Link href="/dashboard/courses" className="hover:text-blue-600">
            Cursos
          </Link>
          <Link href="/dashboard/coursos" className="hover:text-blue-600">
            Mis Cursos
          </Link>
          <Link href="/dashboard/favoritos" className="hover:text-blue-600">
            Mis Favoritos
          </Link>
        </nav>
      </aside>
    </>
  );
}
