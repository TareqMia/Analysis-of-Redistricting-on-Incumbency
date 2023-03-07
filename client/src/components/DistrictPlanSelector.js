import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "semantic-ui-react";

const DistrictPlanSelector = ({
  selectedPlan,
  setSelectedPlan,
  districtPlans,
}) => {
  const handlePlanSelection = (plan) => {
    setSelectedPlan(districtPlans[plan]);
  };

  return (
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
      <Dropdown text="Random" floating button className="icon">
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => handlePlanSelection("random")}
            active={selectedPlan === "random"}
          >
            Random
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlePlanSelection("random")}
            active={selectedPlan === "random"}
          >
            Random2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlePlanSelection("random")}
            active={selectedPlan === "random"}
          >
            Random3
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Button.Group>
  );
};

export default DistrictPlanSelector;
