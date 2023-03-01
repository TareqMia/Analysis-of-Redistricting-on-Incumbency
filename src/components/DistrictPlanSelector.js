import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

const DistrictPlanSelector = ({
  selectedPlan,
  setSelectedPlan,
  districtPlans,
}) => {
  const handlePlanSelection = (plan) => {
    setSelectedPlan(districtPlans[plan]);
  };

  console.log(selectedPlan);

  return (
    // <div className="button-group">
    //   <button
    //     className="ui button blue"
    //     onClick={() => handlePlanSelection(2022)}
    //   >
    //     2022
    //   </button>
    //   <button
    //     className="ui button blue"
    //     onClick={() => handlePlanSelection(2020)}
    //   >
    //     2020
    //   </button>
    //   <button
    //     className="ui button blue"
    //     onClick={() => handlePlanSelection("random")}
    //   >
    //     Random
    //   </button>
    // </div>
    <Button.Group className="button-group">
      <Button
        onClick={() => handlePlanSelection("2020")}
        active={selectedPlan === "2020"}
      >
        2020
      </Button>
      <Button
        onClick={() => handlePlanSelection("2022")}
        active={selectedPlan === "2022"}
      >
        2022
      </Button>
      <Button
        onClick={() => handlePlanSelection("random")}
        active={selectedPlan === "random"}
      >
        Random
      </Button>
    </Button.Group>
  );
};

export default DistrictPlanSelector;
