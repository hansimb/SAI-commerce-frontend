import type {
  ProductCardData,
  ProductCustomizationPageData,
  ProductDetailPageData,
  ProductListItem,
  ProductsPageIntroData,
} from "@/types/products";

export const productsPageIntroMockData: ProductsPageIntroData = {
  thoughtTitle: "Products",
  mainTitle: "Built for engineers, listeners, and long-term ownership",
  text1:
    "This first pass keeps the products area intentionally simple. The page is driven by temporary mock content now, but the structure is aimed at a later Shopify-backed product flow.",
};

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
