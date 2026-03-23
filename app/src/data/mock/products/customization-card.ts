import type { ProductCustomizationData } from "@/types/products";

export const productCustomizationCardDataBySlug: Record<
  string,
  ProductCustomizationData
> = {
  "signature-tube-amplifier": {
    slug: "signature-tube-amplifier",
    title: "Customization",
    image: {
      src: "/window.svg",
      alt: "Customization card of the Signature Tube Amplifier",
    },
    optionGroups: [
      {
        title: "Finish",
        options: [
          { label: "Brushed aluminum", active: true },
          { label: "Black anodized" },
          { label: "Walnut side panels" },
        ],
      },
      {
        title: "Tube voicing",
        options: [
          { label: "Studio neutral" },
          { label: "Vintage warmth", active: true },
          { label: "High-headroom detail" },
        ],
      },
    ],
  },
  "reference-monitor-controller": {
    slug: "reference-monitor-controller",
    title: "Customization",
    image: {
      src: "/globe.svg",
      alt: "Customization card of the Reference Monitor Controller",
    },
    optionGroups: [
      {
        title: "Metering",
        options: [
          { label: "No meter" },
          { label: "Single LED meter", active: true },
          { label: "Dual LED meter" },
        ],
      },
      {
        title: "Desktop setup",
        options: [
          { label: "Angled desktop case", active: true },
          { label: "Rack ears" },
          { label: "Extra cue output" },
        ],
      },
    ],
  },
};
