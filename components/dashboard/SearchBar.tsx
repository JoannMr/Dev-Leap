"use client";
import React, { useState } from "react";

export default function SearchBar() {
  // Estado para almacenar el texto que ingresa el usuario
  const [query, setQuery] = useState("");
  // Estado para controlar el foco del input
  const [isFocused, setIsFocused] = useState(false);

  // Función que se ejecuta al hacer clic en la lupa
  function handleSearch() {
    // Aquí podrías llamar a tu API, filtrar cursos, etc.
    console.log("Buscando:", query);
  }

  // Función para manejar la tecla Enter
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className={`relative w-full max-w-xs md:max-w-sm transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
      {/* Icono de búsqueda a la izquierda */}

      {/* Input con diseño minimalista */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Busca un curso"
        className="
          w-full
          pl-7 pr-12
          py-2
          rounded-lg
          border border-gray-200
          bg-white
          text-sm
          transition-all
          focus:shadow-sm focus:border-gray-300
          outline-none
          placeholder:text-gray-400
        "
      />

      {/* Botón con ícono minimalista */}
      <button
        onClick={handleSearch}
        className="
          absolute top-1/2 right-2
          transform -translate-y-1/2
          w-8 h-8
          flex items-center justify-center
          text-gray-500
          hover:text-blue-600
          transition-colors
          focus:outline-none
          rounded-full
          hover:bg-gray-100
        "
        aria-label="Buscar"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}
