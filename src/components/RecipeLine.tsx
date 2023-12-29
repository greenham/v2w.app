import React from "react";
import { Badge, Button, Form, InputGroup, Stack } from "react-bootstrap";
import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";
import { TRecipeLineProps, TIngredientDensity } from "../types";
import densities from "../densities.json";
import {
  gramsPerOunce,
  gramsPerPound,
  unitToGramsMap,
  unitGroupOptions,
  unitLabels,
  numberFormatter,
} from "../constants";
import { ingredients } from "../App";

export function RecipeLine(props: TRecipeLineProps) {
  const defaults = {
    amount: "",
    unit: "t",
    ingredient: "",
  };

  const { id, line, isNew, onLineConverted, onLineRemoved } = props;
  const [isBeingEdited, setIsBeingEdited] = React.useState(false);
  const [amount, setAmount] = React.useState(defaults.amount);
  const [unit, setUnit] = React.useState(defaults.unit);
  const [ingredient, setIngredient] = React.useState(defaults.ingredient);
  const [metricWeight, setMetricWeight] = React.useState<[number, string]>();
  const [usWeight, setUsWeight] = React.useState<[number, string]>();
  const [hasValidConversion, setHasValidConversion] = React.useState(false);
  const [densityUsed, setDensityUsed] = React.useState<TIngredientDensity>();
  const ingredientRef = React.useRef<TypeaheadRef>(null);

  const resetNewLine = () => {
    setAmount(defaults.amount);
    setUnit(defaults.unit);
    setIngredient(defaults.ingredient);
    ingredientRef.current?.clear();
  };

  const handleLineAdd = () => {
    if (onLineConverted) {
      onLineConverted({ amount, unit, ingredient });
    }
    resetNewLine();
    // focus on the amount input
    const input = document.querySelector("#amountInput");
    if (input) {
      (input as HTMLInputElement).focus();
    }
  };

  const handleLineRemove = () => {
    if (id !== undefined && onLineRemoved) {
      onLineRemoved(id);
      setIsBeingEdited(false);
    }
  };

  React.useEffect(() => {
    setAmount(line?.amount || defaults.amount);
    setUnit(line?.unit || defaults.unit);
    setIngredient(line?.ingredient || defaults.ingredient);
  }, [line]);

  React.useEffect(() => {
    if (amount && unit && ingredient) {
      // parse fractions into decimal for calculation
      let amountNum = amount.includes("/")
        ? amount
            .split("/")
            .map(Number)
            .reduce((p, c) => p / c)
        : Number(amount);

      // convert selected unit to grams
      let grams;
      if (unit === "g" || unit === "kg") {
        grams = amountNum * (unit === "g" ? 1 : 1000);
      } else if (unit === "oz" || unit === "lb") {
        // straight conversion, no density needed
        grams = amountNum * (unit === "oz" ? gramsPerOunce : gramsPerPound);
      } else {
        // find density for ingredient
        const density = densities.find((d) => d.name === ingredient);
        if (density) {
          setDensityUsed(density);

          // if units are currently "whole", but g_whole is null, force to default unit
          let unitUsed =
            unit === "whole" && !density.g_whole ? defaults.unit : unit;

          // do the conversion (units are ignored for "whole" ingredients)
          grams = density.g_whole
            ? amountNum * density.g_whole
            : amountNum * density.g_ml * unitToGramsMap.get(unitUsed)!;

          setUnit(density.g_whole ? "whole" : unitUsed);
        } else {
          // no matching ingredient found, do nothing
          setHasValidConversion(false);
          return;
        }
      }
      if (grams >= 1000) {
        setMetricWeight([grams / 1000, "kilograms"]);
      } else {
        setMetricWeight([grams, "grams"]);
      }

      const ounces = grams / gramsPerOunce;
      if (ounces >= 16) {
        setUsWeight([ounces / 16, "pounds"]);
      } else {
        setUsWeight([ounces, "ounces"]);
      }

      setHasValidConversion(true);
    } else {
      setMetricWeight(undefined);
      setUsWeight(undefined);
      setHasValidConversion(false);
    }
  }, [amount, unit, ingredient]);

  return (
    <>
      <tr
        className={
          isNew ? "table-active table-group-divider" : "table-group-divider"
        }
      >
        <td className="fs-3 text-end" valign="middle">
          {isNew || isBeingEdited ? (
            <Form.Control
              id="amountInput"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              size="lg"
              placeholder="3, 0.5, 1/4, etc."
              className="text-end"
            />
          ) : (
            <Stack direction="horizontal">
              <i className="fa-solid fa-flask"></i>
              <span className="ms-auto">{amount}</span>
            </Stack>
          )}
        </td>
        <td className="fs-3" valign="middle">
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
              <option value="whole" disabled>
                whole
              </option>
            </Form.Select>
          ) : (
            <small className="text-muted">{unitLabels.get(unit) || unit}</small>
          )}
        </td>
        <td className="fs-2" valign="middle">
          {isNew || isBeingEdited ? (
            <InputGroup>
              {isNew ? (
                <Button
                  variant="dark"
                  disabled={ingredient.length === 0}
                  onClick={() => resetNewLine()}
                >
                  <i className="fa-regular fa-circle-xmark"></i>
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={() => handleLineRemove()}
                  size="sm"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </Button>
              )}
              <Typeahead
                id="ingredients"
                options={ingredients}
                onChange={(s) => setIngredient(s.toString())}
                defaultSelected={[ingredient]}
                placeholder="Start typing an ingredient..."
                size="lg"
                className="form-control"
                ref={ingredientRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && hasValidConversion) {
                    if (isNew) {
                      handleLineAdd();
                    } else {
                      setIsBeingEdited(false);
                    }
                  } else if (e.key === "Escape") {
                    ingredientRef.current?.clear();
                  }
                }}
                highlightOnlyResult={true}
              />
              {isNew ? (
                <Button
                  variant="success"
                  disabled={!hasValidConversion}
                  onClick={() => handleLineAdd()}
                >
                  <i className="fa-solid fa-plus"></i> Add to Recipe
                </Button>
              ) : (
                <Button
                  variant="success"
                  disabled={!hasValidConversion}
                  onClick={() => setIsBeingEdited(false)}
                  size="sm"
                >
                  <i className="fa-solid fa-floppy-disk"></i> Save Changes
                </Button>
              )}
            </InputGroup>
          ) : (
            <Stack direction="horizontal">
              <Badge bg="info">{ingredient}</Badge>
              <Button
                onClick={() => setIsBeingEdited(true)}
                className="ms-auto"
                variant="secondary"
              >
                <i className="fa-regular fa-pen-to-square"></i> Edit Line
              </Button>
            </Stack>
          )}
        </td>
      </tr>
      {hasValidConversion && metricWeight && (
        <tr className="fs-2">
          <td>
            <Stack direction="horizontal">
              <i className="fa-solid fa-equals"></i>
              <code className="ms-auto">
                {numberFormatter.format(metricWeight[0])}
              </code>
            </Stack>
          </td>
          <td className="text-muted">{metricWeight[1]}</td>
          <td className="fs-4" valign="middle">
            <small className="text-muted">
              <i className="fa-solid fa-atom"></i>{" "}
              {densityUsed?.g_whole
                ? `${densityUsed.g_whole} g/whole`
                : `${densityUsed?.g_ml} g/mL`}
            </small>
          </td>
        </tr>
      )}
      {hasValidConversion && usWeight && (
        <tr className="fs-2">
          <td>
            <Stack direction="horizontal">
              <i className="fa-solid fa-equals"></i>
              <code className="ms-auto">
                {numberFormatter.format(usWeight[0])}
              </code>
            </Stack>
          </td>
          <td className="text-muted" colSpan={2}>
            {usWeight[1]}
          </td>
        </tr>
      )}
    </>
  );
}
