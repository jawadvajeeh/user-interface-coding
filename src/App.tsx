import { Filesystem } from "./components/ui/file-system";
import { filesystem } from "./utility/data";

function App() {
  return (
    <main className="playground">
      {/*<NestedCheckbox data={checkboxesData} />*/}
      <Filesystem data={filesystem} />
    </main>
  );
}

export default App;
