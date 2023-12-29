import { Container } from "react-bootstrap";
import { TopNav } from "./components/TopNav";
import { RecipeTable } from "./components/RecipeTable";
import densities from "./densities.json";
export const ingredients = densities.map((d) => d.name);

function App() {
  return (
    <Container className="mt-3 mb-5">
      <TopNav />
      <RecipeTable />
    </Container>
  );
}

export default App;
