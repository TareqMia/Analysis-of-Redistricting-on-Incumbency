import { createContext, useState, useReducer } from "react";
import flDemo from "../json/demo-data/Florida-Demographic.json";
import gaDemo from "../json/demo-data/Georgia-Demographic.json";
import paDemo from "../json/demo-data/Pennslyvania-Demographic.json";
import flWinners from "../json/districts-winners/Florida-District-Winners-2022.json";
import gaWinners from "../json/districts-winners/Georgia-District-Winners-2022.json";
import paWinners from "../json/districts-winners/Pennslyvania-District-Winners-2022.json";
import floridaOutline from "../json/fl-state_outline.json";
import georgiaOutline from "../json/ga-state_outline.json";
import pennsylvaniaOutline from "../json/pa-state_outline.json";

import florida_2022 from "../json/florida.json";
import georgia_2022 from "../json/georgia.json";
import pennsylvania_2022 from "../json/pennsylvania.json";

import florida_2020 from "../json/2020-district_plans/florida-2020.json";
import georgia_2020 from "../json/2020-district_plans/georgia-2020.json";
import pennsylvania_2020 from "../json/2020-district_plans/pennslyvania-2020.json";

import florida_districts from "../json/districts-winners/Florida-District-Winners-2022.json";
import georgia_districts from "../json/districts-winners/Georgia-District-Winners-2022.json";
import pennsylvania_districts from "../json/districts-winners/Pennslyvania-District-Winners-2022.json";

import florida_incumbents from "../json/incumbent-2022/Florida-Incumbent-2022.json";
import georgia_incumbents from "../json/incumbent-2022/Georgia-Incumbent-2022.json";
import pennsylvania_incumbents from "../json/incumbent-2022/Pennslyvania-Incumbent-2022.json";
import api from "./store-request-api";

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
  SET_STATE: "SET_STATE",
  SET_DISTRICT: "SET_DISTRICT",
  SHOW_INCUMBENTS: "SHOW_INCUMBENTS",
  SET_GEOJSON: "SET_GEOJSON",
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
        case GlobalStoreActionType.SHOW_INCUMBENTS: {
          return {
            ...state,
            showIncumbents: action.payload.showIncumbents,
          };
        }
        case GlobalStoreActionType.SET_GEOJSON: {
          return {
            ...state,
            geojson: action.payload.geojson,
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
    }
  );

  store.setState = (state) => {
    console.log(state);
    let districts = store.getDistricts(state);

    // let data = store.fetchGeojson(state).then((data) => {
    //   return data;
    // });
    dispatch({
      type: GlobalStoreActionType.SET_STATE,
      payload: {
        state: state,
        districts: districts,
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

  store.setShowIncumbents = (value) => {
    // fetch incumbents data

    dispatch({
      type: GlobalStoreActionType.SHOW_INCUMBENTS,
      payload: {
        showIncumbents: value,
      },
    });
  };

  store.fetchGeojson = (state) => {
    const asyncFetchGeojson = async (state) => {
      try {
        const response = await api.getMapGeoJson(state);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    return asyncFetchGeojson(state);
  };

  store.getDistricts = (state) => {
    const asyncGetDistricts = async (state) => {
      try {
        const response = await api.getDistricts(state);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    asyncGetDistricts(state);
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
