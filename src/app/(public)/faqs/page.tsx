import React from "react";

import FaqsHero from "@components/faqs/FaqsHero";
import CategoriesSection from "@components/faqs/CategoriesSection";
import AccordionFaqs from "@components/faqs/AccordionFaqs";

export default function FaqsPage() {
  return (
    <main className="overflow-hidden">
      <FaqsHero />
      
      <CategoriesSection />
      
      <AccordionFaqs />
    </main>
  );
}
