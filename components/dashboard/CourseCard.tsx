"use client";

import { useState } from 'react';
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
        bg-white rounded-xl transition-all duration-300
        ${isHovered ? 'shadow-lg scale-[1.02]' : 'shadow'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Banner con imagen o gradiente */}
      <div className={`relative h-44 w-full overflow-hidden ${!imageUrl ? randomBgColor : ''}`}>
        {imageUrl ? (
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`
                object-cover w-full transition-all duration-500
                ${isHovered ? 'scale-110 filter brightness-90' : ''}
              `}
            />
            <div className={`
              absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-70
              transition-opacity duration-300
              ${isHovered ? 'opacity-80' : 'opacity-50'}
            `}/>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-4xl text-gray-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Contenido */}
      <div className="p-5">
        {/* Título */}
        <Link href={`/dashboard/courses/${slug}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
            {title}
          </h2>
        </Link>
        
        {/* Lenguajes */}
        {languages && languages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {languages.map(language => (
              <div 
                key={language.id}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600"
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
        
        {/* Descripción */}
        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>
        )}
        
        {/* Footer con info y botones */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
            <span>{lessonsCount} {lessonsCount === 1 ? 'capítulo' : 'capítulos'}</span>
          </div>
          
          <Link 
            href={`/dashboard/courses/${slug}`} 
            className={`
              inline-flex items-center text-sm font-medium 
              transition-all duration-300
              ${isHovered ? 'text-blue-600' : 'text-gray-700'}
            `}
          >
            Ver curso
            <svg className={`
              w-4 h-4 ml-1 transition-all duration-300
              ${isHovered ? 'transform translate-x-1' : ''}
            `} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 