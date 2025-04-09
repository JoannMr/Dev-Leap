"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";

interface Course {
  id: string;
  titulo_Curso: string;
  slug_curso: string;
  descripcion_curso?: {
    text?: string;
    html?: string;
  };
  imagenDestacada?: {
    url: string;
  };
  lessons: Array<any>;
  languages?: Array<any>;
}

export default function SearchBar() {
  // Usar el contexto de búsqueda
  const { searchQuery, searchResults, isSearching, setSearchQuery, clearSearch } = useSearch();
  
  // Estados locales
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para manejar la búsqueda
  function handleSearch() {
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  }

  // Función para manejar la tecla Enter
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div 
      ref={searchRef}
      className={`relative w-full max-w-xs md:max-w-sm transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}
    >
      {/* Input con diseño minimalista */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          if (searchQuery.trim()) {
            setShowResults(true);
          }
        }}
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

      {/* Resultados de búsqueda */}
      {showResults && searchQuery.trim() !== '' && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full mr-2"></div>
              Buscando...
            </div>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((course: Course) => (
                <li key={course.id} className="border-b border-gray-100 last:border-0">
                  <Link 
                    href={`/dashboard/courses/${course.slug_curso}`}
                    className="block p-3 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setShowResults(false);
                      clearSearch();
                    }}
                  >
                    <div className="flex items-start">
                      {course.imagenDestacada && (
                        <div className="w-12 h-12 mr-3 flex-shrink-0">
                          <img 
                            src={course.imagenDestacada.url} 
                            alt={course.titulo_Curso}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{course.titulo_Curso}</h4>
                        {course.descripcion_curso?.text && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {course.descripcion_curso.text.substring(0, 100)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No se encontraron cursos que coincidan con tu búsqueda
            </div>
          )}
        </div>
      )}
    </div>
  );
}
