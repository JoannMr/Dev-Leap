"use client";
import React, { useState } from "react";

export default function SearchBar() {
  // Estado para almacenar el texto que ingresa el usuario
  const [query, setQuery] = useState("");

  // Función que se ejecuta al hacer clic en la lupa
  function handleSearch() {
    // Aquí podrías llamar a tu API, filtrar cursos, etc.
    console.log("Buscando:", query);
  }

  return (
    <div className="relative w-80">
      {/* Input redondeado con espacio para el botón de la derecha */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busca un curso"
        className="
          w-full
          pr-16            /* Espacio a la derecha para el botón */
          pl-4 py-2
          rounded-xl
          border border-gray-200
          focus:outline-none focus:ring-2 focus:ring-blue-500
          placeholder:text-gray-400
        "
      />

      {/* Botón con ícono de lupa */}
      <button
        onClick={handleSearch}
        className="
          absolute top-0 right-0
          h-full w-16
          flex items-center justify-center
          bg-blue-600 text-white
          rounded-r-xl
          hover:bg-blue-700
          focus:outline-none
        "
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M10 4a6 6 0 014.472 10.112l4.529 4.53a1 1 0 01-1.414 1.414l-4.53-4.529A6 6 0 1110 4z" />
        </svg>
      </button>
    </div>
  );
}
