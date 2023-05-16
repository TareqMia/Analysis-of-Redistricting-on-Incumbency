import React, { useRef, useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import GlobalStoreContext from "../store";

import florida_2022 from "../json/florida.json";
import georgia_2022 from "../json/georgia.json";
import pennsylvania_2022 from "../json/pennsylvania.json";

import florida_districts from "../json/districts-winners/Florida-District-Winners-2022.json";
import georgia_districts from "../json/districts-winners/Georgia-District-Winners-2022.json";
import pennsylvania_districts from "../json/districts-winners/Pennslyvania-District-Winners-2022.json";

import florida_incumbents from "../json/incumbent-2022/Florida-Incumbent-2022.json";
import georgia_incumbents from "../json/incumbent-2022/Georgia-Incumbent-2022.json";
import pennsylvania_incumbents from "../json/incumbent-2022/Pennslyvania-Incumbent-2022.json";

import randomPlan from "../json/output.json";

const Map = () => {
  const floridaRef = useRef();
  const georgiaRef = useRef();
  const pennsylvaniaRef = useRef();

  const { store } = useContext(GlobalStoreContext);

  const [florida, setFlorida] = useState(florida_2022);
  const [georgia, setGeorgia] = useState(georgia_2022);
  const [pennsylvania, setPennsylvania] = useState(pennsylvania_2022);

  const [floridaOutline, setFloridaOutline] = useState(null);
  const [georgiaOutline, setGeorgiaOutline] = useState(null);
  const [pennsylvaniaOutline, setPennsylvaniaOutline] = useState(null);

  useEffect(() => {
    store.getStates();
  }, []);

  useEffect(() => {
    const updateLayer = (layerRef, data) => {
      console.log(data);
      if (layerRef.current && data) {
        layerRef.current.clearLayers().addData(data);
      }
    };

    console.log(store);

    const states = ["FL"];
    const refs = { FL: floridaRef, GA: georgiaRef, PA: pennsylvaniaRef };

    if (!store.currentState) {
      states.forEach((state) => {
        if (store && store.states !== {} && store.states[state]) {
          let geoJson = store.states[state].districtPlans[0].geoJson;
          updateLayer(refs[state], geoJson);
        }
      });
    }

    if (store.currentState === "FL") {
      let plan = null;

      if (store.planType === "PREVIOUS") {
        plan = store.states.FL.districtPlans.find(
          (p) => p.planType === "PREVIOUS"
        );
        console.log(plan);

        updateLayer(floridaRef, plan.geoJson);
      }

      if (store.planType === "SEAWULF" && store.planName !== "") {
        plan = store.states.FL.districtPlans.find(
          (p) => p.planType === "SEAWULF" && p.planName === store.planName
        );
        console.log(plan.geoJson);

        // Now `geojson` is ready to be used in your map
        updateLayer(floridaRef, randomPlan);
      }

      if (store.planType === "CURRENT") {
        plan = store.states.FL.districtPlans.find(
          (p) => p.planType === "CURRENT"
        );
        if (!store.districts || store.districts.length === 0) {
          store.setDistricts(plan.districts);
        }

        updateLayer(floridaRef, plan.geoJson);
      }
    }
  }, [
    floridaRef,
    georgiaOutline,
    pennsylvaniaOutline,
    store.currentState,
    store.currentDistrict,
    store.states,
    store.districts,
    store.planType,
    store.planName,
  ]);

  const tileLayerOptions = {
    detectRetina: true,
    maxZoom: 20,
    maxNativeZoom: 17,
    minZoom: 3,
    noWrap: true,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  };

  const stateOptions = {
    style: {
      fillColor: "grey",
      fillOpacity: 0.5,
      color: "black",
      weight: 1,
    },
  };

  const handleFloridaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        if (!floridaRef.current) return;

        if (feature.geometry.type === "Polygon") {
          console.log(feature.properties.DISTRICT);
          store.setDistrict(feature.properties.DISTRICT);
        } else {
          store.setState("FL");
          store.setDistrict(null);

          const map = event.target._map;
          map.flyTo([27.8, -83.5], 7, {
            duration: 1.5,
            easeLinearity: 0.2,
          });

          layer.setStyle({
            fillColor: "white",
            fillOpacity: 0.5,
            color: "black",
            weight: 2,
          });
        }
      },
    });
  };

  const handleGeorgiaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        if (!georgiaRef.current) return;

        // setCurrentState("georgia");
        store.setState("GA");
        store.setDistrict(null);

        if (feature.geometry.type === "Polygon") {
          store.setDistrict(feature);
        }

        const map = event.target._map;
        map.flyTo([32.7, -83.2], 7, {
          duration: 1.5,
          easeLinearity: 0.2,
        });

        georgiaRef.current.clearLayers().addData(georgia);
      },
    });
  };

  const handlePennsylvaniaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        if (!pennsylvaniaRef) return;

        // setCurrentState("pennsylvania");
        store.setState("PA");
        store.setDistrict(null);

        if (feature.geometry.type === "Polygon") {
          store.setDistrict(feature);
        }

        const map = event.target._map;
        map.flyTo([41.203323, -77.194527], 7, {
          duration: 1.5,
          easeLinearity: 0.2,
        });
        pennsylvaniaRef.current.clearLayers().addData(pennsylvania);
      },
    });
  };

  const handleStateChange = (event) => {
    const state = event.target.value;

    console.log(state);

    if (!state) {
      store.setState("");

      const map = floridaRef.current.getLayers()[0]._map;
      map.flyTo([35, -81], 5, {
        duration: 1.5,
        easeLinearity: 0.2,
      });
    }

    if (state === "FL") {
      store.setState("FL");
      const map = floridaRef.current.getLayers()[0]._map;
      map.flyTo([27.8, -83.5], 7, {
        duration: 1.5,
        easeLinearity: 0.2,
      });
      // setCurrentState("florida");
      floridaRef.current.clearLayers().addData(florida);
    }

    if (state === "GA") {
      store.setState("GA");
      const map = georgiaRef.current.getLayers()[0]._map;
      map.flyTo([32.7, -83.2], 7, {
        duration: 1.5,
        easeLinearity: 0.2,
      });
      // setCurrentState("georgia");
      georgiaRef.current.clearLayers().addData(georgia);
    }

    if (state === "PA") {
      store.setState("PA");
      const map = pennsylvaniaRef.current.getLayers()[0]._map;
      map.flyTo([41.203323, -77.194527], 7, {
        duration: 1.5,
        easeLinearity: 0.2,
      });
      // setCurrentState("pennsylvania");
      pennsylvaniaRef.current.clearLayers().addData(pennsylvania);
    }
  };

  const getParty = (state) => {
    if (state === "florida") {
      return florida_districts.map((obj) => obj.Party);
    } else if (state === "georgia") {
      return georgia_districts.map((obj) => obj.Party);
    } else if (state === "pennsylvania") {
      return pennsylvania_districts.map((obj) => obj.Party);
    }
  };

  const getIncumbents = (state) => {
    if (state === "florida") {
      return florida_incumbents.map((obj) => Math.floor(obj.District));
    } else if (state === "georgia") {
      return georgia_incumbents.map((obj) => Math.floor(obj.District));
    } else if (state === "pennsylvania") {
      return pennsylvania_incumbents.map((obj) => Math.floor(obj.District));
    }
  };

  const floridaParties = getParty("florida");
  const georgiaParties = getParty("georgia");
  const pennsylvaniaParties = getParty("pennsylvania");

  const floridaIncumbents = getIncumbents("florida");
  const georgiaIncumbents = getIncumbents("georgia");
  const pennsylvaniaIncumbents = getIncumbents("pennsylvania");

  const handleShowIncumbents = (event) => {
    store.setShowIncumbents(event.target.checked);
  };

  const getFloridaStyle = (feature) => {
    if (store.currentDistrict === parseInt(feature.properties.DISTRICT)) {
      return {
        fillColor: "green",
        fillOpacity: 0.5,
        color: "black",
        weight: 2,
      };
    }
    if (store.currentState !== "FL") {
      return {
        fillColor: "grey",
        fillOpacity: 0.5,
        color: "black",
        weight: 1,
      };
    }
    if (
      store.showIncumbents &&
      floridaIncumbents.includes(feature.properties.DISTRICT)
    ) {
      return {
        fillColor: "purple",
        fillOpacity: 0.5,
        color: "black",
        weight: 1,
      };
    }
    if (
      store.showIncumbents &&
      !floridaIncumbents.includes(feature.properties.DISTRICT)
    ) {
      return {
        fillColor: "grey",
        fillOpacity: 0.5,
        color: "black",
        weight: 1,
      };
    }
    if (floridaParties[feature.properties.DISTRICT - 1] === "REP") {
      return {
        fillColor: "red",
        fillOpacity: 0.5,
        color: "black",
        weight: 1,
      };
    }
    return {
      fillColor: "blue",
      fillOpacity: 0.5,
      color: "black",
      weight: 1,
    };
  };

  return (
    <MapContainer
      className="map-container"
      center={[35, -81]}
      zoom={5}
      style={{ height: "100vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        style={{ border: "none" }}
        {...tileLayerOptions}
      />
      <GeoJSON
        key={`${store.currentState}-${store.currentDistrict}`}
        ref={floridaRef}
        data={floridaOutline}
        style={getFloridaStyle}
        onEachFeature={handleFloridaClicked}
      />
      <GeoJSON
        ref={georgiaRef}
        data={georgiaOutline}
        style={
          (stateOptions.style,
          (feature) =>
            store.currentDistrict && store.currentDistrict === feature
              ? {
                  fillColor: "green",
                  fillOpacity: 0.5,
                  color: "black",
                  weight: 2,
                }
              : {
                  fillColor:
                    store.currentState !== "GA"
                      ? "grey"
                      : store.showIncumbents &&
                        georgiaIncumbents.includes(
                          parseInt(feature.properties.DISTRICT)
                        )
                      ? "purple"
                      : store.showIncumbents &&
                        !georgiaIncumbents.includes(feature.properties.DISTRICT)
                      ? "grey"
                      : georgiaParties[feature.properties.DISTRICT - 1] ===
                        "REP"
                      ? "red"
                      : "blue",
                  fillOpacity: 0.5,
                  color: "black",
                  weight: 1,
                })
        }
        onEachFeature={handleGeorgiaClicked}
      />
      <GeoJSON
        ref={pennsylvaniaRef}
        data={pennsylvaniaOutline}
        style={
          (stateOptions.style,
          (feature) =>
            store.currentDistrict &&
            store.currentDistrict.properties.DISTRICT ===
              feature.properties.DISTRICT
              ? {
                  fillColor: "green",
                  fillOpacity: 0.5,
                  color: "black",
                  weight: 2,
                }
              : {
                  fillColor:
                    store.currentState !== "PA"
                      ? "grey"
                      : store.showIncumbents &&
                        georgiaIncumbents.includes(
                          parseInt(feature.properties.DISTRICT)
                        )
                      ? "purple"
                      : store.showIncumbents &&
                        !pennsylvaniaIncumbents.includes(
                          feature.properties.DISTRICT
                        )
                      ? "grey"
                      : pennsylvaniaParties[feature.properties.DISTRICT - 1] ===
                        "REP"
                      ? "red"
                      : "blue",
                  fillOpacity: 0.5,
                  color: "black",
                  weight: 1,
                })
        }
        onEachFeature={handlePennsylvaniaClicked}
      />

      <select
        className="ui selection dropdown"
        onChange={handleStateChange}
        value={store ? store.currentState : ""}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "1000",
        }}
      >
        <option className="item" value="">
          Select a state
        </option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="PA">Pennsylvania</option>
      </select>

      <div
        style={{
          position: "absolute",
          top: "50px",
          right: "10px",
          zIndex: "1000",
        }}
        className="ui checkbox"
      >
        <input
          type="checkbox"
          name="public"
          checked={store.showIncumbents}
          onChange={handleShowIncumbents}
        />
        <label>Show Incumbents</label>
      </div>
    </MapContainer>
  );
};

export default Map;
