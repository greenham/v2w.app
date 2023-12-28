import React from "react";
import { Container, Table } from "react-bootstrap";
import { TRecipeLine } from "./types";
import densities from "./densities.json";
import { RecipeLine } from "./components/RecipeLine";
import { TopNav } from "./components/TopNav";

export const ingredients = densities.map((d) => d.name);

function App() {
  // https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/
  // const chocolateChipCookiesRecipe = [
  //   { amount: "1", unit: "c", ingredient: "butter" },
  //   { amount: "1", unit: "c", ingredient: "sugar" },
  //   { amount: "1", unit: "c", ingredient: "sugar, brown" },
  //   { amount: "2", unit: "whole", ingredient: "egg" },
  //   { amount: "2", unit: "t", ingredient: "vanilla extract" },
  //   { amount: "1", unit: "t", ingredient: "baking soda" },
  //   { amount: "2", unit: "t", ingredient: "water" },
  //   { amount: "1/2", unit: "t", ingredient: "salt, table" },
  //   { amount: "3", unit: "c", ingredient: "flour" },
  //   { amount: "2", unit: "c", ingredient: "chocolate chips" },
  //   { amount: "1", unit: "c", ingredient: "walnuts, chopped" },
  // ].reverse();
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
