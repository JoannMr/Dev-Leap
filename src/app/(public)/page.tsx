// app/page.tsx

import PopularCoursesSection from "@components/home/PopularCoursesSection";
import HeroMotion from "@components/home/HeroMotion";
import { CompaniesMotion } from "@components/home/CompaniesMotion";
import { CommunityMotion } from "@components/home/CommunityMotion";
import TeamMotion from "@components/home/TeamMotion";

export default function Home() {
  return (
    <main>
      {/* Sección Hero */}
      <HeroMotion />
      <CompaniesMotion />
      <CommunityMotion />
      <PopularCoursesSection />
      <TeamMotion />
      {/* Aquí podrías añadir más secciones de tu homepage */}
    </main>
  );
}
