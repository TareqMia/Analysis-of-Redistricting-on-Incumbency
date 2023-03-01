import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import floridaOutline from "../json/fl-state_outline.json";
import georgiaOutline from "../json/ga-state_outline.json";
import pennsylvaniaOutline from "../json/pa-state_outline.json";

import florida from "../json/florida.json";
import georgia from "../json/georgia.json";
import pennsylvania from "../json/pennsylvania.json";

const Map = ({
  currentState,
  setCurrentState,
  currentDistrict,
  setCurrentDistrict,
}) => {
  const floridaRef = useRef();
  const georgiaRef = useRef();
  const pennsylvaniaRef = useRef();

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
  }, [currentState]);

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

        console.log(feature);
        if (feature.geometry.type === "Polygon") {
        }

        const map = event.target._map;
        map.flyTo([27.8, -83.5], 7, {
          duration: 1.5,
          easeLinearity: 0.2,
        });

        floridaRef.current.clearLayers().addData(florida);
        setCurrentState("florida");
      },
      mouseover: (event) => {
        if (currentState) {
          console.log(feature);
        }
      },
    });
  };

  const handleGeorgiaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        if (!georgiaRef.current) return;

        setCurrentState("georgia");

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
        style={stateOptions.style}
        onEachFeature={handleFloridaClicked}
        // style={(feature) => {
        //   const party = feature.properties.PARTY;
        //   console.log(feature);
        //   return {
        //     fillColor: party === "REP" ? "red" : "blue",
        //     weight: 1,
        //     opacity: 1,
        //     color: "white",
        //     fillOpacity: 0.7,
        //   };
        // }}
      />
      <GeoJSON
        ref={georgiaRef}
        data={georgiaOutline}
        style={stateOptions.style}
        onEachFeature={handleGeorgiaClicked}
      />
      <GeoJSON
        ref={pennsylvaniaRef}
        data={pennsylvaniaOutline}
        style={stateOptions.style}
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
    </MapContainer>
  );
};

export default Map;
