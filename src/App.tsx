import { Container, Image } from "react-bootstrap";
import logoImageUrl from "./assets/logo-128.png";

function App() {
  return (
    <Container>
      <Image src={logoImageUrl} />
    </Container>
  );
}

export default App;
