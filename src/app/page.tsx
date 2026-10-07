import { About } from "@/components/sections/About";
import { Evenings } from "@/components/sections/Evenings";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Philosophy } from "@/components/sections/Philosophy";
import { Pricing } from "@/components/sections/Pricing";
import { Schedule } from "@/components/sections/Schedule";
import { Sessions } from "@/components/sections/Sessions";
import { Visit } from "@/components/sections/Visit";
import { SITE_URL, studio } from "@/content/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: studio.name,
  description: studio.description,
  url: SITE_URL,
  email: studio.email,
  sameAs: [studio.instagramUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: studio.city,
    addressCountry: "IL",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Sessions />
      <Evenings />
      <Schedule />
      <Pricing />
      <Philosophy />
      <Visit />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
