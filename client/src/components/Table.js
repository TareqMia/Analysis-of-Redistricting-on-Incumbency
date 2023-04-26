import React, { useRef, useEffect, useState, useContext } from "react";
import flCandidates from "../json/incumbent-2022/Florida-Incumbent-2022.json";
import gaCandidates from "../json/incumbent-2022/Georgia-Incumbent-2022.json";
import paCandidates from "../json/incumbent-2022/Pennslyvania-Incumbent-2022.json";
import GlobalStoreContext from "../store";

const Table = ({ currentState }) => {
  const [data, setData] = useState([]);
  const { store } = useContext(GlobalStoreContext);

  const handleRowClicked = (districtNum) => {
    store.setDistrict({
      properties: {
        DISTRICT: parseInt(districtNum),
      },
    });
  };

  // if (store.currentState != null) {
  //   let tablinks = document.getElementsByClassName("tablinks");
  //   for (var i = 0; i < tablinks.length; i++) {
  //     tablinks[i].style.display = "block";
  //   }
  // } else {
  //   let tablinks = document.getElementsByClassName("tablinks");
  //   for (var i = 0; i < tablinks.length; i++) {
  //     tablinks[i].style.display = "none";
  //   }
  // }

  if (store) {
    if (store.currentDistrict) {
      if (store.currentDistrict.properties.DISTRICT) {
        document.getElementById("dist-tab").style.display = "block";
      } else {
        document.getElementById("dist-tab").style.display = "none";
      }
    }
  }

  useEffect(() => {
    if (store.currentState === "FL") {
      setData(flCandidates);
    }
    if (store.currentState === "GA") {
      setData(gaCandidates);
    }
    if (store.currentState === "PA") {
      setData(paCandidates);
    }
    if (currentState === null) {
      setData([]);
    }
  }, [store.currentState]);

  return (
    <>
      {store.currentState && (
        <div className="incumbents ui">
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Party</th>
                <th>Election Result</th>
                <th>District</th>
                <th>Political Affiliation</th>
                <th>Geographic Variation</th>
                <th>Population Variation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, key) => {
                let color = val.Party === "DEM" ? "blue" : "red";

                let isHighlighted =
                  store.currentDistrict &&
                  store.currentDistrict.properties.DISTRICT ===
                    parseInt(val.District);
                return (
                  <tr
                    key={key}
                    onClick={() => handleRowClicked(val.District)}
                    style={{
                      background: isHighlighted ? "#FFFF8A" : "transparent",
                    }}
                  >
                    <td>{val.Candidate}</td>
                    <td style={{ color: color }}>{val.Party}</td>
                    <td>{val["Primary Outcome"]}</td>
                    <td>{val.District}</td>
                    <td>{val.State}</td>
                    <td>{(Math.random() + 0.3).toFixed(1)}</td>
                    <td>{(Math.random() * 500 - 100).toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
