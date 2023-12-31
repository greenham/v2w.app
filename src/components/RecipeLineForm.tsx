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
import { TIngredientDensity, TRecipeLineFormProps } from "../types";
import { convertToWeight } from "../utils";
import densities from "../densities.json";
const ingredients = densities.map((d) => d.name);
const amountRegex = /^(\d+(\.\d+)?|\d+\/\d+)$/;

export function RecipeLineForm(props: TRecipeLineFormProps) {
  const { line, onLineAdd, onLineChange } = props;
  const defaults = {
    amount: "",
    unit: "",
    ingredient: "",
  };

  const [amount, setAmount] = React.useState(line?.amount || defaults.amount);
  const [unit, setUnit] = React.useState(line?.unit || defaults.unit);
  const [ingredient, setIngredient] = React.useState(
    line?.ingredient || defaults.ingredient
  );
  const [hasValidConversion, setHasValidConversion] = React.useState(false);
  const [densityUsed, setDensityUsed] = React.useState<TIngredientDensity>();
  const [metricWeight, setMetricWeight] = React.useState<[number, string]>();
  const [usWeight, setUsWeight] = React.useState<[number, string]>();
  const [amountIsValid, setAmountIsValid] = React.useState(false);
  const [ingredientInput, setIngredientInput] = React.useState("");
  const ingredientRef = React.useRef<TypeaheadRef>(null);

  const resetFormToDefaults = () => {
    setAmount(defaults.amount);
    setUnit(defaults.unit);
    setIngredient(defaults.ingredient);
    setIngredientInput("");
    ingredientRef.current?.clear();
  };

  // const revertFormChanges = () => {
  //   setAmount(line?.amount || defaults.amount);
  //   setUnit(line?.unit || defaults.unit);
  //   setIngredient(line?.ingredient || defaults.ingredient);
  //   if (line && onLineChange) {
  //     onLineChange && onLineChange(line);
  //   }
  // };

  const cancelEdit = () => {
    if (onLineChange) {
      onLineChange();
    }
  };

  const handleLineAdd = () => {
    onLineAdd && onLineAdd({ amount, unit, ingredient });
    resetFormToDefaults();
  };

  const handleLineEdit = () => {
    if (line) {
      line.amount = amount;
      line.unit = unit;
      line.ingredient = ingredient;

      onLineChange && onLineChange();
    }
  };

  React.useEffect(() => {
    setHasValidConversion(false);

    // validate amount
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
      }
    }
  }, [ingredient, amount, unit]);

  return (
    <Container className="p-4 bg-body-tertiary rounded-2 border border-light-subtle shadow">
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="fa-solid fa-apple-whole px-2"></i>
          <strong>Ingredient name</strong>
        </Form.Label>
        <Typeahead
          id="ingredients"
          options={ingredients}
          onChange={(s) => setIngredient(s.toString())}
          onInputChange={(s) => setIngredientInput(s)}
          placeholder="Start typing an ingredient..."
          inputProps={{ className: "fs-2" }}
          size="lg"
          className="mb-3"
          ref={ingredientRef}
          isInvalid={ingredientInput.length > 1 && !ingredient}
          isValid={!!ingredient}
          defaultSelected={[ingredient]}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              ingredientRef.current?.blur();

              if (hasValidConversion) {
                if (!line) {
                  handleLineAdd();
                } else {
                  handleLineEdit();
                }
              }
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
              <i className="fa-solid fa-flask px-2"></i>
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
              <i className="fa-solid fa-ruler-vertical px-2"></i>
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
              <option value="">- Choose a unit -</option>
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
                    Metric
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
                    US
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
            {!line && (
              <Button
                variant="outline-success"
                size="lg"
                className="fw-bold"
                onClick={() => handleLineAdd()}
              >
                <i className="fa-solid fa-plus px-2"></i>Add to recipe
              </Button>
            )}
            {line &&
              (line.amount != amount ||
                line.unit != unit ||
                line.ingredient != ingredient) && (
                <Row xs={2}>
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    className="fw-bold"
                    onClick={() => cancelEdit()}
                  >
                    <i className="fa-solid fa-ban px-2"></i>Close without saving
                  </Button>
                  <Button
                    variant="outline-success"
                    size="lg"
                    className="fw-bold"
                    onClick={() => handleLineEdit()}
                  >
                    <i className="fa-solid fa-check px-2"></i>Save changes
                  </Button>
                </Row>
              )}
          </Row>
        </Alert>
      )}
    </Container>
  );
}
