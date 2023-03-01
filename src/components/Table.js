import React, { useRef, useEffect, useState } from "react";
import flHouse22 from "../json/winners/flHouse2022.json";
import gaHouse22 from "../json/winners/gaHouse2022.json";
import paHouse22 from "../json/winners/paHouse2022.json";
import flCandidates from "../json/candidates/FL2022_candidates.json";
import gaCandidates from "../json/candidates/GA2022_candidates.json";
import paCandidates from "../json/candidates/PA2022_candidates.json";

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
      <table>
        <tr>
          <th>Name</th>
          <th>Party</th>
          <th>Election Result</th>
          <th>District</th>
          <th>Political Affiliation</th>
          <th>Incumbency?</th>
          <th>Geographic Variation</th>
          <th>Population Variation</th>
        </tr>
        {data.map((val, key) => {
          // console.log(val);
          let color = val.Party === 'DEM' ? 'blue' : 'red';
          console.log(color);
          return (
            <tr key={key}>
              <td>{val.Candidate}</td>
              <td style={{color: color}}>{val.Party}</td>
              <td>{val['Primary Outcome']}</td>
              <td>{val.District}</td>
              <td>{val.State}</td>
              <td>{val.Incumbent}</td>
              <td>{val['Primary Votes']}</td>
              <td>{val['Primary %']}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
