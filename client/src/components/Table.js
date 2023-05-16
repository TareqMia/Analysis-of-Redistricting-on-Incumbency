import React, { useRef, useEffect, useState, useContext } from "react";
import GlobalStoreContext from "../store";

const Table = () => {
  const { store } = useContext(GlobalStoreContext);
  const [data, setData] = useState([]);

  const handleRowClicked = (districtNum) => {
    store.setDistrict(parseInt(districtNum));
  };

  useEffect(() => {
    if (store.districts && store.districts.length !== 0) {
      setData(store.districts);
    }
  }, [store.districts]);

  if (store) {
    if (store.currentDistrict) {
      if (store.currentDistrict) {
        document.getElementById("dist-tab").style.display = "block";
      } else {
        document.getElementById("dist-tab").style.display = "none";
      }
    }
  }

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
                <th>Geographic Variation</th>
                <th>Population Variation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((district, key) => {
                let color = district.party === "DEM" ? "blue" : "red";

                let isHighlighted =
                  store.currentDistrict === parseInt(district.districtNumber);
                return district.incumbent ? (
                  <tr
                    key={key}
                    onClick={() => handleRowClicked(district.districtNumber)}
                    style={{
                      background: isHighlighted ? "#FFFF8A" : "transparent",
                    }}
                  >
                    <td>{district.incumbent}</td>
                    <td style={{ color: color }}>{district.party}</td>
                    <td>
                      {district.incumbent === district.winner ? "Won" : "Lost"}
                    </td>
                    <td>{district.districtNumber}</td>
                    <td>{district.geographicVariation}</td>
                    <td>{district.populationVariation}</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
