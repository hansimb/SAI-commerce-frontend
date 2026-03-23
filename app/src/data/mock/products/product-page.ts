import type { ProductPageData } from "@/types/products";

export const productPageDataBySlug: Record<string, ProductPageData> = {
  "signature-tube-amplifier": {
    slug: "signature-tube-amplifier",
    largeImageTitle: "Built to feel like the center of the room",
    keySpecsTitle: "Key specs",
    keySpecs: [
      { label: "Power Output", value: "50W Class-A" },
      { label: "Tubes", value: "4x EL34, 4x 12AX7" },
      { label: "Frequency Response", value: "10Hz - 45kHz" },
      { label: "Inputs", value: "2 line-level" },
    ],
    highlightsTitle: "Highlights",
    highlights: [
      "Hand-wired signal path with matched tube sets",
      "Premium chassis and transformer assembly",
      "Designed for long-term serviceability and upgrades",
    ],
    horizontalSpecsTitle: "Performance",
    horizontalSpecs: [
      { label: "Power stage", value: "Class-A" },
      { label: "Matched set", value: "Hand-selected valves" },
      { label: "Chassis", value: "Premium metalwork" },
    ],
    verticalSpecsTitle: "Craft",
    verticalSpecs: [
      { label: "Assembly", value: "Hand-wired signal path" },
      { label: "Transformers", value: "Oversized custom units" },
      { label: "Serviceability", value: "Built for long-term ownership" },
      { label: "Materials", value: "Statement-grade chassis finish" },
    ],
  },
  "reference-monitor-controller": {
    slug: "reference-monitor-controller",
    largeImageTitle: "A calm front-end for critical decisions",
    keySpecsTitle: "Key specs",
    keySpecs: [
      { label: "Inputs", value: "3 stereo" },
      { label: "Outputs", value: "3 speaker pairs" },
      { label: "Cue Outputs", value: "2 headphone sends" },
      { label: "Attenuation", value: "Relay stepped" },
    ],
    highlightsTitle: "Highlights",
    highlights: [
      "Transparent analog path for mastering and mix review",
      "Dedicated speaker switching and mono functions",
      "Compact footprint for desktop and rack-adjacent use",
    ],
    horizontalSpecsTitle: "Signal path",
    horizontalSpecs: [
      { label: "Switching", value: "Relay controlled" },
      { label: "Review tools", value: "Mono and speaker select" },
      { label: "Footprint", value: "Desktop friendly" },
    ],
    verticalSpecsTitle: "Control",
    verticalSpecs: [
      { label: "Volume", value: "Stepped attenuation" },
      { label: "Outputs", value: "Three speaker pairs" },
      { label: "Headphone cue", value: "Two dedicated sends" },
      { label: "Use case", value: "Mixing and mastering review" },
    ],
  },
};
