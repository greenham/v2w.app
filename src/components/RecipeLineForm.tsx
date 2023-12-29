import React from "react";
import { Alert, Badge, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";
import { unitGroupOptions } from "../constants";
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
  const ingredientRef = React.useRef<TypeaheadRef>(null);
  const [hasValidConversion, setHasValidConversion] = React.useState(false);
  const [densityUsed, setDensityUsed] = React.useState<TIngredientDensity>();

  // const resetNewLine = () => {
  //   setAmount(defaults.amount);
  //   setUnit(defaults.unit);
  //   setIngredient(defaults.ingredient);
  //   ingredientRef.current?.clear();
  // };

  // const handleLineAdd = () => {
  //   if (onLineConverted) {
  //     onLineConverted({ amount, unit, ingredient });
  //   }
  //   resetNewLine();
  //   // focus on the amount input
  //   const input = document.querySelector("#amountInput");
  //   if (input) {
  //     (input as HTMLInputElement).focus();
  //   }
  // };

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

  return (
    <>
      <h2 className="display-5 mb-3">Choose an ingredient to start</h2>
      <Form.Group className="mb-3" controlId="ingredients">
        <Form.Label>Ingredient name</Form.Label>
        <Typeahead
          id="ingredients"
          options={ingredients}
          onChange={(s) => setIngredient(s.toString())}
          defaultSelected={[ingredient]}
          placeholder="Start typing an ingredient..."
          size="lg"
          className="mb-3"
          ref={ingredientRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && hasValidConversion) {
              // if (isNew) {
              //   handleLineAdd();
              // } else {
              //   setIsBeingEdited(false);
              // }
            } else if (e.key === "Escape") {
              ingredientRef.current?.clear();
            }
          }}
          highlightOnlyResult={true}
        />
      </Form.Group>
      <Row xs={1} sm={2}>
        <Col>
          <FloatingLabel
            controlId="amountInput"
            label="Amount of ingredient (6, 0.5, 1/4, etc.)"
            className="mb-3"
          >
            <Form.Control
              id="amountInput"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              size="lg"
              placeholder="3, 0.5, 1/4, etc."
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="unitSelect" label="Unit of measurement">
            <Form.Select
              id="unitSelect"
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
          </FloatingLabel>
        </Col>
      </Row>
      <hr />
      <Alert className="d-grid fs-3" variant="dark">
        {/* <Button variant="primary" size="lg">
          Add to recipe
        </Button> */}
        Selected ingredient: <Badge>{ingredient}</Badge>
        <br />
        Density used: <Badge>{JSON.stringify(densityUsed, null, 2)}</Badge>
        <br />
        Selected amount: <Badge>{amount}</Badge>
        <br />
        Selected unit: <Badge>{unit}</Badge>
      </Alert>
    </>
  );
}
