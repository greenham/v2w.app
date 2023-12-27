import React from "react";
import {
  Badge,
  Button,
  Container,
  Form,
  Image,
  InputGroup,
  Stack,
  Table,
} from "react-bootstrap";
import logoImageUrl from "./assets/logo-128.png";
import densities from "./densities.json";
const ingredients = densities.map((d) => d.name);
type TRecipeLine = {
  amount?: number;
  unit?: string;
  ingredient?: string;
};
const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

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
  { value: "oz", label: "ounces" },
  { value: "lb", label: "pounds" },
];

const unitGroupOptions = [
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

const unitLabels = new Map<string, string>([
  ...usVolumeOptions.map((o) => [o.value, o.label] as const),
  ...metricVolumeOptions.map((o) => [o.value, o.label] as const),
  ...weightUnitOptions.map((o) => [o.value, o.label] as const),
]);

const formatWeightResult = (value: number, label: string) => {
  return (
    <code>
      {numberFormatter.format(value)}
      <small className="text-muted">{label}</small>
    </code>
  );
};

function App() {
  // https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/
  // const chocolateChipCookiesRecipe = [
  //   { amount: 1, unit: "c", ingredient: "butter" },
  //   { amount: 1, unit: "c", ingredient: "sugar" },
  //   { amount: 1, unit: "c", ingredient: "sugar, brown" },
  //   { amount: 2, unit: "whole", ingredient: "egg" },
  //   { amount: 2, unit: "t", ingredient: "vanilla extract" },
  //   { amount: 1, unit: "t", ingredient: "baking soda" },
  //   { amount: 2, unit: "t", ingredient: "water" },
  //   { amount: 0.5, unit: "t", ingredient: "salt, table" },
  //   { amount: 3, unit: "c", ingredient: "flour" },
  //   { amount: 2, unit: "c", ingredient: "chocolate chips" },
  //   { amount: 1, unit: "c", ingredient: "walnuts, chopped" },
  // ].reverse();
  const [recipeLines, setRecipeLines] = React.useState<TRecipeLine[]>([]);
  const addRecipeLine = (newLine: TRecipeLine) => {
    setRecipeLines([newLine, ...recipeLines]);
  };
  return (
    <Container className="mt-3 mb-5">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <Image src={logoImageUrl} width={64} height={64} />
        <Stack>
          <h1 className="mb-0">volum.io</h1>
          <span>a free volume to weight converter for the kitchen</span>
        </Stack>
      </Stack>
      <datalist id="ingredients">
        {ingredients.map((i, idx) => (
          <option value={i} key={idx} />
        ))}
      </datalist>
      <Table striped responsive>
        <thead>
          <tr className="fs-2">
            <th style={{ width: "10%" }}>Amount</th>
            <th style={{ width: "15%" }}>Unit</th>
            <th>Ingredient</th>
            <th style={{ width: "12%" }}>Grams</th>
            <th style={{ width: "12%" }}>Pounds</th>
            <th style={{ width: "12%" }}>Ounces</th>
          </tr>
        </thead>
        <tbody>
          <RecipeLine isNew={true} onLineConverted={addRecipeLine} />
        </tbody>
        <tbody className="table-group-divider">
          {recipeLines.reverse().map((line, idx) => (
            <RecipeLine
              line={line}
              key={idx}
              isNew={false}
              isBeingEdited={false}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

type TRecipeLineProps = {
  line?: TRecipeLine;
  isNew?: boolean;
  isBeingEdited?: boolean;
  onLineConverted?: (line: TRecipeLine) => void;
};
function RecipeLine(props: TRecipeLineProps) {
  const { line, isNew, onLineConverted } = props;
  const [isBeingEdited, setIsBeingEdited] = React.useState(
    props.isBeingEdited || false
  );
  const [amount, setAmount] = React.useState(line?.amount || undefined);
  const [unit, setUnit] = React.useState(line?.unit || "t");
  const [ingredient, setIngredient] = React.useState(line?.ingredient || "");
  const [grams, setGrams] = React.useState(<></>);
  const [pounds, setPounds] = React.useState(<></>);
  const [ounces, setOunces] = React.useState(<></>);
  const [hasValidConversion, setHasValidConversion] = React.useState(false);

  const resetNewLine = () => {
    setAmount(undefined);
    setUnit("t");
    setIngredient("");
  };

  const handleLineAdd = () => {
    if (onLineConverted) {
      onLineConverted({ amount, unit, ingredient });
    }
    resetNewLine();
    // focus on the amount input
    const input = document.querySelector("input[type=number]");
    if (input) {
      (input as HTMLInputElement).focus();
    }
  };

  React.useEffect(() => {
    if (line) {
      setAmount(line.amount);
      setUnit(line?.unit || "t");
      setIngredient(line?.ingredient || "");
    }
  }, [line]);

  React.useEffect(() => {
    if (amount && unit && ingredient) {
      let grams;
      if (unit === "oz" || unit === "lb") {
        // straight conversion, no density needed
        grams = amount * (unit === "oz" ? gramsPerOunce : gramsPerPound);
      } else {
        const density = densities.find((d) => d.name === ingredient);
        if (density) {
          grams = density.g_whole
            ? amount * density.g_whole
            : amount * density.g_ml * unitToGramsMap.get(unit)!;
        } else {
          // no matching ingredient found, do nothing
          setHasValidConversion(false);
          return;
        }
      }
      if (grams >= 1000) {
        setGrams(formatWeightResult(grams / 1000, "kg"));
      } else {
        setGrams(formatWeightResult(grams, "g"));
      }

      const pounds = grams / gramsPerPound;
      const ounces = grams / gramsPerOunce;
      setPounds(formatWeightResult(pounds, "lb"));
      setOunces(formatWeightResult(ounces, "oz"));
      setHasValidConversion(true);
    } else {
      setGrams(<></>);
      setPounds(<></>);
      setOunces(<></>);
      setHasValidConversion(false);
    }
  }, [amount, unit, ingredient]);

  return (
    <tr className={isNew ? "table-active table-group-divider" : ""}>
      {/*  onClick={() => setIsBeingEdited(true)} */}
      <td className="fs-2 text-end">
        {isNew || isBeingEdited ? (
          <Form.Control
            type="number"
            inputMode="decimal"
            value={Number(amount)}
            onChange={(e) => setAmount(Math.abs(Number(e.target.value)))}
            size="lg"
          />
        ) : (
          amount
        )}
      </td>
      <td className="fs-2">
        {isNew || isBeingEdited ? (
          <Form.Select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            size="lg"
          >
            {unitGroupOptions.map((opt, idx) => (
              <optgroup label={opt.label} key={idx}>
                {opt.options.map((o, idx) => (
                  <option value={o.value} key={idx}>{`${o.label}`}</option>
                ))}
              </optgroup>
            ))}
          </Form.Select>
        ) : (
          <small>{unitLabels.get(unit) || unit}</small>
        )}
      </td>
      <td className="fs-2">
        {isNew || isBeingEdited ? (
          <InputGroup>
            <Form.Control
              type="text"
              list="ingredients"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter" && hasValidConversion) {
                  handleLineAdd();
                }
              }}
              placeholder="Start typing an ingredient..."
              size="lg"
            />
            {isNew ? (
              <>
                <Button
                  variant="success"
                  disabled={!hasValidConversion}
                  onClick={() => {
                    handleLineAdd();
                  }}
                >
                  <i className="fa-solid fa-plus"></i> Add
                </Button>
                <Button
                  variant="dark"
                  disabled={ingredient.length === 0}
                  onClick={() => resetNewLine()}
                >
                  <i className="fa-regular fa-circle-xmark"></i> Clear
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsBeingEdited(false)}>
                  <i className="fa-solid fa-floppy-disk"></i>
                </Button>
                <Button>
                  <i className="fa-solid fa-trash-can"></i>
                </Button>
              </>
            )}
          </InputGroup>
        ) : (
          ingredient
        )}
      </td>
      <td className="fs-2">
        <Badge pill bg="primary">
          {grams}
        </Badge>
      </td>
      <td className="fs-4" valign="middle">
        <Badge pill bg="secondary">
          {pounds}
        </Badge>
      </td>
      <td className="fs-4" valign="middle">
        <Badge pill bg="secondary">
          {ounces}
        </Badge>
      </td>
    </tr>
  );
}

export default App;
