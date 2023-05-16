import React, { useContext, useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import Table from "./components/Table";
import DistrictPlanSelector from "./components/DistrictPlanSelector";
import District from "./components/District";
import { GlobalStoreContextProvider } from "./store";
import GlobalStoreContext from "./store";
import BoxAndWhiskersPlot from "./components/BoxAndWhiskersPlot";

const App = () => {
  const { store } = useContext(GlobalStoreContext);

  const districtPlans = {
    2022: "CURRENT",
    2020: "PREVIOUS",
    SEAWULF: "SEAWULF",
  };

  const [selectedPlan, setSelectedPlan] = useState(districtPlans[2022]);

  const [imag, setImag] = useState("");
  const [seats, setSeats] = useState("");
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState("winners-tab");

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
              <div className="ensemble">
                <h3>Ensemble Information & Prediction</h3>
                <strong>Number of District Plans: </strong>{" "}
                {store && store.ensemble ? store.ensemble.numDistrictPlans : ""}{" "}
                <br />
                <strong>Number of Incumbents: </strong>{" "}
                {store && store.ensemble ? store.ensemble.numIncumbents : ""}{" "}
                <br />
                <strong>Number of Incumbents Predicted to Win: </strong>
                {store && store.ensemble
                  ? store.ensemble.numPredictedWinners
                  : ""}{" "}
                <br />
                <strong>
                  Average Population Variation:{" "}
                  {store && store.ensemble
                    ? store.ensemble.avgPopulationVariation
                    : ""}{" "}
                </strong>
                <br />
                <strong>
                  Average Geographic Variation:{" "}
                  {store && store.ensemble
                    ? store.ensemble.avgGeographicVariation
                    : ""}{" "}
                </strong>
                <BoxAndWhiskersPlot
                  data={
                    store && store.ensemble
                      ? store.ensemble.boxAndWhiskerData
                      : []
                  }
                />
              </div>
            </div>

            <div id="incumbent-tab" className="tabcontent">
              <div className="ensemble">
                <img src={seats} alt="Open Seats" style={{ width: "500px" }} />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalStoreContextProvider>
  );
};

export default App;
