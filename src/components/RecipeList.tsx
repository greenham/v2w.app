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
      <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
        <h1>Your recipe is empty.</h1>
        <p className="lead">Convert an ingredient and add it here!</p>
      </div>
    );
  }

  return (
    <ListGroup className="h-75 overflow-auto">
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
                  <span>
                    <i className="fa-solid fa-weight-scale px-2"></i>
                    <code>
                      {numberFormatter.format(conversionResult.metricWeight[0])}{" "}
                    </code>
                    <small className="text-muted">
                      {conversionResult.metricWeight[1]}
                    </small>
                  </span>
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
