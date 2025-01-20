import Router from "container/Router/Router";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./state/store.js";

function App() {
  return (
    <Provider store={store}>
      <Router className={"theme__light"} />
    </Provider>
  );
}

export default App;
