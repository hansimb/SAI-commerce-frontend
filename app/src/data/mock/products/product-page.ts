import type { ProductDetailContentData } from "@/types/products";

export const productPageDataBySlug: Record<string, ProductDetailContentData> = {
  "signature-tube-amplifier": {
    slug: "signature-tube-amplifier",
    largeImageTitle: "Built to feel like the center of the room",
    keySpecs: {
      title: "Key specs",
      specs: [
        { label: "Power Output", value: "50W Class-A" },
        { label: "Tubes", value: "4x EL34, 4x 12AX7" },
        { label: "Frequency Response", value: "10Hz - 45kHz" },
        { label: "Inputs", value: "2 line-level" },
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
    horizontalSpecs: {
      title: "Performance",
      specs: [
        { label: "Power stage", value: "Class-A" },
        { label: "Matched set", value: "Hand-selected valves" },
        { label: "Chassis", value: "Premium metalwork" },
      ],
    },
    verticalSpecs: {
      title: "Craft",
      specs: [
        { label: "Assembly", value: "Hand-wired signal path" },
        { label: "Transformers", value: "Oversized custom units" },
        { label: "Serviceability", value: "Built for long-term ownership" },
        { label: "Materials", value: "Statement-grade chassis finish" },
      ],
    },
  },
  "reference-monitor-controller": {
    slug: "reference-monitor-controller",
    largeImageTitle: "A calm front-end for critical decisions",
    keySpecs: {
      title: "Key specs",
      specs: [
        { label: "Inputs", value: "3 stereo" },
        { label: "Outputs", value: "3 speaker pairs" },
        { label: "Cue Outputs", value: "2 headphone sends" },
        { label: "Attenuation", value: "Relay stepped" },
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
    horizontalSpecs: {
      title: "Signal path",
      specs: [
        { label: "Switching", value: "Relay controlled" },
        { label: "Review tools", value: "Mono and speaker select" },
        { label: "Footprint", value: "Desktop friendly" },
      ],
    },
    verticalSpecs: {
      title: "Control",
      specs: [
        { label: "Volume", value: "Stepped attenuation" },
        { label: "Outputs", value: "Three speaker pairs" },
        { label: "Headphone cue", value: "Two dedicated sends" },
        { label: "Use case", value: "Mixing and mastering review" },
      ],
    },
  },
};
