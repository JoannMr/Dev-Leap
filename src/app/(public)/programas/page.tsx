"use client";

import Hero from "@components/programas/Hero";
import ProgramGrid from "@components/programas/ProgramGrid";
import Benefits from "@components/programas/Benefits";
import ProjectsGallery from "@components/programas/ProjectsGallery";
import Testimonials from "@components/programas/Testimonials";
import FinalCTA from "@components/programas/FinalCTA";
import { motion } from "framer-motion";

export default function ProgramasPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden"
    >
      <Hero />
      <ProgramGrid />
      <Benefits />
      <ProjectsGallery />
      <Testimonials />
      <FinalCTA />
    </motion.main>
  );
}
