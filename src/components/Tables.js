import React, { useRef, useEffect, useState } from "react";
import flHouse22 from '../json/winners/flHouse2022.json';
import flSenate22 from '../json/winners/flSenate2022.json';
import gaHouse22 from '../json/winners/gaHouse2022.json';
import geSenate22 from '../json/winners/gaSenate2022.json';


const Table = ({ currentState, setCurrentState }) => {
   const [data, setData] = useState(flHouse22.results);

  //  useEffect(() => {
  //   if (currentState === "florida") {
  //     setData(flHouse22);
  //   }
  // }, [currentState]);

   return(
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
          )
        })}
      </table>
    </div>
   );
}

export default Table