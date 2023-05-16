import { createContext, useState, useReducer } from "react";
import api from "./store-request-api";

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
  SET_STATE: "SET_STATE",
  SET_DISTRICT: "SET_DISTRICT",
  SHOW_INCUMBENTS: "SHOW_INCUMBENTS",
  SET_DISTRICT_PLAN: "SET_DISTRICT_PLAN",
  SET_ENSEMBLE: "SET_ENSEMBLE",
  GET_STATES: "GET_STATES",
  SET_DISTRICTS: "SET_DISTRICTS",
  SET_PLAN_TYPE: "SET_PLAN_TYPE",
  SET_PLAN_NAME: "SET_PLAN_NAME",
};

function GlobalStoreContextProvider(props) {
  const [store, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case GlobalStoreActionType.SET_STATE: {
          return {
            ...state,
            currentState: action.payload.state,
            geoJson: action.payload.geoJson,
          };
        }
        case GlobalStoreActionType.SET_DISTRICT: {
          return {
            ...state,
            currentDistrict: action.payload.district,
          };
        }
        case GlobalStoreActionType.SET_DISTRICTS: {
          return {
            ...state,
            districts: action.payload,
          };
        }
        case GlobalStoreActionType.SHOW_INCUMBENTS: {
          return {
            ...state,
            showIncumbents: action.payload.showIncumbents,
          };
        }
        case GlobalStoreActionType.SET_DISTRICT_PLAN: {
          return {
            ...state,
            currentDistrictPlan: action.payload.districtPlan,
          };
        }
        case GlobalStoreActionType.SET_ENSEMBLE: {
          return {
            ...state,
            ensemble: action.payload.ensemble,
          };
        }
        case GlobalStoreActionType.GET_STATES: {
          return {
            ...state,
            states: action.payload.states,
          };
        }
        case GlobalStoreActionType.SET_PLAN_TYPE: {
          return {
            ...state,
            planType: action.payload,
          };
        }

        case GlobalStoreActionType.SET_PLAN_NAME: {
          return {
            ...state,
            planName: action.payload,
          };
        }
        default:
          return state;
      }
    },
    {
      currentState: null,
      currentDistrict: null,
      showIncumbents: false,
      districts: [],
      geoJson: null,
      planType: "CURRENT",
      currentDistrictPlan: null,
      ensemble: null,
      states: {},
      planName: "",
    }
  );

  store.setState = (state) => {
    dispatch({
      type: GlobalStoreActionType.SET_STATE,
      payload: {
        state: state,
        districts: null,
      },
    });
  };

  store.setDistrict = (district) => {
    dispatch({
      type: GlobalStoreActionType.SET_DISTRICT,
      payload: {
        district: district,
      },
    });
  };

  store.setDistricts = (districts) => {
    console.log(districts);
    dispatch({
      type: GlobalStoreActionType.SET_DISTRICTS,
      payload: districts,
    });
  };

  store.setDistrictPlan = (districtPlan) => {
    dispatch({
      type: GlobalStoreActionType.SET_DISTRICT_PLAN,
      payload: {
        districtPlan: districtPlan,
      },
    });
  };

  store.setEnsemble = (ensemble) => {
    dispatch({
      type: GlobalStoreActionType.SET_ENSEMBLE,
      payload: {
        ensemble: ensemble,
      },
    });
  };

  store.setShowIncumbents = (value) => {
    dispatch({
      type: GlobalStoreActionType.SHOW_INCUMBENTS,
      payload: {
        showIncumbents: value,
      },
    });
  };

  store.setPlanType = (planType) => {
    dispatch({
      type: GlobalStoreActionType.SET_PLAN_TYPE,
      payload: planType,
    });
  };

  store.setPlanName = (planName) => {
    dispatch({
      type: GlobalStoreActionType.SET_PLAN_NAME,
      payload: planName,
    });
  };

  store.getStates = async () => {
    const stateAbbreviations = ["FL", "GA", "PA"];
    const statePromises = stateAbbreviations.map((abbr) =>
      store.getState(abbr)
    );
    const stateData = await Promise.all(statePromises);

    const states = stateAbbreviations.reduce((acc, abbr, index) => {
      acc[abbr] = stateData[index];
      return acc;
    }, {});

    dispatch({
      type: GlobalStoreActionType.GET_STATES,
      payload: { states },
    });
  };

  store.getState = async (state) => {
    try {
      const response = await api.getState("FL");
      return response.data;
    } catch (error) {
      console.log("Error getting state: ", error);
    }
  };

  store.getStateOutline = async (state) => {
    try {
      const response = await api.getStateOutline(state);
      return response;
    } catch (error) {
      console.log("Error getting state outline:", error);
    }
  };

  store.getDistrictPlan = async (state, planType) => {
    try {
      const response = await api.getDistrictPlan(state, planType);
      return response;
    } catch (error) {
      console.log("Error getting state outline:", error);
    }
  };

  store.getEnsemble = async (state) => {
    console.log(store.currentState);
    try {
      const response = await api.getEnsemble("FL");
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error getting ensemble: ", error);
    }
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
