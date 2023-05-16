import React, { useState, useEffect, useContext } from "react";
import GlobalStoreContext from "../store";

const District = () => {
  const [data, setData] = useState([]);

  const { store } = useContext(GlobalStoreContext);

  console.log(data);

  useEffect(() => {
    if (store.districts && store.districts.length !== 0) {
      setData(store.districts[store.currentDistrict - 1]);
    }
  }, [store.districts, store.currentDistrict]);

  let tableData = data &&
    data.demographicSummary && [
      {
        label: "White",
        value: data.demographicSummary.WHITE,
      },
      {
        label: "Black or African American",
        value: data.demographicSummary.BLACK,
      },
      {
        label: "American Indian and Alaska Native",
        value: data.demographicSummary.NATIVE,
      },
      {
        label: "Asian",
        value: data.demographicSummary.ASIAN,
      },
      {
        label: "Native Hawaiian and Other Pacific Islander",
        value: data.demographicSummary.PACIFIC_ISLANDER,
      },
      {
        label: "Other",
        value: data.demographicSummary.OTHER,
      },
      {
        label: "Hispanic",
        value: data.demographicSummary.HISPANIC,
      },
      {
        label: "Two Or More",
        value: data.demographicSummary.TWO,
      },
    ];

  return (
    <>
      {store.currentState && store.currentDistrict && (
        <div className="district">
          <h3>
            <strong>District Details</strong>
          </h3>
          <strong>District:</strong>{" "}
          {store.currentDistrict ? `${store.currentDistrict}` : ""}
          <br />
          <strong>Winner:</strong> {data ? data.winner : ""}
          <br />
          <strong>Party:</strong>{" "}
          {data && data.party === "REP" ? "Republican" : "Democrat"}
          <br />
          {tableData && (
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.label}</td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default District;
