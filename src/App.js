import React, { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import Table from "./components/Table";
import DistrictPlanSelector from "./components/DistrictPlanSelector";
import District from "./components/District"

const App = () => {
  const [currentState, setCurrentState] = useState("");
  const [currentDistrict, setCurrentDistrict] = useState(null);

  const districtPlans = {
    2022: "2022",
    2020: "2020",
    random: "random",
  };

  const [selectedPlan, setSelectedPlan] = useState(districtPlans[2022]);

  return (
    <div className="App">
      <Map
        currentState={currentState}
        setCurrentState={setCurrentState}
        currentDistrict={currentDistrict}
        setCurrentDistrict={setCurrentDistrict}
        selectedPlan={selectedPlan}
      />
      <DistrictPlanSelector
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        districtPlans={districtPlans}
      />
      <div className="data">
      {currentState && (
        <Table currentState={currentState} setCurrentState={setCurrentState} />
      )}
      {currentDistrict && (
      <District currentState={currentState} currentDistrict={currentDistrict}/>)}
      </div>
    </div>
  );
};

export default App;
