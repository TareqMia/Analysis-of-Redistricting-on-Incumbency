import React, { useRef, useEffect, useState } from "react";
import flHouse22 from "../json/winners/flHouse2022.json";
import gaHouse22 from "../json/winners/gaHouse2022.json";
import paHouse22 from "../json/winners/paHouse2022.json";

const Table = ({ currentState }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (currentState === "florida") {
      setData(flHouse22.results);
    }
    if (currentState === "georgia") {
      setData(gaHouse22.results);
    }
    if (currentState === "pennsylvania") {
      setData(paHouse22.results);
    }

    if (currentState === null) {
      setData([]);
    }
  }, [currentState]);

  return (
    <div className="incumbents">
      <table>
        <tr>
          <th>District</th>
          <th>Name</th>
          <th>Political Affiliation</th>
          <th>Election Result</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.district}</td>
              <td>{val.name}</td>
              <td>{val.party}</td>
              <td>{"W"}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
