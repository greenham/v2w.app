import React from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { TopNav, RecipeLineForm, RecipeList } from "./components";
import { TRecipeLine } from "./types";

function App() {
  const [recipeLines, setRecipeLines] = React.useState<TRecipeLine[]>([]);
  const [editingLine, setEditingLine] = React.useState<TRecipeLine | undefined>(
    undefined
  );

  const addRecipeLine = (newLine: TRecipeLine) => {
    setRecipeLines([newLine, ...recipeLines]);
  };
  const removeRecipeLine = (id: number) => {
    setRecipeLines(recipeLines.filter((_, idx) => idx !== id));
  };
  const startEditingLine = (id: number) => {
    setEditingLine(recipeLines[id]);
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
            onLineEdit={startEditingLine}
          />
        </Col>
      </Row>
      <RecipeLineFormModal
        line={editingLine}
        show={!!editingLine}
        onHide={() => setEditingLine(undefined)}
      />
    </Container>
  );
}

function RecipeLineFormModal(props: {
  line: TRecipeLine | undefined;
  show: boolean;
  onHide: () => void;
}) {
  const handleLineChange = (line: TRecipeLine) => {
    console.log("line changed:", line);
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit recipe line
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RecipeLineForm line={props.line} onLineChange={handleLineChange} />
      </Modal.Body>
    </Modal>
  );
}

export default App;
