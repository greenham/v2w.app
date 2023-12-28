export const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
export const unitToGramsMap = new Map<string, number>([
  ["ml", 1],
  ["dl", 100],
  ["l", 1000],
  ["t", 5],
  ["T", 15],
  ["floz", 29.6],
  ["c", 237],
  ["pt", 473],
  ["qt", 946],
  ["gal", 3785],
  ["lb", 453],
  ["oz", 28],
]);
export const gramsPerPound = unitToGramsMap.get("lb")!;
export const gramsPerOunce = unitToGramsMap.get("oz")!;
const usVolumeOptions = [
  { value: "t", label: "teaspoons" },
  { value: "T", label: "tablespoons" },
  { value: "floz", label: "fluid ounces" },
  { value: "c", label: "cups" },
  { value: "pt", label: "pints" },
  { value: "qt", label: "quarts" },
  { value: "gal", label: "gallons" },
];
const metricVolumeOptions = [
  { value: "ml", label: "milliliters" },
  { value: "dl", label: "deciliters" },
  { value: "l", label: "liters" },
];
const weightUnitOptions = [
  { value: "g", label: "grams" },
  { value: "kg", label: "kilograms" },
  { value: "oz", label: "ounces" },
  { value: "lb", label: "pounds" },
];
export const unitGroupOptions = [
  {
    label: "US Volume",
    options: usVolumeOptions,
  },
  {
    label: "Metric Volume",
    options: metricVolumeOptions,
  },
  {
    label: "Weights",
    options: weightUnitOptions,
  },
];
export const unitLabels = new Map<string, string>([
  ...usVolumeOptions.map((o) => [o.value, o.label] as const),
  ...metricVolumeOptions.map((o) => [o.value, o.label] as const),
  ...weightUnitOptions.map((o) => [o.value, o.label] as const),
]);
