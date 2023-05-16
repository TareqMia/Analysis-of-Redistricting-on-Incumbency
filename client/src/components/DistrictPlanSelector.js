import React, { useState, useEffect, useContext } from "react";
import { Button, Dropdown } from "semantic-ui-react";
import GlobalStoreContext from "../store";

const DistrictPlanSelector = ({
  selectedPlan,
  setSelectedPlan,
  districtPlans,
}) => {
  const { store } = useContext(GlobalStoreContext);
  const [randomPlanNames, setRandomPlanNames] = useState([]);

  const handlePlanSelection = (plan) => {
    console.log(plan);
    store.setPlanType(districtPlans[plan]);
    setSelectedPlan(districtPlans[plan]);
  };

  console.log(store.planName);
  console.log(store.planType);

  useEffect(() => {
    if (store.states && store.states.FL && store.states.FL.districtPlans) {
      let seawulfPlans = store.states.FL.districtPlans
        .filter((plan) => plan.planType === "SEAWULF")
        .map((plan) => plan.planName); // Extracting only the planName
      setRandomPlanNames(seawulfPlans);
    }
  }, [store.states, store.planType, store.planName]);

  return (
    <Button.Group className="button-group">
      <Button
        onClick={() => handlePlanSelection("2020")}
        active={selectedPlan === "PREVIOUS"}
      >
        2020
      </Button>
      <Button
        onClick={() => handlePlanSelection("2022")}
        active={selectedPlan === "CURRENT"}
      >
        2022
      </Button>
      <Dropdown
        text="Random"
        floating
        button
        className="icon"
        active={store.planType === "SEAWULF"}
      >
        <Dropdown.Menu>
          {randomPlanNames.map((planName) => (
            <Dropdown.Item
              key={planName}
              onClick={() => {
                store.setPlanType("SEAWULF");
                store.setPlanName(planName);
                handlePlanSelection("SEAWULF");
              }}
              active={selectedPlan === planName}
            >
              {planName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Button.Group>
  );
};

export default DistrictPlanSelector;
