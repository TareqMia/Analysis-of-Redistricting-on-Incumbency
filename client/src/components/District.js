import React, { useState, useEffect, useContext } from "react";
import flDemo from "../json/demo-data/Florida-Demographic.json";
import gaDemo from "../json/demo-data/Georgia-Demographic.json";
import paDemo from "../json/demo-data/Pennslyvania-Demographic.json";
import flWinners from "../json/districts-winners/Florida-District-Winners-2022.json";
import gaWinners from "../json/districts-winners/Georgia-District-Winners-2022.json";
import paWinners from "../json/districts-winners/Pennslyvania-District-Winners-2022.json";
import GlobalStoreContext from "../store";
import PieChart from "./PieChart";

const District = () => {
  const [data, setData] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const { store } = useContext(GlobalStoreContext);

  // useEffect(() => {
  //   if (store.districts && store.districts.length !== 0) {
  //     setData(store.districts[store.currentDistrict - 1]);
  //   }
  // }, [store.districts, store.currentDistrict]);

  let pieData = data &&
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
        value: data.demographicSummary.ASAIN,
      },
      {
        label: "Native Hawaiian and Other Pacific Islander",
        value: data.demographicSummary.PACIFIC_ISLANDER,
      },
      {
        label: "Other",
        value: data.demographicSummary.OTHER,
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
          <strong>2022 Congressional Result:</strong> {data ? data.party : ""}
          <br />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <PieChart data={pieData} />
          </div>
        </div>
      )}
    </>
  );
};

export default District;
