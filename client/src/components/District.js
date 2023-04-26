import React, { Component, useState, useEffect, useContext } from "react";
import flDemo from "../json/demo-data/Florida-Demographic.json";
import gaDemo from "../json/demo-data/Georgia-Demographic.json";
import paDemo from "../json/demo-data/Pennslyvania-Demographic.json";
import flWinners from "../json/districts-winners/Florida-District-Winners-2022.json";
import gaWinners from "../json/districts-winners/Georgia-District-Winners-2022.json";
import paWinners from "../json/districts-winners/Pennslyvania-District-Winners-2022.json";
import GlobalStoreContext from "../store";
import PieChart from "./PieChar";

const District = ({ currentState, currentDistrict }) => {
  const [data, setData] = useState([]);
  const [dist, setDist] = useState(0);
  const [candidates, setCandidates] = useState([]);

  const { store } = useContext(GlobalStoreContext);

  const pieData = [
    { label: "White", value: 50 },
    { label: "Black or African American", value: 10 },
    { label: "American Indian and Alaska Native", value: 10 },
    { label: "Asian", value: 10 },
    { label: "Native Hawaiian and Other Pacific Islander", value: 10 },
    { label: "Other", value: 10 },
  ];

    if (store && store.currentDistrict && store.currentState && data) {
  
    if (store.currentDistrict.properties.DISTRICT) {
      // console.log(data[store.currentDistrict.properties.DISTRICT].White);
      pieData = [
        { label: "White", value: data[store.currentDistrict.properties.DISTRICT].White },
        { label: "Black or African American", value: data[store.currentDistrict.properties.DISTRICT]["Black or African American"] },
        { label: "American Indian and Alaska Native", value: data[store.currentDistrict.properties.DISTRICT]["American Indian and Alaska Native"] },
        { label: "Asian", value: data[store.currentDistrict.properties.DISTRICT].Asian },
        { label: "Native Hawaiian and Other Pacific Islander", value: data[store.currentDistrict.properties.DISTRICT]["Native Hawaiian and Other Pacific Islander"] },
        { label: "Other", value: data[store.currentDistrict.properties.DISTRICT].Other },
      ]
    }
    // console.log(data[store.currentDistrict.properties.DISTRICT].White);
  }


  useEffect(() => {
    if (store.currentState === "FL") {
      setData(flDemo);
      if (store.currentDistrict !== null) {
        setCandidates(flWinners);
      }
    }
    if (store.currentState === "GA") {
      setData(gaDemo);
      if (store.currentDistrict !== null) {
        setCandidates(gaWinners);
      }
    }
    if (store.currentState === "PA") {
      setData(paDemo);
      if (store.currentDistrict !== null) {
        setCandidates(paWinners);
      }
    }

    if (store.currentState === "") {
      setData([]);
    }
  }, [store.currentState]);

  useEffect(() => {
    if (store.currentDistrict && store.currentState === "FL") {
      setCandidates(
        flWinners[parseInt(store.currentDistrict.properties.DISTRICT) - 1]
      );
    }
    if (store.currentDistrict && store.currentState === "GA") {
      setCandidates(
        gaWinners[parseInt(store.currentDistrict.properties.DISTRICT) - 1]
      );
    }
    if (store.currentDistrict && store.currentState === "PA") {
      setCandidates(
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
          <strong>Winner:</strong> {candidates ? candidates.Candidate : ""}
          <br />
          <strong>2022 Congressional Result:</strong>{" "}
          {candidates ? candidates.Party : ""}
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
          <PieChart data={pieData} />
        </div>
      )}
    </>
  );
};

export default District;
