import { Button, ListGroup, Stack } from "react-bootstrap";
import { TRecipeListProps } from "../types";
import { numberFormatter, unitLabels } from "../constants";
import { convertToWeight } from "../utils";

export function RecipeList({ recipeLines, onLineRemoved }: TRecipeListProps) {
  const handleLineRemove = (id: number) => {
    if (id !== undefined && onLineRemoved) {
      onLineRemoved(id);
    }
  };

  if (recipeLines.length === 0) {
    return (
      <div className="p-5 text-center text-muted bg-body border border-dark-subtle rounded-2 shadow">
        <h1>Your recipe is empty.</h1>
        <p className="lead">Convert an ingredient and add it here!</p>
      </div>
    );
  }

  return (
    <ListGroup className="overflow-auto shadow" style={{ maxHeight: "80vh" }}>
      {recipeLines.map((line, idx) => {
        const conversionResult = convertToWeight(
          line.ingredient,
          line.amount,
          line.unit
        );
        return (
          <ListGroup.Item key={idx} className="fs-5">
            <Stack direction="horizontal">
              <Stack>
                <span>
                  {line.amount}{" "}
                  <small>{unitLabels.get(line.unit) || line.unit}</small>{" "}
                  {line.ingredient}
                </span>
                {conversionResult && (
                  <>
                    {conversionResult.metricWeight && (
                      <span>
                        <i className="fa-solid fa-weight-scale px-2"></i>
                        <code>
                          {numberFormatter.format(
                            conversionResult.metricWeight[0]
                          )}{" "}
                        </code>
                        <small className="text-muted">
                          {conversionResult.metricWeight[1]}
                        </small>
                      </span>
                    )}
                    {conversionResult.usWeight && (
                      <span>
                        <i className="fa-solid fa-flag-usa px-2"></i>
                        <code>
                          {numberFormatter.format(conversionResult.usWeight[0])}{" "}
                        </code>
                        <small className="text-muted">
                          {conversionResult.usWeight[1]}
                        </small>
                      </span>
                    )}
                    {conversionResult.density && (
                      <span>
                        <i className="fa-solid fa-flask px-2"></i>
                        <code>
                          {conversionResult.density?.g_whole
                            ? conversionResult.density.g_whole
                            : conversionResult.density?.g_ml}
                        </code>{" "}
                        <small className="text-body-secondary">
                          {conversionResult.density?.g_whole
                            ? "g/whole"
                            : "g/mL"}
                        </small>
                      </span>
                    )}
                  </>
                )}
              </Stack>
              <Button
                onClick={() => handleLineRemove(idx)}
                size="sm"
                className="ms-auto"
              >
                X
              </Button>
            </Stack>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
