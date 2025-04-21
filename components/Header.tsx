// components/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Arreglo de enlaces de navegación para reutilizar en desktop y mobile
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/programas", label: "Programas" },
    { href: "/empresas", label: "DevLeap para empresas" },
    { href: "/faqs", label: "FAQS" }
  ];

  // Animación para el menú mobile
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-lg ${
        scrolled ? "bg-white shadow-lg" : "bg-white shadow-sm"
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      {/* Fondo decorativo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-green-50/30 z-0"></div>
      
      {/* Versión móvil */}
      <div className="md:hidden relative z-10">
        <nav className="container mx-auto px-4 py-3">
          {/* Barra superior fija con logo y botón */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/">
                <Image
                  src="/logo/devleap.svg"
                  alt="DevLeap Logo"
                  className="h-8 w-auto"
                  width={100}
                  height={20}
                />
              </Link>
            </motion.div>
            
            {/* Botón hamburguesa animado */}
            <motion.button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/10 to-green-500/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Abrir menú"
            >
              <motion.span 
                className={`block w-5 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-1 transform transition-transform ${isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`}
              ></motion.span>
              <motion.span 
                className={`block w-5 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-1 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              ></motion.span>
              <motion.span 
                className={`block w-5 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-full transform transition-transform ${isMobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}
              ></motion.span>
            </motion.button>
          </div>
          
          {/* Menú desplegable con animación */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                className="py-4 mt-2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-100"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {/* Links de navegación */}
                <motion.ul className="flex flex-col space-y-1 border-b border-gray-100 pb-4 mb-4 px-2">
                  {navLinks.map((link) => (
                    <motion.li key={link.href} variants={menuItemVariants}>
                      <Link href={link.href}>
                        <motion.div 
                          className={`flex items-center p-3 rounded-lg ${
                            pathname === link.href 
                              ? 'bg-gradient-to-r from-blue-50 to-green-50 text-blue-600 font-semibold' 
                              : 'hover:bg-gray-50'
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          {pathname === link.href && (
                            <motion.div 
                              layoutId="activeMobileIndicator"
                              className="w-1 h-5 bg-gradient-to-b from-blue-500 to-green-500 rounded-full mr-2"
                            />
                          )}
                          {link.label}
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
                
                {/* Botones de acción */}
                <motion.div 
                  className="flex flex-col px-4 space-y-3"
                  variants={menuItemVariants}
                >
                  <SignedIn>
                    <div className="flex justify-between items-center">
                      <Link href="/dashboard">
                        <motion.button
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium px-4 py-2 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                          </svg>
                          Dashboard
                        </motion.button>
                      </Link>
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-9 h-9 border-2 border-green-200",
                          },
                        }}
                      />
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <div className="flex flex-col space-y-3">
                      <Link href="/auth/login">
                        <motion.button 
                          className="w-full flex justify-center items-center gap-2 bg-white border border-blue-500 text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Entrar
                        </motion.button>
                      </Link>
                      <Link href="/auth/register">
                        <motion.button 
                          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium py-2 px-4 rounded-lg"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                          </svg>
                          Registrar
                        </motion.button>
                      </Link>
                    </div>
                  </SignedOut>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Versión desktop/tablet */}
      <nav className="hidden md:flex container mx-auto items-center justify-between py-4 px-4 relative z-10">
        {/* Logo */}
        <motion.div 
          className="flex items-center flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/">
            <Image
              src="/logo/devleap.svg"
              alt="DevLeap Logo"
              className="h-10 w-auto"
              width={120}
              height={24}
            />
          </Link>
        </motion.div>

        {/* Menú de navegación */}
        <motion.ul 
          className="flex items-center space-x-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navLinks.map((link, index) => (
            <motion.li key={link.href} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * index }}>
              <Link href={link.href}>
                <motion.div 
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all ${
                    pathname === link.href 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  
                  {pathname === link.href && (
                    <motion.div 
                      layoutId="activeIndicator" 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Zona derecha: Botones condicionales */}
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SignedIn>
            {/* Si está autenticado, mostramos Dashboard y el UserButton de Clerk */}
            <Link href="/dashboard">
              <motion.button
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium px-5 py-2 rounded-lg shadow-md shadow-blue-500/20"
                whileHover={{ scale: 1.05, boxShadow: '0 15px 25px -5px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
                Dashboard
              </motion.button>
            </Link>
            <motion.div
              whileHover={{ scale: 1.1 }}
            >
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 border-2 border-blue-100 shadow-md",
                  },
                }}
              />
            </motion.div>
          </SignedIn>
          <SignedOut>
            {/* Si NO está autenticado, mostramos Entrar y Registrar */}
            <Link href="/auth/login">
              <motion.button 
                className="flex items-center gap-2 px-5 py-2 border border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Entrar
              </motion.button>
            </Link>
            <Link href="/auth/register">
              <motion.button 
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-lg shadow-md shadow-blue-500/20"
                whileHover={{ scale: 1.05, boxShadow: '0 15px 25px -5px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Registrar
              </motion.button>
            </Link>
          </SignedOut>
        </motion.div>
      </nav>
      
      {/* Borde inferior con gradiente */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    </motion.header>
  );
}
