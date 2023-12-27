import React from "react";
import { Container, Form, Image } from "react-bootstrap";
import logoImageUrl from "./assets/logo-128.png";
import densities from "./densities.json";
const ingredients = densities.map((d) => d.name);
type TRecipeLine = {
  amount?: number;
  unit?: string;
  ingredient?: string;
};

const unitToGramsMap = new Map<string, number>([
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
]);
const gramsPerPound = 453;
const gramsPerOunce = 28;

function App() {
  const [recipeLines, setRecipeLines] = React.useState<TRecipeLine[]>([]);
  return (
    <Container>
      <Image src={logoImageUrl} />
      <datalist id="ingredients">
        {ingredients.map((i) => (
          <option value={i} />
        ))}
      </datalist>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Unit</th>
            <th>Ingredient</th>
            <th>Grams</th>
            <th>Pounds</th>
            <th>Ounces</th>
          </tr>
        </thead>
        <tbody>
          <RecipeLine />
          {recipeLines.map((line) => (
            <RecipeLine line={line} />
          ))}
        </tbody>
      </table>
    </Container>
  );
}

type TRecipeLineProps = {
  line?: TRecipeLine;
};
function RecipeLine(props: TRecipeLineProps) {
  const { line } = props;
  const [amount, setAmount] = React.useState(line?.amount || undefined);
  const [unit, setUnit] = React.useState(line?.unit || "");
  const [ingredient, setIngredient] = React.useState(line?.ingredient || "");
  const [grams, setGrams] = React.useState(0);
  const [pounds, setPounds] = React.useState(0);
  const [ounces, setOunces] = React.useState(0);

  React.useEffect(() => {
    if (amount && unit && ingredient) {
      const density = densities.find((d) => d.name === ingredient);
      if (density) {
        const grams = density.g_whole
          ? amount * density.g_whole
          : amount * density.g_ml * unitToGramsMap.get(unit)!;
        const pounds = grams / gramsPerPound;
        const ounces = grams / gramsPerOunce;
        setAmount(amount);
        setUnit(unit);
        setIngredient(ingredient);
        setGrams(grams);
        setPounds(pounds);
        setOunces(ounces);
      }
    }
  }, [amount, unit, ingredient]);

  return (
    <tr>
      <td>
        <Form.Control
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </td>
      <td>
        <Form.Control
          as="select"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <optgroup label="US Volume">
            <option value="t" selected>
              teaspoons
            </option>
            <option value="T">tablespoons</option>
            <option value="floz">fluid ounces</option>
            <option value="c">cups</option>
            <option value="pt">pints</option>
            <option value="qt">quarts</option>
            <option value="gal">gallons</option>
          </optgroup>
          <optgroup label="Metric Volume">
            <option value="ml">milliliters</option>
            <option value="dl">deciliters</option>
            <option value="l">liters</option>
          </optgroup>
          <optgroup label="Weights">
            <option value="oz">ounces</option>
            <option value="lb">pounds</option>
          </optgroup>
        </Form.Control>
      </td>
      <td>
        <Form.Control
          type="text"
          list="ingredients"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
      </td>
      <td>{grams}</td>
      <td>{pounds}</td>
      <td>{ounces}</td>
    </tr>
  );
}

export default App;
