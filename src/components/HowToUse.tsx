import { Alert } from "react-bootstrap";

export function HowToUse() {
  return (
    <div className="fs-4">
      <ul>
        <li>Enter an amount of an ingredient you want to convert</li>
        <li>Select the unit of measurement for the amount you entered</li>
        <li>
          Start typing the name of the ingredient you want to convert and select
          a match from the list
        </li>
        <li>
          You will see the weight displayed in both metric (grams/kilos) and US
          (ounces/pounds).
        </li>
        <li>
          Click on "Add to Recipe" to add the ingredient to the list and start
          converting another ingredient!
        </li>
      </ul>
      <Alert variant="info" className="fs-5">
        This is intended to be used for converting volumes to weights, but you
        can also use it to convert metric weights to US and vice-versa!
      </Alert>
    </div>
  );
}
