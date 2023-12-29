import { Container } from "react-bootstrap";
import { TopNav } from "./components/TopNav";
// import { RecipeTable } from "./components/RecipeTable";
import { RecipeLineForm } from "./components/RecipeLineForm";

function App() {
  return (
    <Container className="mt-3 mb-5">
      <TopNav />
      <RecipeLineForm />
      {/* <RecipeTable /> */}
    </Container>
  );
}

export default App;
