import React, { Component, useState, useEffect, useContext } from "react";
import flDemo from "../json/demo-data/Florida-Demographic.json";
import gaDemo from "../json/demo-data/Georgia-Demographic.json";
import paDemo from "../json/demo-data/Pennslyvania-Demographic.json";
import flWinners from "../json/districts-winners/Florida-District-Winners-2022.json";
import gaWinners from "../json/districts-winners/Georgia-District-Winners-2022.json";
import paWinners from "../json/districts-winners/Pennslyvania-District-Winners-2022.json";
import GlobalStoreContext from "../store";

const District = ({ currentState, currentDistrict }) => {
  const [data, setData] = useState([]);
  const [dist, setDist] = useState(0);
  const [candid, setCandid] = useState([]);

  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
    if (store.currentState === "FL") {
      setData(flDemo);
      if (store.currentDistrict !== null) {
        setCandid(flWinners);
      }
    }
    if (store.currentState === "GA") {
      setData(gaDemo);
      if (store.currentDistrict !== null) {
        setCandid(gaWinners);
      }
    }
    if (store.currentState === "PA") {
      setData(paDemo);
      if (store.currentDistrict !== null) {
        setCandid(paWinners);
      }
    }

    if (store.currentState === "") {
      setData([]);
    }
  }, [store.currentState]);

  useEffect(() => {
    if (store.currentDistrict && store.currentState === "FL") {
      setCandid(
        flWinners[parseInt(store.currentDistrict.properties.DISTRICT) - 1]
      );
    }
    if (store.currentDistrict && store.currentState === "GA") {
      setCandid(
        gaWinners[parseInt(store.currentDistrict.properties.DISTRICT) - 1]
      );
    }
    if (store.currentDistrict && store.currentState === "PA") {
      setCandid(
        paWinners[parseInt(store.currentDistrict.properties.DISTRICT) - 1]
      );
    }
  }, [store.currentDistrict]);

  return (
    <>
      {store.currentState && store.currentDistrict && (
        <div className="district">
          <h3>
            <strong>District Details</strong>
          </h3>
          <strong>District:</strong>{" "}
          {store.currentDistrict
            ? `${store.currentDistrict.properties.DISTRICT}`
            : ""}
          <br />
          <strong>Winner:</strong> {candid ? candid.Candidate : ""}
          <br />
          <strong>2022 Congressional Result:</strong>{" "}
          {candid ? candid.Party : ""}
          <br />
          <table className="ui celled table">
            <tr>
              <th>Total Population</th>
              <th>% White</th>
              <th>% Black or African American</th>
              <th>% American Indian and Alaskan Native</th>
              <th>% Asian</th>
              <th>% Native Hawaiian and Other Pacific Islander</th>
              <th>% Other</th>
            </tr>
            {data.map((val, key) => {
              let total = val["Total Population"];
              if (
                store.currentDistrict &&
                val.District ===
                  parseInt(store.currentDistrict.properties.DISTRICT)
              ) {
                return (
                  <tr key={key}>
                    {/* <td>{val.District}</td> */}
                    <td>{total}</td>
                    <td>{((val.White / (total * 1.0)) * 100).toFixed(2)}</td>
                    <td>
                      {(
                        (val["Black or African American"] / (total * 1.0)) *
                        100
                      ).toFixed(2)}
                    </td>
                    <td>
                      {(
                        (val["American Indian and Alaska Native"] /
                          (total * 1.0)) *
                        100
                      ).toFixed(2)}
                    </td>
                    <td>{((val.Asian / (total * 1.0)) * 100).toFixed(2)}</td>
                    <td>
                      {(
                        (val["Native Hawaiian and Other Pacific Islander"] /
                          (total * 1.0)) *
                        100
                      ).toFixed(2)}
                    </td>
                    <td>{((val.Other / (total * 1.0)) * 100).toFixed(2)}</td>
                  </tr>
                );
              }
            })}
          </table>
        </div>
      )}
    </>
  );
};

export default District;
