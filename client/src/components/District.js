import React, { Component, useState, useEffect } from "react";
import flDemo from "../json/demo-data/Florida-Demographic.json";
import gaDemo from "../json/demo-data/Georgia-Demographic.json";
import paDemo from "../json/demo-data/Pennslyvania-Demographic.json";
import flWinners from "../json/districts-winners/Florida-District-Winners-2022.json";
import gaWinners from "../json/districts-winners/Georgia-District-Winners-2022.json";
import paWinners from "../json/districts-winners/Pennslyvania-District-Winners-2022.json";

const District = ({ currentState, currentDistrict }) => {
  const [data, setData] = useState([]);
  const [dist, setDist] = useState(0);
  const [candid, setCandid] = useState([]);

  useEffect(() => {
    if (currentState === "florida") {
      setData(flDemo);
      if (currentDistrict !== null) {
        setDist(parseInt(currentDistrict.properties.DISTRICT));
      }
    }
    if (currentState === "georgia") {
      setData(gaDemo);
      if (currentDistrict !== null) {
        setDist(parseInt(currentDistrict.properties.DISTRICT));
      }
    }
    if (currentState === "pennsylvania") {
      setData(paDemo);
      if (currentDistrict !== null) {
        setDist(parseInt(currentDistrict.properties.DISTRICT));
      }
    }

    if (currentState === null) {
      setData([]);
    }
  }, [currentState, currentDistrict]);

  useEffect(() => {
    if (dist && currentState === "florida") {
      setCandid(flWinners[dist - 1]);
    }
    if (dist && currentState === "georgia") {
      setCandid(gaWinners[dist - 1]);
    }
    if (dist && currentState === "pennsylvania") {
      setCandid(paWinners[dist - 1]);
    }
  }, [dist]);

  return (
    <div className="district">
      <h3>
        <strong>District Details</strong>
      </h3>
      <strong>District:</strong> {dist}
      <br />
      <strong>Winner:</strong> {candid.Candidate}
      <br />
      <strong>2022 Congressional Result:</strong> {candid.Party}
      <br />
      <table className="ui celled table">
        <tr>
          {/* <th>District</th> */}
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
          if (val.District === dist) {
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
                    (val["American Indian and Alaska Native"] / (total * 1.0)) *
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
  );
};

export default District;
