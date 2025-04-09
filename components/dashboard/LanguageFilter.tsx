"use client";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Language = {
  id: string;
  name: string;
  slug_language: string;
  icono?: {
    url: string;
  };
};

type LanguageFilterProps = {
  languages: Language[];
  activeLanguage?: string | null;
};

export default function LanguageFilter({ languages, activeLanguage }: LanguageFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href={pathname}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !activeLanguage
            ? "bg-blue-100 text-blue-700 shadow-sm"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Todos
      </Link>
      
      {languages.map((language) => (
        <Link
          key={language.id}
          href={`${pathname}?${createQueryString("language", language.slug_language)}`}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
            ${
              activeLanguage === language.slug_language
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          {language.icono && (
            <Image
              src={language.icono.url}
              alt={language.name}
              width={16}
              height={16}
              className="w-4 h-4"
            />
          )}
          {language.name}
        </Link>
      ))}
    </div>
  );
} 