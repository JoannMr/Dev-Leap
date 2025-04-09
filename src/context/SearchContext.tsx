"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '@/types/course';

// Definir la interfaz del contexto
interface SearchContextType {
  searchQuery: string;
  searchResults: Course[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

// Crear el contexto con valores por defecto
const SearchContext = createContext<SearchContextType>({
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  setSearchQuery: () => {},
  clearSearch: () => {},
});

// Hook personalizado para usar el contexto
export const useSearch = () => useContext(SearchContext);

// Proveedor del contexto
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  // Cargar todos los cursos una vez al iniciar
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setAllCourses(data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  // Efecto para buscar cursos cuando cambia la consulta
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Función para buscar localmente
    const searchLocally = () => {
      const query = searchQuery.toLowerCase();
      const results = allCourses.filter(course => 
        course.titulo_Curso.toLowerCase().includes(query) ||
        (course.descripcion_curso?.text?.toLowerCase().includes(query) || false)
      );
      
      setSearchResults(results);
      setIsSearching(false);
    };

    // Simular un pequeño retraso para no hacer búsquedas en cada pulsación
    const timeoutId = setTimeout(searchLocally, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, allCourses]);

  // Función para limpiar la búsqueda
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  // Valor del contexto
  const value = {
    searchQuery,
    searchResults,
    isSearching,
    setSearchQuery,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}