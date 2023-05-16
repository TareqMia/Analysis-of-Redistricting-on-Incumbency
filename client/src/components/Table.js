import React, { useRef, useEffect, useState, useContext } from "react";
import GlobalStoreContext from "../store";
import { Checkbox } from "semantic-ui-react";

const Table = () => {
  const { store } = useContext(GlobalStoreContext);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showIncumbentsOnly, setShowIncumbentsOnly] = useState(false);
  const pageSize = 20; // number of rows per page

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

  const numPages = Math.ceil(data.length / pageSize);

  const handleNextPage = () => {
    setCurrentPage((old) => Math.min(old + 1, numPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((old) => Math.max(old - 1, 0));
  };

  useEffect(() => {}, [showIncumbentsOnly]);

  return (
    <>
      {store.currentState && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div
            className="incumbents ui"
            style={{
              height: "700px",
              overflow: "visible",
              width: "45vw",
              marginBottom: "0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Checkbox
                toggle
                onChange={() => setShowIncumbentsOnly(!showIncumbentsOnly)}
              />
              <p>Incumbents Only</p>
            </div>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>District</th>
                  <th style={{ width: "20%" }}>Name</th>
                  <th style={{ width: "10%" }}>Party</th>
                  <th style={{ width: "15%" }}>Election Result</th>
                  <th style={{ width: "20%" }}>Geographic Variation (%)</th>
                  <th style={{ width: "25%" }}>Population Variation (%)</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((district) =>
                    showIncumbentsOnly ? district.incumbent : true
                  )
                  .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                  .map((district, key) => {
                    let color = district.party === "DEM" ? "blue" : "red";
                    let isHighlighted =
                      store.currentDistrict ===
                      parseInt(district.districtNumber);
                    return (
                      <tr
                        key={key}
                        onClick={() =>
                          handleRowClicked(district.districtNumber)
                        }
                        style={{
                          background: isHighlighted ? "#D3D3D3" : "transparent",
                        }}
                      >
                        <td>{district.districtNumber}</td>
                        <td>
                          {district.incumbent
                            ? district.incumbent
                            : district.winner}
                        </td>
                        <td style={{ color: color }}>
                          {district.party === "REP" ? "Rep" : "Dem"}
                        </td>
                        <td>
                          {district.incumbent === district.winner
                            ? "Won"
                            : "Lost"}
                        </td>
                        <td>{district.geographicVariation}</td>
                        <td>{district.populationVariation}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div style={{ flexShrink: "0", paddingTop: "0", marginTop: "0" }}>
            <button
              className="ui button"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className="ui button"
              onClick={handleNextPage}
              disabled={currentPage === numPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
