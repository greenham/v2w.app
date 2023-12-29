import React from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";
import {
  gramsPerOunce,
  gramsPerPound,
  unitToGramsMap,
  unitGroupOptions,
  numberFormatter,
} from "../constants";
import densities from "../densities.json";
import { TIngredientDensity } from "../types";
const ingredients = densities.map((d) => d.name);

export function RecipeLineForm() {
  const defaults = {
    amount: "",
    unit: "t",
    ingredient: "",
  };

  const [amount, setAmount] = React.useState(defaults.amount);
  const [unit, setUnit] = React.useState(defaults.unit);
  const [ingredient, setIngredient] = React.useState(defaults.ingredient);
  const [hasValidConversion, setHasValidConversion] = React.useState(false);
  const [densityUsed, setDensityUsed] = React.useState<TIngredientDensity>();
  const [metricWeight, setMetricWeight] = React.useState<[number, string]>();
  const [usWeight, setUsWeight] = React.useState<[number, string]>();
  const ingredientRef = React.useRef<TypeaheadRef>(null);

  const resetNewLine = () => {
    setAmount(defaults.amount);
    setUnit(defaults.unit);
    setIngredient(defaults.ingredient);
    ingredientRef.current?.clear();
  };

  const handleLineAdd = () => {
    // if (onLineConverted) {
    //   onLineConverted({ amount, unit, ingredient });
    // }
    resetNewLine();

    // focus on the ingredient input
    ingredientRef.current?.focus();
  };

  // const handleLineRemove = () => {
  //   if (id !== undefined && onLineRemoved) {
  //     onLineRemoved(id);
  //     setIsBeingEdited(false);
  //   }
  // };

  React.useEffect(() => {
    ingredientRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (ingredient) {
      const density = densities.find((d) => d.name === ingredient);
      if (density) {
        setDensityUsed(density);
        setHasValidConversion(true);
      } else {
        setDensityUsed(undefined);
        setHasValidConversion(false);
      }
    } else {
      setHasValidConversion(false);
      setDensityUsed(undefined);
    }
  }, [ingredient]);

  React.useEffect(() => {
    if (amount && unit && ingredient) {
      // parse fractions into decimal for calculation
      const amountNum = amount.includes("/")
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
        if (densityUsed) {
          // if units are currently "whole", but g_whole is null, force to default unit
          const unitUsed =
            unit === "whole" && !densityUsed.g_whole ? defaults.unit : unit;

          // do the conversion (units are ignored for "whole" ingredients)
          grams = densityUsed.g_whole
            ? amountNum * densityUsed.g_whole
            : amountNum * densityUsed.g_ml * unitToGramsMap.get(unitUsed)!;

          setUnit(densityUsed.g_whole ? "whole" : unitUsed);
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
  }, [amount, unit, ingredient, densityUsed, defaults.unit]);

  return (
    <Container className="p-4 bg-body-tertiary rounded-2">
      {/* <h2 className="display-5 mb-3">
        <i className="fa-solid fa-calculator px-2"></i>
        Conversion Calculator
      </h2> */}
      <Form.Group className="mb-3">
        <Form.Label>
          <strong>Ingredient name</strong>
        </Form.Label>
        <Typeahead
          id="ingredients"
          options={ingredients}
          onChange={(s) => setIngredient(s.toString())}
          placeholder="Start typing an ingredient..."
          inputProps={{ className: "fs-1" }}
          size="lg"
          className="mb-3"
          ref={ingredientRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && hasValidConversion) {
              handleLineAdd();
            } else if (e.key === "Escape") {
              ingredientRef.current?.clear();
            }
          }}
          highlightOnlyResult={true}
        />
      </Form.Group>
      <Row xs={1} sm={2}>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Amount of ingredient</strong>
            </Form.Label>
            <Form.Control
              id="amountInput"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              size="lg"
              className="fs-3 text-end"
              placeholder="3, 0.5, 1/4, etc."
            />
            <Form.Text id="passwordHelpBlock" muted>
              Enter a number, decimal, or fraction.
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Unit of measurement</strong>
            </Form.Label>
            <Form.Select
              id="unitSelect"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              size="lg"
              className="fs-3"
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
          </Form.Group>
        </Col>
      </Row>
      {hasValidConversion && (
        <Alert variant="dark" className="px-5 py-4 text-center">
          <Row xs={1} sm={2} md={3} className="g-4 justify-content-center mb-4">
            {metricWeight && (
              <Col>
                <div>
                  <h3 className="fw-bold mb-2 fs-4 text-body-emphasis">
                    <i className="fa-solid fa-weight-scale px-2"></i>
                    Metric Weight
                  </h3>
                  <h1>
                    <Badge pill>
                      <code>{numberFormatter.format(metricWeight[0])}</code>{" "}
                      <small className="text-body-secondary">
                        {metricWeight[1]}
                      </small>
                    </Badge>
                  </h1>
                </div>
              </Col>
            )}
            {usWeight && (
              <Col>
                <div>
                  <h3 className="fw-bold mb-2 fs-4 text-body-emphasis">
                    <i className="fa-solid fa-flag-usa px-2"></i>
                    US Weight
                  </h3>
                  <h1>
                    <Badge pill>
                      <code>{numberFormatter.format(usWeight[0])}</code>{" "}
                      <small className="text-body-secondary">
                        {usWeight[1]}
                      </small>
                    </Badge>
                  </h1>
                </div>
              </Col>
            )}
            <Col>
              <div>
                <h3 className="fw-bold mb-2 fs-4 text-body-emphasis">
                  <i className="fa-solid fa-flask px-2"></i>
                  Density
                </h3>
                <h1>
                  <Badge pill>
                    <code>
                      {densityUsed?.g_whole
                        ? densityUsed.g_whole
                        : densityUsed?.g_ml}
                    </code>{" "}
                    <small className="text-body-secondary">
                      {densityUsed?.g_whole ? "g/whole" : "g/mL"}
                    </small>
                  </Badge>
                </h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Button variant="outline-success" size="lg" className="fw-bold">
              <i className="fa-solid fa-plus px-2"></i>Add to recipe
            </Button>
          </Row>
        </Alert>
      )}
    </Container>
  );
}
