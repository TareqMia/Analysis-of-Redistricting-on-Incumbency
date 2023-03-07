import {createContext, useState} from 'react'
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

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    currentState : "currentState",
    currentDistrict: "currentDistrict",
    showIncumbents: "showIncumbents"
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        currentState: null,
        currentDistrict : null,
        showIncumbents: false
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
    switch (type) {
        case GlobalStoreActionType.currentState: {
            return setStore({
                currentState: payload.state,
                currentDistrict : null,
                showIncumbents: false
            })
        }
        case GlobalStoreActionType.currentDistrict: {
            return setStore({
                currentState: null,
                currentDistrict : payload.district,
                showIncumbents: false
            })
        }
        case GlobalStoreActionType.showIncumbents: {
            return setStore({
                currentState: null,
                currentDistrict : null,
                showIncumbents: true
            })
        }
        default:
            return store; 
    }}

    store.setState = (state) => {
        storeReducer({
            type: GlobalStoreActionType.SET_STATE,
            payload: {
                state: state
            }
        });
        console.log("tareq evelyn mia");
    }

    store.setDistrict = (district) => {
        storeReducer({
            type: GlobalStoreActionType.SET_DISTRICT,
            payload: {
                district: district
            }
        });
        console.log("MEI YO QIAN");
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };