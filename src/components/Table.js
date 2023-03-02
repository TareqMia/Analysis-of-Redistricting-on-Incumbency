import React, { useRef, useEffect, useState } from "react";
import flCandidates from "../json/incumbent-2022/Florida-Incumbent-2022.json";
import gaCandidates from "../json/incumbent-2022/Georgia-Incumbent-2022.json";
import paCandidates from "../json/incumbent-2022/Pennslyvania-Incumbent-2022.json";

const Table = ({ currentState }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (currentState === "florida") {
      setData(flCandidates);
    }
    if (currentState === "georgia") {
      setData(gaCandidates);
    }
    if (currentState === "pennsylvania") {
      setData(paCandidates);
    }

    if (currentState === null) {
      setData([]);
    }
  }, [currentState]);

  return (
    <div className="incumbents">
      <table className="ui celled table">
        <tr>
          <th>Name</th>
          <th>Party</th>
          <th>Election Result</th>
          <th>District</th>
          <th>Political Affiliation</th>
          <th>Geographic Variation</th>
          <th>Population Variation</th>
        </tr>
        {data.map((val, key) => {
          // console.log(val);
          let color = val.Party === "DEM" ? "blue" : "red";
          return (
            <tr key={key}>
              <td>{val.Candidate}</td>
              <td style={{ color: color }}>{val.Party}</td>
              <td>{val["Primary Outcome"]}</td>
              <td>{val.District}</td>
              <td>{val.State}</td>
              <td>{(Math.random() + 0.3).toFixed(1)}</td>
              <td>{(Math.random()*500 - 100).toFixed(1)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;