import Hello from "./components/Hallo";
import HalloFunc from "./components/HalloFunc";
import { Counter } from "./components/Counter";

export function App() {
  return (
    <div id="app">
      <h2>App</h2>
      <Hello />
      <HalloFunc />
      <Counter />
    </div>
  );
}
