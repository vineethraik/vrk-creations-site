import "./App.css";
import BuildingState from "./common/BuildingState/BuildingState";
import { buildingStateConstants } from "./constants/stringConstants";

function App() {
  return (
    <>
      <BuildingState
        textData={buildingStateConstants.TEXTS.CODE}
        loadingText={buildingStateConstants.LOADING_TEXT.CODE}
      />
    </>
  );
}

export default App;
