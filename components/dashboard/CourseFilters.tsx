"use client";
import React, { useState } from "react";
import LanguageFilter from "./LanguageFilter";

type Language = {
  id: string;
  name: string;
  slug_language: string;
  icono?: {
    url: string;
  };
};

type CourseFiltersProps = {
  languages: Language[];
  activeLanguage?: string | null;
};

export default function CourseFilters({ languages, activeLanguage }: CourseFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold">Mis Cursos</h1>
        
        {/* Botón para mostrar/ocultar filtros en móvil */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden px-4 py-2 text-sm bg-gray-100 rounded-lg flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          Filtros
        </button>
      </div>
      
      {/* Filtros */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
        <LanguageFilter languages={languages} activeLanguage={activeLanguage} />
      </div>
    </div>
  );
} 