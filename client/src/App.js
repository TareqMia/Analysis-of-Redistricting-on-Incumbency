import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import Table from "./components/Table";
import DistrictPlanSelector from "./components/DistrictPlanSelector";
import District from "./components/District";
import { GlobalStoreContextProvider } from "./store";
import GlobalStoreContext from "./store";
import BoxPlot from "./components/BoxPlot";
import FL_ensemble from "./json/FL_ensemble.json";

import geoBox from "./json/FL_geo_box.json";
import EnsembleInformation from "./components/EnsembleInformation";

const flSafeSeat = [
  {incumbent: "Incumbents", DEM: 6, REP: 16, demSafeSeats: 2, repSafeSeats: 4},
  {incumbent: "Non-Incumbents", DEM: 2, REP: 4, demSafeSeats: 1, repSafeSeats: 0}
]
const App = () => {
  const { store } = useContext(GlobalStoreContext);

  const districtPlans = {
    2022: "CURRENT",
    2020: "PREVIOUS",
    SEAWULF: "SEAWULF",
  };

  console.log(FL_ensemble);

  const [selectedPlan, setSelectedPlan] = useState(districtPlans[2022]);

  const [imag, setImag] = useState("");
  const [seats, setSeats] = useState("");
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState("winners-tab");

  useEffect(() => {
    console.log(store);
  }, [store.ensemble]);

  const openTab = (event, tabName) => {
    let i, tabcontent, tablinks;

    if (tabName === "ensemble-tab") {
      setActiveTab(tabName);
    }
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
  };

  function transformObject(input) {
    return {
      group: input.category,
      min: input.min,
      q1: input.lowerQuartile,
      median: input.median,
      q3: input.upperQuartile,
      max: input.max,
    };
  }

  const boxAndWhiskerData =
    store && store.ensemble
      ? store.ensemble.boxAndWhiskerData.map(transformObject)
      : [];

  return (
    <GlobalStoreContextProvider value={{ store }}>
      <div className="App">
        <Map store={store} />
        <DistrictPlanSelector
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          districtPlans={districtPlans}
        />
        <div
          className="data-container hide-scrollbar"
          style={{ height: "100vh", overflow: "auto" }}
        >
          <div className="data">
            <div className="tab">
              <button
                className="tablinks active"
                display="none"
                onClick={(event) => openTab(event, "winners-tab")}
              >
                Incumbents
              </button>
              <button
                id="dist-tab"
                className="tablinks"
                display="none"
                onClick={(event) => openTab(event, "district-tab")}
              >
                District Details
              </button>
              <button
                className="tablinks"
                display="none"
                onClick={(event) => openTab(event, "ensemble-tab")}
              >
                Ensemble Information
              </button>

              <button
                className="tablinks"
                display="none"
                onClick={(event) => openTab(event, "incumbent-tab")}
              >
                Incumbents vs. Open Seats
              </button>
            </div>

            <div id="winners-tab" className="tabcontent">
              <Table currentState={store ? store.currentState : ""} />
            </div>

            <div id="district-tab" className="tabcontent">
              <District />
            </div>

            <div id="ensemble-tab" className="tabcontent">
              {/* <div className="ensemble">
                <h3>Ensemble Information & Prediction</h3>
                <strong>Number of District Plans: </strong>{" "}
                {FL_ensemble[0].ensemble.numDistrictPlans} <br />
                <strong>Number of Incumbents: </strong>{" "}
                {FL_ensemble[0].ensemble.numIncumbents} <br />
                <strong>Number of Incumbents Predicted to Win: </strong>
                {FL_ensemble[0].ensemble.numPredictedWinners} <br />
                <strong>Average Population Variation: </strong>
                {FL_ensemble[0].ensemble.avgPopulationVariation.toFixed(4)}{" "}
                <br />
                <strong>Average Geographic Variation: </strong>
                {FL_ensemble[0].ensemble.avgGeographicVariation.toFixed(4)}{" "}
                <BoxPlot data={geoBox} />
              </div> */}
              <EnsembleInformation ensemble={FL_ensemble[0].ensemble} />
            </div>

            <div id="incumbent-tab" className="tabcontent">
              <div className="ensemble">
              <table className="ui celled table">
                <tr>
                  <th>Seat Holders</th>
                  <th>Democrat Winners</th>
                  <th>Republican Winners</th>
                  <th>Democrat Safe Seats</th>
                  <th>Republican Safe Seats</th>
                </tr>
                {flSafeSeat.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.incumbent}</td>
                      <td>{val.DEM}</td>
                      <td>{val.REP}</td>
                      <td>{val.demSafeSeats}</td>
                      <td>{val.repSafeSeats}</td>
                    </tr>
                  )
                })}
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalStoreContextProvider>
  );
};

export default App;
