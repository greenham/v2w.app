import React from "react";
import { Container, Table } from "react-bootstrap";
import { TRecipeLine } from "./types";
import { RecipeLine } from "./components/RecipeLine";
import { TopNav } from "./components/TopNav";
import densities from "./densities.json";
export const ingredients = densities.map((d) => d.name);

function App() {
  const [recipeLines, setRecipeLines] = React.useState<TRecipeLine[]>([]);
  const addRecipeLine = (newLine: TRecipeLine) => {
    setRecipeLines([newLine, ...recipeLines]);
  };
  const removeRecipeLine = (id: number) => {
    setRecipeLines(recipeLines.filter((_, idx) => idx !== id));
  };
  return (
    <Container className="mt-3 mb-5">
      <TopNav />
      <Table>
        <thead>
          <tr className="fs-2">
            <th style={{ width: "15%" }}>Amount</th>
            <th style={{ width: "20%" }}>Unit</th>
            <th>Ingredient</th>
          </tr>
        </thead>
        <tbody>
          <RecipeLine isNew={true} onLineConverted={addRecipeLine} />
        </tbody>
        <tbody className="table-group-divider">
          {recipeLines.reverse().map((line, idx) => (
            <RecipeLine
              id={idx}
              line={line}
              key={idx}
              isNew={false}
              onLineRemoved={removeRecipeLine}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
