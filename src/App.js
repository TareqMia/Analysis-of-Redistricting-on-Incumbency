import React, { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import Table from "./components/Tables"

const App = () => {
  const [currentState, setCurrentState] = useState("");
  return (
    <div className="App">
      <Map currentState={currentState} setCurrentState={setCurrentState} />
      <Table currentState={currentState} setCurrentState={setCurrentState} />
    </div>
  );
};

export default App;
