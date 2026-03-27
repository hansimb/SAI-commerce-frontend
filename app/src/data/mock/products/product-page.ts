import type { ProductDetailContentData } from "@/types/products";

export const productPageDataBySlug: Record<string, ProductDetailContentData> = {
  "signature-tube-amplifier": {
    slug: "signature-tube-amplifier",
    heroImage: {
      src: "/window.svg",
      alt: "Signature Tube Amplifier hero image",
    },
    textContentBlock: {
      thoughtTitle: "Studio Reference",
      mainTitle: "Built to feel like the center of the room",
      text1:
        "This mock detail page now mirrors the new Shopify-first structure: hero image first, then editorial copy, then the deeper product sections.",
      text2:
        "The content is still placeholder material here, but the section order matches the production path we will use with the product_details_page metaobject.",
    },
    textContentBlock2: {
      thoughtTitle: "Built Details",
      mainTitle: "A second editorial block can continue the story",
      text1:
        "This placeholder mirrors the second text content block that now exists in the Shopify detail metaobject.",
      text2:
        "It gives the lower half of the page a second narrative pause before the final image and vertical spec section.",
    },
    largeImage: {
      src: "/window.svg",
      alt: "Signature Tube Amplifier detail image",
    },
    largeImage2: {
      src: "/window.svg",
      alt: "Signature Tube Amplifier secondary detail image",
    },
    keySpecs: {
      title: "Key specs",
      specs: [
        { label: "Power Output", value: "50W Class-A" },
        { label: "Tubes", value: "4x EL34, 4x 12AX7" },
        { label: "Frequency Response", value: "10Hz - 45kHz" },
      ],
    },
    highlights: {
      title: "Highlights",
      items: [
        "Hand-wired signal path with matched tube sets",
        "Premium chassis and transformer assembly",
        "Designed for long-term serviceability and upgrades",
      ],
    },
    imageSpecsSections: [
      {
        title: "Performance",
        layout: "horizontal",
        image: {
          src: "/window.svg",
          alt: "Signature Tube Amplifier performance image",
        },
        specs: [
          { label: "Power stage", value: "Class-A" },
          { label: "Matched set", value: "Hand-selected valves" },
          { label: "Chassis", value: "Premium metalwork" },
          { label: "Serviceability", value: "Built for long-term ownership" },
        ],
      },
      {
        title: "Craft",
        layout: "vertical",
        image: {
          src: "/window.svg",
          alt: "Signature Tube Amplifier craft image",
        },
        specs: [
          { label: "Assembly", value: "Hand-wired signal path" },
          { label: "Transformers", value: "Oversized custom units" },
          { label: "Materials", value: "Statement-grade chassis finish" },
          { label: "Ownership", value: "Serviceable for the long term" },
        ],
      },
    ],
  },
  "reference-monitor-controller": {
    slug: "reference-monitor-controller",
    heroImage: {
      src: "/globe.svg",
      alt: "Reference Monitor Controller hero image",
    },
    textContentBlock: {
      thoughtTitle: "Control Room Workflow",
      mainTitle: "A calm front-end for critical decisions",
      text1:
        "The new detail layout keeps editorial copy close to the visual story before moving into the more technical specification sections.",
      text2:
        "That gives the page a cleaner rhythm and keeps the most important sections easier to scan.",
    },
    textContentBlock2: {
      thoughtTitle: "Precision Workflow",
      mainTitle: "Clear routing supports faster decisions",
      text1:
        "A second text block is useful when the page needs another editorial beat before the final product section.",
      text2:
        "That same pattern is now supported in both mock and Shopify-driven detail pages.",
    },
    largeImage: {
      src: "/globe.svg",
      alt: "Reference Monitor Controller detail image",
    },
    largeImage2: {
      src: "/globe.svg",
      alt: "Reference Monitor Controller secondary detail image",
    },
    keySpecs: {
      title: "Key specs",
      specs: [
        { label: "Inputs", value: "3 stereo" },
        { label: "Outputs", value: "3 speaker pairs" },
        { label: "Cue Outputs", value: "2 headphone sends" },
      ],
    },
    highlights: {
      title: "Highlights",
      items: [
        "Transparent analog path for mastering and mix review",
        "Dedicated speaker switching and mono functions",
        "Compact footprint for desktop and rack-adjacent use",
      ],
    },
    imageSpecsSections: [
      {
        title: "Signal path",
        layout: "horizontal",
        image: {
          src: "/globe.svg",
          alt: "Reference Monitor Controller signal path image",
        },
        specs: [
          { label: "Switching", value: "Relay controlled" },
          { label: "Review tools", value: "Mono and speaker select" },
          { label: "Footprint", value: "Desktop friendly" },
          { label: "Use case", value: "Mixing and mastering review" },
        ],
      },
      {
        title: "Control",
        layout: "vertical",
        image: {
          src: "/globe.svg",
          alt: "Reference Monitor Controller control image",
        },
        specs: [
          { label: "Volume", value: "Stepped attenuation" },
          { label: "Outputs", value: "Three speaker pairs" },
          { label: "Headphone cue", value: "Two dedicated sends" },
          { label: "Focus", value: "Mixing and mastering review" },
        ],
      },
    ],
  },
};
