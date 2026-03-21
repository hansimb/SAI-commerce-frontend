import type { ContentBoxItem } from "@/components/page-components/content-boxes";
import type { ProcessStepItem } from "@/components/page-components/process-steps";
import type { ProductCardData } from "@/components/page-components/product-card";
import type { QuoteBlockData } from "@/components/page-components/quote-block";

export const textContentBlockMockData = {
  thoughtTitle: "Our Philosophy",
  mainTitle: "Timeless Design,\nUncompromising Quality",
  text1:
    "At Resonance, we believe that audio equipment should be more than just functional-it should be an object of desire, a piece of art, and a lifelong companion in your musical journey.",
  text2:
    "Every component is meticulously crafted in our Portland workshop, combining time-honored techniques with modern innovation. We use vintage-inspired aesthetics with contemporary technology to create pieces that stand the test of time.",
};

export const contentBoxesMockData: ContentBoxItem[] = [
  {
    icon: "tool",
    title: "Master Craftsmanship",
    description:
      "Every component is assembled by hand in our Portland workshop. We do not chase volume-we pursue perfection.",
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
      "When you buy from Resonance, you are not just a customer-you are part of our community of audio enthusiasts.",
  },
  {
    icon: "heart",
    title: "Built to Last",
    description:
      "We design for generations, not quarters. Our lifetime warranty on transformers is not marketing-it is our promise.",
  },
];

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

export const quoteBlockMockData: QuoteBlockData = {
  quote:
    "We do not make audio equipment. We craft instruments for experiencing music the way it was meant to be heard.",
  author: "Marcus Chen",
  subtitle: "Founder & Master Craftsman",
};

export interface ProductListItem extends ProductCardData {
  slug: string;
}

export interface ProductDetailPageData {
  slug: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  intro: string;
  description: string[];
  imageUrl: string;
  gallery: { src: string; alt: string }[];
  price: string;
  priceSubtitle: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  addToCartLabel: string;
  customizeLabel: string;
}

export interface ProductCustomizationPageData {
  slug: string;
  title: string;
  intro: string;
  optionGroups: {
    title: string;
    description: string;
    options: string[];
  }[];
  note: string;
  ctaLabel: string;
}

export interface ArticleListItem {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author?: string;
  publishedAt?: string;
}

export interface ContactPageData {
  eyebrow: string;
  title: string;
  intro: string;
  contactMethods: {
    label: string;
    value: string;
    detail?: string;
  }[];
  studioTitle: string;
  studioText: string;
  inquiryTitle: string;
  inquiryText: string;
  ctaLabel: string;
}

export const productsListMockData: ProductListItem[] = [
  {
    slug: "signature-tube-amplifier",
    categoryLabel: "Amplifiers",
    title: "Signature Tube Amplifier",
    subtitle: "Pure analog warmth meets modern precision",
    description:
      "Handcrafted vacuum tube amplifier delivering 50W of pristine Class-A power with a studio-ready feature set.",
    imageUrl: "/window.svg",
    price: "$4,500",
    priceSubtitle: "USD",
    specs: [
      { label: "Power Output", value: "50W Class-A" },
      { label: "Tubes", value: "4x EL34, 4x 12AX7" },
      { label: "Response", value: "10Hz - 45kHz" },
    ],
    ctaText: "View Details",
  },
  {
    slug: "reference-monitor-controller",
    categoryLabel: "Controllers",
    title: "Reference Monitor Controller",
    subtitle: "Analog control for critical listening",
    description:
      "A mastering-grade monitor controller with relay switching, stepped attenuation, and multiple speaker outputs.",
    imageUrl: "/globe.svg",
    price: "$2,200",
    priceSubtitle: "USD",
    specs: [
      { label: "Inputs", value: "3 stereo" },
      { label: "Outputs", value: "3 speaker pairs" },
      { label: "Attenuation", value: "Relay stepped" },
    ],
    ctaText: "View Details",
  },
];

export const productCardMockData: ProductCardData = productsListMockData[0];

export const productDetailMockDataBySlug: Record<string, ProductDetailPageData> = {
  "signature-tube-amplifier": {
    slug: "signature-tube-amplifier",
    categoryLabel: "Amplifiers",
    title: "Signature Tube Amplifier",
    subtitle: "Pure analog warmth meets modern precision",
    intro:
      "Designed for engineers and listeners who want a flagship analog centerpiece with tactile control and unmistakable tube character.",
    description: [
      "The Signature Tube Amplifier combines hand-matched valves, oversized transformers, and a carefully tuned signal path for a rich but controlled presentation.",
      "It is built as a statement product: premium materials, serviceable construction, and a sound profile intended to feel equally at home in a listening room or a reference-grade studio chain.",
    ],
    imageUrl: "/window.svg",
    gallery: [
      { src: "/window.svg", alt: "Front panel view" },
      { src: "/globe.svg", alt: "Rear panel view" },
      { src: "/file.svg", alt: "Internal component detail" },
    ],
    price: "$4,500",
    priceSubtitle: "Base configuration",
    specs: [
      { label: "Power Output", value: "50W Class-A" },
      { label: "Tubes", value: "4x EL34, 4x 12AX7" },
      { label: "Frequency Response", value: "10Hz - 45kHz" },
      { label: "Inputs", value: "2 line-level" },
    ],
    highlights: [
      "Hand-wired signal path with matched tube sets",
      "Premium chassis and transformer assembly",
      "Designed for long-term serviceability and upgrades",
    ],
    addToCartLabel: "Add to cart",
    customizeLabel: "Customize",
  },
  "reference-monitor-controller": {
    slug: "reference-monitor-controller",
    categoryLabel: "Controllers",
    title: "Reference Monitor Controller",
    subtitle: "Analog control for critical listening",
    intro:
      "A clean, tactile monitoring hub designed to keep decision-making fast while preserving signal integrity.",
    description: [
      "The Reference Monitor Controller focuses on reliable level control, speaker switching, and daily workflow clarity.",
      "It is intended as a compact studio centerpiece for engineers who want the confidence of analog monitoring without unnecessary complexity.",
    ],
    imageUrl: "/globe.svg",
    gallery: [
      { src: "/globe.svg", alt: "Front panel controller" },
      { src: "/window.svg", alt: "Desktop setup" },
      { src: "/file.svg", alt: "Rear connections" },
    ],
    price: "$2,200",
    priceSubtitle: "Base configuration",
    specs: [
      { label: "Inputs", value: "3 stereo" },
      { label: "Outputs", value: "3 speaker pairs" },
      { label: "Cue Outputs", value: "2 headphone sends" },
      { label: "Attenuation", value: "Relay stepped" },
    ],
    highlights: [
      "Transparent analog path for mastering and mix review",
      "Dedicated speaker switching and mono functions",
      "Compact footprint for desktop and rack-adjacent use",
    ],
    addToCartLabel: "Add to cart",
    customizeLabel: "Customize",
  },
};

export const productCustomizationMockDataBySlug: Record<
  string,
  ProductCustomizationPageData
> = {
  "signature-tube-amplifier": {
    slug: "signature-tube-amplifier",
    title: "Customize Signature Tube Amplifier",
    intro:
      "This is an early preview of how product customization could be presented before the full configurator is designed.",
    optionGroups: [
      {
        title: "Finish",
        description: "Choose the overall visual direction for the chassis.",
        options: ["Brushed aluminum", "Black anodized", "Walnut side panels"],
      },
      {
        title: "Tube voicing",
        description: "Example voicing options for different listening priorities.",
        options: ["Studio neutral", "Vintage warmth", "High-headroom detail"],
      },
    ],
    note:
      "Final pricing, compatibility rules, and lead times will be defined later with the real product data flow.",
    ctaLabel: "Discuss customization",
  },
  "reference-monitor-controller": {
    slug: "reference-monitor-controller",
    title: "Customize Reference Monitor Controller",
    intro:
      "This lightweight first pass shows the kind of options and guidance the final customization experience could contain.",
    optionGroups: [
      {
        title: "Metering",
        description: "Optional display and feedback choices.",
        options: ["No meter", "Single LED meter", "Dual LED meter"],
      },
      {
        title: "Desktop setup",
        description: "Example workflow-oriented hardware choices.",
        options: ["Angled desktop case", "Rack ears", "Extra cue output"],
      },
    ],
    note:
      "The final flow will later connect to product rules, pricing, and Shopify-backed product data.",
    ctaLabel: "Request a build consultation",
  },
};

export const articlesListMockData: ArticleListItem[] = [
  {
    slug: "how-we-voice-our-amplifiers",
    category: "Workshop Notes",
    title: "How We Voice Our Amplifiers",
    excerpt:
      "A short look at the listening tests, component choices, and tradeoffs that shape our final amplifier sound.",
    author: "Marcus Chen",
    publishedAt: "March 2026",
  },
  {
    slug: "why-monitor-control-still-matters",
    category: "Technical Writing",
    title: "Why Monitor Control Still Matters",
    excerpt:
      "Why precise level control and routing remain foundational even in highly digital studio workflows.",
    author: "Elena Brooks",
    publishedAt: "February 2026",
  },
  {
    slug: "serviceability-as-a-design-principle",
    category: "Design",
    title: "Serviceability As A Design Principle",
    excerpt:
      "We treat repairability and long-term ownership as part of the original product design, not as an afterthought.",
    author: "Marcus Chen",
    publishedAt: "January 2026",
  },
];

export const contactPageMockData: ContactPageData = {
  eyebrow: "Contact",
  title: "Talk to the workshop",
  intro:
    "This page is intentionally still an early first pass, but it already shows the structure we could later connect to a proper inquiry flow or Shopify-backed contact experience.",
  contactMethods: [
    {
      label: "Email",
      value: "studio@spectrum-audio.test",
      detail: "Best for project discussions and general inquiries",
    },
    {
      label: "Phone",
      value: "+358 40 123 4567",
      detail: "Available on weekdays during studio hours",
    },
    {
      label: "Location",
      value: "Turku, Finland",
      detail: "Visits and demos by appointment",
    },
  ],
  studioTitle: "Studio and consultation",
  studioText:
    "We can later expand this into a fuller section about showroom visits, demo listening, build lead times, and consultation availability.",
  inquiryTitle: "Inquiry outline",
  inquiryText:
    "A future version of this page could include a structured contact form, project type selection, and product interest routing.",
  ctaLabel: "Start a conversation",
};
