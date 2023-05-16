import React, { useState } from "react";
import BoxPlot from "./BoxPlot";
import geoBox from "../json/FL_geo_box.json";
import popBox from "../json/FL_pop_box.json";
import { Button, ButtonGroup } from "semantic-ui-react";

const EnsembleInformation = ({ ensemble }) => {
  const [selectedPlot, setSelectedPlot] = useState("geographic");

  const handleToggle = (plotType) => {
    setSelectedPlot(plotType);
  };

  console.log(ensemble);

  return (
    <div className="ensemble">
      <h3>Ensemble Information & Prediction</h3>
      <strong>Number of District Plans: </strong>
      {ensemble.numDistrictPlans} <br />
      <strong>Number of Incumbents: </strong>
      {ensemble.numIncumbents} <br />
      <strong>Number of Incumbents Predicted to Win: </strong>
      {ensemble.numPredictedWinners} <br />
      <strong>Average Population Variation: </strong>
      {ensemble.avgPopulationVariation.toFixed(4)} <br />
      <strong>Average Geographic Variation: </strong>
      {ensemble.avgGeographicVariation.toFixed(4)} <br />
      {/* Toggle buttons */}
      <br />
      <div className="toggle-buttons">
        <ButtonGroup>
          <Button
            onClick={() => handleToggle("geographic")}
            positive={selectedPlot === "geographic"}
          >
            Geographic Variation
          </Button>
          <div className="or"></div>
          <Button
            onClick={() => handleToggle("population")}
            positive={selectedPlot === "population"}
          >
            Population Variation
          </Button>
        </ButtonGroup>
      </div>
      {/* Render the selected box plot */}
      {selectedPlot === "geographic" ? (
        <BoxPlot data={geoBox} />
      ) : (
        <BoxPlot data={popBox} />
      )}
    </div>
  );
};

export default EnsembleInformation;
