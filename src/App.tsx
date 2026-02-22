import { NestedCheckbox } from "./components/ui/checkboxes";
import { checkboxesData } from "./utility/data";

function App() {
  return (
    <main className="playground">
      <NestedCheckbox data={checkboxesData} />
    </main>
  );
}

export default App;
