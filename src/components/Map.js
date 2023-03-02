import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

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

const Map = ({
  currentState,
  setCurrentState,
  currentDistrict,
  setCurrentDistrict,
  selectedPlan,
  showIncumbents,
  setShowIncumbents,
}) => {
  const floridaRef = useRef();
  const georgiaRef = useRef();
  const pennsylvaniaRef = useRef();

  const [florida, setFlorida] = useState(florida_2022);
  const [georgia, setGeorgia] = useState(georgia_2022);
  const [pennsylvania, setPennsylvania] = useState(pennsylvania_2022);

  useEffect(() => {
    if (currentState === "florida") {
      georgiaRef.current.clearLayers().addData(georgiaOutline);
      pennsylvaniaRef.current.clearLayers().addData(pennsylvaniaOutline);
    } else if (currentState === "georgia") {
      floridaRef.current.clearLayers().addData(floridaOutline);
      pennsylvaniaRef.current.clearLayers().addData(pennsylvaniaOutline);
    } else if (currentState === "pennsylvania") {
      floridaRef.current.clearLayers().addData(floridaOutline);
      georgiaRef.current.clearLayers().addData(georgiaOutline);
    } else {
      if (floridaRef.current) {
        const map = floridaRef.current.getLayers()[0]._map;
        map.flyTo([35, -81], 5, {
          duration: 1.5,
          easeLinearity: 0.2,
        });
        floridaRef.current.clearLayers().addData(floridaOutline);
        georgiaRef.current.clearLayers().addData(georgiaOutline);
        pennsylvaniaRef.current.clearLayers().addData(pennsylvaniaOutline);
      }
    }
    setCurrentDistrict(null);
  }, [currentState, selectedPlan]);

  useEffect(() => {
    if (currentState === "florida") {
    }
  }, [currentDistrict]);

  //   useEffect(() => {
  //     if (selectedPlan === "2020") {
  //       setFlorida(florida_2020);
  //       setGeorgia(georgia_2020);
  //       setPennsylvania(pennsylvania_2020);

  //       if (currentState === "florida") {
  //         floridaRef.current.clearLayers().addData(florida);
  //       }

  //       if (currentState === "pennsylvania") {
  //         pennsylvaniaRef.current.clearLayers().addData(pennsylvania);
  //       }

  //       if (currentState === "georgia") {
  //         georgiaRef.current.clearLayers().addData(georgia);
  //       }
  //     }

  //     if (selectedPlan === "2022") {
  //       setFlorida(florida_2022);
  //       setGeorgia(georgia_2022);
  //       setPennsylvania(pennsylvania_2022);

  //       if (currentState === "florida") {
  //         floridaRef.current.clearLayers().addData(florida);
  //       }

  //       if (currentState === "pennsylvania") {
  //         pennsylvaniaRef.current.clearLayers().addData(pennsylvania);
  //       }

  //       if (currentState === "georgia") {
  //         georgiaRef.current.clearLayers().addData(georgia);
  //       }
  //     }
  //   }, [selectedPlan]);

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
          console.log(florida_districts[feature.properties.DISTRICT - 1].Party);
          setCurrentDistrict(feature);
        }

        const map = event.target._map;
        map.flyTo([27.8, -83.5], 7, {
          duration: 1.5,
          easeLinearity: 0.2,
        });

        floridaRef.current.clearLayers().addData(florida);
        setCurrentState("florida");

        layer.setStyle({
          fillColor: "white",
          fillOpacity: 0.5,
          color: "black",
          weight: 2,
        });
      },
      mouseover: (event) => {
        if (currentState === "florida") {
          console.log("hovering over");
        }
      },
    });
  };

  const handleGeorgiaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        if (!georgiaRef.current) return;

        setCurrentState("georgia");

        if (feature.geometry.type === "Polygon") {
          setCurrentDistrict(feature);
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

        setCurrentState("pennsylvania");

        if (feature.geometry.type === "Polygon") {
          setCurrentDistrict(feature);
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

    if (!state) {
      setCurrentState("");
    } else {
      setCurrentState(state);
    }

    if (state === "florida") {
      const map = floridaRef.current.getLayers()[0]._map;
      map.flyTo([27.8, -83.5], 7, {
        duration: 1.5,
        easeLinearity: 0.2,
      });
      floridaRef.current.clearLayers().addData(florida);
    }

    if (state === "georgia") {
      const map = georgiaRef.current.getLayers()[0]._map;
      map.flyTo([32.7, -83.2], 7, {
        duration: 1.5,
        easeLinearity: 0.2,
      });
      georgiaRef.current.clearLayers().addData(georgia);
    }

    if (state === "pennsylvania") {
      const map = pennsylvaniaRef.current.getLayers()[0]._map;
      map.flyTo([41.203323, -77.194527], 7, {
        duration: 1.5,
        easeLinearity: 0.2,
      });
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

  const floridaParties = getParty("florida");
  const georgiaParties = getParty("georgia");
  const pennsylvaniaParties = getParty("pennsylvania");

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
        ref={floridaRef}
        data={floridaOutline}
        style={
          (stateOptions.style,
          (feature) =>
            feature === currentDistrict
              ? {
                  fillColor: "green",
                  fillOpacity: 0.5,
                  color: "black",
                  weight: 2,
                }
              : {
                  fillColor:
                    currentState !== "florida"
                      ? "grey"
                      : floridaParties[feature.properties.DISTRICT - 1] ===
                        "REP"
                      ? "red"
                      : "blue",
                  fillOpacity: 0.5,
                  color: "black",
                  weight: 1,
                })
        }
        onEachFeature={handleFloridaClicked}
      />
      <GeoJSON
        ref={georgiaRef}
        data={georgiaOutline}
        style={
          (stateOptions.style,
          (feature) =>
            feature === currentDistrict
              ? {
                  fillColor: "green",
                  fillOpacity: 0.5,
                  color: "black",
                  weight: 2,
                }
              : {
                  fillColor:
                    currentState !== "georgia"
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
            feature === currentDistrict
              ? {
                  fillColor: "green",
                  fillOpacity: 0.5,
                  color: "black",
                  weight: 2,
                }
              : {
                  fillColor:
                    currentState !== "pennsylvania"
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
        value={currentState}
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
        <option value="florida">Florida</option>
        <option value="georgia">Georgia</option>
        <option value="pennsylvania">Pennsylvania</option>
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
        <input type="checkbox" name="public" />
        <label>Show Incumbents</label>
      </div>
    </MapContainer>
  );
};

export default Map;
