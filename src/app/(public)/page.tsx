// app/page.tsx

import Hero from "@components/home/Hero";
import CompaniesSection from "@components/home/CompaniesSection";
import CommunitySection from "@components/home/CommunitySection";
import PopularCoursesSection from "@components/home/PopularCoursesSection";
import TeamSection from "@components/home/TeamSection";

export default function Home() {
  return (
    <main>
      {/* Sección Hero */}
      <Hero />
      <CompaniesSection />
      <CommunitySection />
      <PopularCoursesSection />
      <TeamSection />
      {/* Aquí podrías añadir más secciones de tu homepage */}
    </main>
  );
}
