export const textContentBlockMockData = {
  thoughtTitle: "Our Philosophy",
  mainTitle: "Timeless Design,\nUncompromising Quality",
  text1:
    "At Resonance, we believe that audio equipment should be more than just functional—it should be an object of desire, a piece of art, and a lifelong companion in your musical journey.",
  text2:
    "Every component is meticulously crafted in our Portland workshop, combining time-honored techniques with modern innovation. We use vintage-inspired aesthetics with contemporary technology to create pieces that stand the test of time.",
};

import type { ContentBoxItem } from "@/components/page-components/content-boxes";

export const contentBoxesMockData: ContentBoxItem[] = [
  {
    icon: "tool",
    title: "Master Craftsmanship",
    description:
      "Every component is assembled by hand in our Portland workshop. We don’t chase volume—we pursue perfection.",
  },
  {
    icon: "award",
    title: "Uncompromising Quality",
    description:
      "From aerospace-grade aluminum to NOS vacuum tubes, we source only the finest materials available.",
  },
  {
    icon: "users",
    title: "Personal Service",
    description:
      "When you buy from Resonance, you’re not just a customer—you’re part of our community of audio enthusiasts.",
  },
  {
    icon: "heart",
    title: "Built to Last",
    description:
      "We design for generations, not quarters. Our lifetime warranty on transformers isn’t marketing—it’s our promise.",
  },
];

import type { ProcessStepItem } from "@/components/page-components/process-steps";

export const processStepsMockData: ProcessStepItem[] = [
  {
    number: "01",
    icon: "zap",
    title: "Design & Planning",
    description:
      "Each build begins with a detailed review of specifications and customization options. For custom builds, this includes a personal consultation.",
  },
  {
    number: "02",
    icon: "tool",
    title: "Precision Assembly",
    description:
      "Point-to-point wiring, hand-matched components, and meticulous soldering. No shortcuts, no compromises.",
  },
  {
    number: "03",
    icon: "shield",
    title: "Testing & Burn-In",
    description:
      "Every unit undergoes 72 hours of burn-in and comprehensive electrical testing before it leaves our workshop.",
  },
];

import type { QuoteBlockData } from "@/components/page-components/quote-block";

export const quoteBlockMockData: QuoteBlockData = {
  quote:
    "We don’t make audio equipment. We craft instruments for experiencing music the way it was meant to be heard.",
  author: "Marcus Chen",
  subtitle: "Founder & Master Craftsman",
};
