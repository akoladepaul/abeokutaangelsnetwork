import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { Sectors } from "@/components/sections/sectors";
import { HowItWorks } from "@/components/sections/how-it-works";
import { DualCTA } from "@/components/sections/dual-cta";
import { Manifesto } from "@/components/sections/manifesto";
import { Newsletter } from "@/components/sections/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <WhatWeDo />
      <Sectors />
      <HowItWorks />
      <DualCTA />
      <Manifesto />
      <Newsletter />
    </>
  );
}
