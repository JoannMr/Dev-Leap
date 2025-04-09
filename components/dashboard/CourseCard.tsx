"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Language {
  id: string;
  name: string;
  slugLanguage: string;
  icono?: {
    url: string;
  };
}

interface CourseCardProps {
  id: string;
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  lessonsCount: number;
  languages?: Language[];
}

export default function CourseCard({ 
  id, 
  title, 
  slug, 
  description, 
  imageUrl, 
  lessonsCount,
  languages
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Cargar el estado de favorito al montar el componente
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(storedFavorites.includes(id));
  }, [id]);
  
  // Función para alternar el estado de favorito
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Evitar que el clic se propague al enlace
    e.stopPropagation();
    
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      // Si ya es favorito, lo quitamos
      newFavorites = storedFavorites.filter((favId: string) => favId !== id);
    } else {
      // Si no es favorito, lo añadimos
      newFavorites = [...storedFavorites, id];
    }
    
    // Guardar en localStorage
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };
  
  // Generar un color de fondo aleatorio suave si no hay imagen
  const backgroundColors = [
    'bg-blue-50', 'bg-indigo-50', 'bg-purple-50', 
    'bg-pink-50', 'bg-green-50', 'bg-teal-50'
  ];
  const randomBgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  
  return (
    <div 
      className={`
        relative group overflow-hidden
        bg-white rounded-lg border border-gray-100
        transition-all duration-300 flex flex-col
        ${isHovered ? 'shadow-md translate-y-[-4px]' : 'shadow-sm'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Botón de favorito */}
      <button 
        onClick={toggleFavorite}
        className={`
          absolute top-3 right-3 z-10 p-1.5 rounded-full
          backdrop-blur-sm transition-all duration-300
          ${isFavorite 
            ? 'bg-red-500/90 text-white' 
            : 'bg-white/70 text-gray-500 hover:bg-white/90'
          }
        `}
        aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        <svg 
          className="w-4 h-4" 
          fill={isFavorite ? "currentColor" : "none"} 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
          />
        </svg>
      </button>
      
      {/* Top Banner con imagen o gradiente */}
      <div className={`relative h-40 w-full overflow-hidden ${!imageUrl ? randomBgColor : ''}`}>
        {imageUrl ? (
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`
                object-cover w-full transition-all duration-500
                ${isHovered ? 'scale-105' : ''}
              `}
            />
            <div className={`
              absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent
              transition-opacity duration-300
              ${isHovered ? 'opacity-30' : 'opacity-50'}
            `}/>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-4xl text-gray-300">
              <svg className="w-10 h-10 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Lenguajes */}
        {languages && languages.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {languages.map(language => (
              <div 
                key={language.id}
                className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-xs font-medium text-gray-600"
              >
                {language.icono && (
                  <Image
                    src={language.icono.url}
                    alt={language.name}
                    width={12}
                    height={12}
                    className="w-3 h-3"
                  />
                )}
                {language.name}
              </div>
            ))}
          </div>
        )}
        
        {/* Título */}
        <Link href={`/dashboard/courses/${slug}`} className="group">
          <h2 className="text-lg font-medium text-gray-800 transition-colors line-clamp-2 mb-2 group-hover:text-blue-600">
            {title}
          </h2>
        </Link>
        
        {/* Descripción */}
        {description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
            {description}
          </p>
        )}
        
        {/* Footer con info y botones */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
            <span>{lessonsCount} {lessonsCount === 1 ? 'capítulo' : 'capítulos'}</span>
          </div>
          
          <Link 
            href={`/dashboard/courses/${slug}`} 
            className={`
              inline-flex items-center text-xs font-medium px-3 py-1 rounded-md
              transition-all duration-300 hover:bg-blue-50
              ${isHovered ? 'text-blue-600' : 'text-blue-500'}
            `}
          >
            Ver curso
            <svg className={`
              w-3.5 h-3.5 ml-1 transition-all duration-300
              ${isHovered ? 'transform translate-x-0.5' : ''}
            `} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 