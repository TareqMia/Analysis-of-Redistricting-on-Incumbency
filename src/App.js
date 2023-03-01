import React, { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import Table from "./components/Table";

const App = () => {
  const [currentState, setCurrentState] = useState("");
  const [currentDistrict, setCurrentDistrict] = useState(null);
  return (
    <div className="App">
      <Map
        currentState={currentState}
        setCurrentState={setCurrentState}
        currentDistrict={currentDistrict}
        setCurrentDistrict={setCurrentDistrict}
      />
      {currentState && (
        <Table currentState={currentState} setCurrentState={setCurrentState} />
      )}
    </div>
  );
};

export default App;
