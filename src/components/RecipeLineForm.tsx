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
import { unitLabels, unitGroupOptions, numberFormatter } from "../constants";
import densities from "../densities.json";
import { TIngredientDensity, TRecipeLineFormProps } from "../types";
import { convertToWeight } from "../utils";
const ingredients = densities.map((d) => d.name);
const amountRegex = /^(\d+(\.\d+)?|\d+\/\d+)$/;

export function RecipeLineForm(props: TRecipeLineFormProps) {
  const { onLineAdd } = props;
  const defaults = {
    amount: "",
    unit: "",
    ingredient: "",
  };

  const [amount, setAmount] = React.useState(defaults.amount);
  const [unit, setUnit] = React.useState(defaults.unit);
  const [ingredient, setIngredient] = React.useState(defaults.ingredient);
  const [hasValidConversion, setHasValidConversion] = React.useState(false);
  const [densityUsed, setDensityUsed] = React.useState<TIngredientDensity>();
  const [metricWeight, setMetricWeight] = React.useState<[number, string]>();
  const [usWeight, setUsWeight] = React.useState<[number, string]>();
  const [amountIsValid, setAmountIsValid] = React.useState(false);
  const ingredientRef = React.useRef<TypeaheadRef>(null);
  const selectedIngredient = undefined;

  const resetForm = () => {
    setAmount(defaults.amount);
    setUnit(defaults.unit);
    setIngredient(defaults.ingredient);
    ingredientRef.current?.clear();
  };

  const handleLineAdd = () => {
    if (onLineAdd) {
      onLineAdd({ amount, unit, ingredient });
    }
    resetForm();

    // focus on the ingredient input
    ingredientRef.current?.focus();
  };

  React.useEffect(() => {
    setHasValidConversion(false);
    const newAmountIsValid = amountRegex.test(amount);
    setAmountIsValid(newAmountIsValid);
    if (!newAmountIsValid) {
      return;
    }

    if (ingredient && amount && unit) {
      const conversionResult = convertToWeight(ingredient, amount, unit);
      if (conversionResult !== false) {
        setMetricWeight(conversionResult.metricWeight);
        setUsWeight(conversionResult.usWeight);
        setUnit(conversionResult.unitUsed);
        setDensityUsed(conversionResult.density);
        setHasValidConversion(true);
      } else {
        setHasValidConversion(false);
      }
    } else {
      setHasValidConversion(false);
    }
  }, [amount, unit, ingredient]);

  return (
    <Container className="p-4 bg-body-tertiary rounded-2">
      <Form.Group className="mb-3">
        <Form.Label>
          <strong>Ingredient name</strong>
        </Form.Label>
        <Typeahead
          id="ingredients"
          options={ingredients}
          onChange={(s) => setIngredient(s.toString())}
          placeholder="Start typing an ingredient..."
          inputProps={{ className: "fs-2" }}
          size="lg"
          className="mb-3"
          ref={ingredientRef}
          selected={selectedIngredient}
          isInvalid={selectedIngredient && !ingredient}
          isValid={!!ingredient}
          onKeyDown={(e) => {
            if (e.key === "Enter" && hasValidConversion) {
              handleLineAdd();
            } else if (e.key === "Escape") {
              ingredientRef.current?.clear();
            }
          }}
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
              className="fs-3"
              placeholder="3, 0.5, 1/4, etc."
              isInvalid={amount.length > 0 && !amountIsValid}
              isValid={amountIsValid}
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
              isValid={unit != ""}
            >
              <option>- Choose a unit -</option>
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
          <h1>
            {amount} {unitLabels.get(unit) || unit} of{" "}
            <strong>{ingredient}</strong>
          </h1>
          <hr />
          <Row xs={1} sm={2} md={3} className="g-4 justify-content-center mb-4">
            {metricWeight && (
              <Col>
                <div>
                  <h3 className="fw-bold mb-2 fs-4 text-body-emphasis">
                    <i className="fa-solid fa-weight-scale px-2"></i>
                    Metric Weight
                  </h3>
                  <h2>
                    <Badge pill>
                      <code>{numberFormatter.format(metricWeight[0])}</code>{" "}
                      <small className="text-body-secondary">
                        {metricWeight[1]}
                      </small>
                    </Badge>
                  </h2>
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
                  <h2>
                    <Badge pill>
                      <code>{numberFormatter.format(usWeight[0])}</code>{" "}
                      <small className="text-body-secondary">
                        {usWeight[1]}
                      </small>
                    </Badge>
                  </h2>
                </div>
              </Col>
            )}
            <Col>
              <div>
                <h3 className="fw-bold mb-2 fs-4 text-body-emphasis">
                  <i className="fa-solid fa-flask px-2"></i>
                  Density
                </h3>
                <h2>
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
                </h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Button
              variant="outline-success"
              size="lg"
              className="fw-bold"
              onClick={() => handleLineAdd()}
            >
              <i className="fa-solid fa-plus px-2"></i>Add to recipe
            </Button>
          </Row>
        </Alert>
      )}
    </Container>
  );
}
