import { gramsPerOunce, gramsPerPound, unitToGramsMap } from "./constants";
import densities from "./densities.json";
import { TIngredientDensity } from "./types";

export function getIngredientDensity(
  ingredient: string
): TIngredientDensity | false {
  return densities.find((d) => d.name === ingredient) || false;
}

export function convertToWeight(
  ingredient: string,
  amount: string,
  unit: string
) {
  // parse fractions into decimal
  const amountNum = amount.includes("/")
    ? amount
        .split("/")
        .map(Number)
        .reduce((p, c) => p / c)
    : Number(amount);

  let grams, density, unitUsed;
  unitUsed = unit;
  if (unit === "g" || unit === "kg") {
    grams = amountNum * (unit === "g" ? 1 : 1000);
  } else if (unit === "oz" || unit === "lb") {
    // straight conversion, no density needed
    grams = amountNum * (unit === "oz" ? gramsPerOunce : gramsPerPound);
  } else {
    density = getIngredientDensity(ingredient);
    if (density) {
      // if units are currently "whole", but g_whole is null, force to a sensible default
      unitUsed = unit === "whole" && !density.g_whole ? "t" : unit;

      // do the conversion (units are ignored for "whole" ingredients)
      grams = density.g_whole
        ? amountNum * density.g_whole
        : amountNum * density.g_ml * unitToGramsMap.get(unitUsed)!;

      unitUsed = density.g_whole ? "whole" : unitUsed;
    } else {
      // no matching ingredient found
      return false;
    }
  }

  const metricWeight: [number, string] =
    grams >= 1000 ? [grams / 1000, "kilograms"] : [grams, "grams"];

  const ounces = grams / gramsPerOunce;
  const usWeight: [number, string] =
    ounces >= 16 ? [ounces / 16, "pounds"] : [ounces, "ounces"];

  return { metricWeight, usWeight, density, unitUsed };
}
