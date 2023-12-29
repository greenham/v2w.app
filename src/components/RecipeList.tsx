import { Button, ListGroup, Stack } from "react-bootstrap";
import { TRecipeListProps } from "../types";
import { unitLabels } from "../constants";

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
    <ListGroup>
      {recipeLines.map((line, idx) => (
        <ListGroup.Item key={idx} className="fs-5">
          <Stack direction="horizontal">
            <span>
              {line.amount} {unitLabels.get(line.unit) || line.unit}{" "}
              {line.ingredient}
            </span>
            <Button
              onClick={() => handleLineRemove(idx)}
              size="sm"
              className="ms-auto"
            >
              X
            </Button>
          </Stack>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
