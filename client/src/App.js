import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import Table from "./components/Table";
import DistrictPlanSelector from "./components/DistrictPlanSelector";
import District from "./components/District";
import { GlobalStoreContextProvider } from "./store";
import GlobalStoreContext from "./store";

const App = () => {
  const { store } = useContext(GlobalStoreContext);

  const districtPlans = {
    2022: "2022",
    2020: "2020",
    random: "random",
  };

  const [selectedPlan, setSelectedPlan] = useState(districtPlans[2022]);

  const [imag, setImag] = useState("");
  const [seats, setSeats] = useState("");
  const [count, setCount] = useState(0);

  function openTab(event, tabName) {
    var i, tabcontent, tablinks;
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
  }

  // useEffect(() => {
  //   if (store && store.currentState === "FL") {
  //     setImag(
  //       "https://media.discordapp.net/attachments/1080353490171346954/1080779222857031751/florida.png"
  //     );
  //     setSeats(
  //       "https://cdn.discordapp.com/attachments/1080353490171346954/1080772506782269552/image.png"
  //     );
  //     setCount(23);
  //   }
  //   if (store && store.currentState === "GA") {
  //     setImag(
  //       "https://media.discordapp.net/attachments/1080353490171346954/1080779222617948160/georgia.png"
  //     );
  //     setSeats(
  //       "https://cdn.discordapp.com/attachments/1080353490171346954/1080774201578885200/image.png"
  //     );
  //     setCount(13);
  //   }
  //   if (store && store.currentState === "PA") {
  //     setImag(
  //       "https://media.discordapp.net/attachments/1080353490171346954/1080779222425018409/pennsylvania.png"
  //     );
  //     setSeats(
  //       "https://cdn.discordapp.com/attachments/1080353490171346954/1080773577260937266/image.png"
  //     );
  //     setCount(16);
  //   }
  // }, []);

  return (
    <GlobalStoreContextProvider value={{ store }}>
      <div className="App">
        <Map
          currentState={store ? store.currentState : null}
          setCurrentState={store ? store.setCurrentState : ""}
          currentDistrict={store ? store.currentDistrict : ""}
          showIncumbents={store ? store.showIncumbents : false}
        />
        <DistrictPlanSelector
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          districtPlans={districtPlans}
        />

        <div style={{ height: "100vh", overflow: "auto" }}>
          <div className="data">
            <div className="tab">
              <button
                className="tablinks"
                display="none"
                onClick={(event) => openTab(event, "winners-tab")}
              >
                District Winners
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
              <District
                currentState={store ? store.currentState : ""}
                currentDistrict={store ? store.currentDistrict : ""}
              />
            </div>

            <div id="ensemble-tab" className="tabcontent">
              <div className="ensemble">
                <h3>Ensemble Information & Prediction</h3>
                <strong>Number of District Plans: </strong> 10000 <br />
                <strong>Number of Incumbents: </strong> {count} <br />
                <strong>Number of Incumbents Predicted to Win: </strong>{" "}
                {count - 1} <br />
                <img
                  src={imag}
                  alt="Ensemble Box and Whiskers"
                  style={{ width: "600px" }}
                />{" "}
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
