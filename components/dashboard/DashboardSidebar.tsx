// components/dashboard/DashboardSidebar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar el sidebar cuando se hace clic fuera de él en dispositivos móviles
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cerrar sidebar al cambiar de ruta en móvil
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Overlay para cerrar el sidebar en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Barra de navegación rápida para móvil */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:hidden z-40 px-2 py-3">
        <div className="flex justify-around items-center">
          <MobileNavItem 
            href="/"
            isActive={pathname === "/" || pathname === "/"} 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            }
            label="Inicio"
          />
          
          <MobileNavItem 
            href="/dashboard/courses"
            isActive={pathname.includes("/dashboard/courses") && !pathname.includes("/coursos")} 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            }
            label="Cursos"
          />
          
          <MobileNavItem 
            href="/dashboard/mis-cursos"
            isActive={pathname.includes("/dashboard/mis-cursos")} 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            }
            label="Mis Cursos"
          />
          
          <MobileNavItem 
            href="/dashboard/promociones"
            isActive={pathname.includes("/dashboard/promociones")} 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            }
            label="Promociones"
          />
          
          {/* Botón para menú completo */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center justify-center"
            aria-label="Menú completo"
          >
            <span className={`p-1 rounded-full ${isOpen ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-xs mt-1 font-medium text-gray-500">Más</span>
          </button>
        </div>
      </div>

      {/* Sidebar: visible siempre en desktop (md:block) y en móvil según estado */}
      <aside 
        className={`
          fixed md:sticky top-0 z-40
          h-screen w-72 md:w-64
          bg-white border-r border-gray-100
          py-6 px-3
          transition-all duration-300 ease-in-out
          ${isOpen ? "left-0" : "-left-80 md:left-0"}
          shadow-lg md:shadow-none
        `}
      >
        <div className="flex flex-col h-full">
          {/* Navegación */}
          <nav className="flex-1 space-y-1 px-2">
            <SidebarLink 
              href="/" 
              isActive={pathname === "/" || pathname === "/"}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              }
            >
              Inicio
            </SidebarLink>
            
            <SidebarLink 
              href="/dashboard/courses" 
              isActive={pathname.includes("/dashboard/courses") && !pathname.includes("/coursos")}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              }
            >
              Cursos
            </SidebarLink>
            
            <SidebarLink 
              href="/dashboard/mis-cursos" 
              isActive={pathname.includes("/dashboard/mis-cursos")}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              }
            >
              Mis Cursos
            </SidebarLink>
            
            <SidebarLink 
              href="/dashboard/promociones" 
              isActive={pathname.includes("/dashboard/promociones")}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              }
            >
              Promociones
            </SidebarLink>
          </nav>

          {/* Footer del sidebar */}
          <div className="mt-auto pt-4 px-4 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              <Link href="/faqs" className="hover:text-blue-500 transition-colors">
                Ayuda
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// Componente para los enlaces del sidebar
function SidebarLink({ 
  href, 
  isActive, 
  icon, 
  children 
}: { 
  href: string, 
  isActive: boolean, 
  icon: React.ReactNode, 
  children: React.ReactNode 
}) {
  return (
    <Link 
      href={href}
      className={`
        flex items-center space-x-3 px-4 py-3 rounded-lg
        transition-all duration-200 ease-in-out
        ${isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
        }
      `}
    >
      <span className={`${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
        {icon}
      </span>
      <span className="font-medium">{children}</span>
      
      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
      )}
    </Link>
  );
}

// Componente para los elementos de navegación móvil
function MobileNavItem({
  href,
  isActive,
  icon,
  label
}: {
  href: string,
  isActive: boolean,
  icon: React.ReactNode,
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center"
    >
      <span className={`p-1 rounded-full ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}>
        {icon}
      </span>
      <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
        {label}
      </span>
    </Link>
  );
}
