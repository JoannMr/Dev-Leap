"use client";

import React from "react";

// Componentes necesarios para tener una estructura organizada
import EmpresasHero from "@components/empresas/EmpresasHero";
import SolucionesGrid from "@components/empresas/SolucionesGrid";
import ProcesoCTA from "@components/empresas/ProcesoCTA";
import TestimonialsCarousel from "@components/empresas/TestimonialsCarousel";
import FaqsSection from "@components/empresas/FaqsSection";
import ContactoEmpresas from "@components/empresas/ContactoEmpresas";

export default function DevLeapEmpresas() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <EmpresasHero />
      
      {/* Soluciones Grid */}
      <SolucionesGrid />
      
      {/* Proceso Section con CTA */}
      <ProcesoCTA />
      
      {/* Testimonios carousel */}
      <TestimonialsCarousel />
      
      {/* FAQs Section */}
      <FaqsSection />
      
      {/* Contacto Section */}
      <ContactoEmpresas />
    </main>
  );
}
