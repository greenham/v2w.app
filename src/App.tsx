import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TopNav, RecipeLineForm, RecipeList } from "./components";
import { TRecipeLine } from "./types";
import { chocolateChipCookiesRecipe } from "./recipes";

function App() {
  const [recipeLines, setRecipeLines] = React.useState<TRecipeLine[]>(
    chocolateChipCookiesRecipe
  );
  const addRecipeLine = (newLine: TRecipeLine) => {
    setRecipeLines([newLine, ...recipeLines]);
  };
  const removeRecipeLine = (id: number) => {
    setRecipeLines(recipeLines.filter((_, idx) => idx !== id));
  };

  return (
    <Container className="mt-3 mb-5">
      <TopNav />
      <Row className="g-4">
        <Col sm={12} md={6} lg={8}>
          <RecipeLineForm onLineAdd={addRecipeLine} />
        </Col>
        <Col sm={12} md={6} lg={4}>
          <RecipeList
            recipeLines={recipeLines}
            onLineRemoved={removeRecipeLine}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
