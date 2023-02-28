import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useMapEvents } from "https://cdn.esm.sh/react-leaflet/hooks";

import floridaOutline from "../json/fl-state_outline.json";
import georgiaOutline from "../json/ge-state_outline.json";
import pennsylvaniaOutline from "../json/pl-state_outline.json";

import florida from "../json/florida.json";
import georgia from "../json/georgia.json";
import pennsylvania from "../json/pennsylvania.json";

const Map = () => {
  const [currentState, setCurrentState] = useState("");
  const geoJsonRef = useRef();

  const tileLayerOptions = {
    detectRetina: true,
    maxZoom: 20,
    maxNativeZoom: 17,
    minZoom: 3,
    noWrap: true,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  };

  const floridaOptions = {
    style: {
      fillColor: "red",
      fillOpacity: 0.5,
      color: "red",
      weight: 1,
    },
  };

  const georgiaOptions = {
    style: {
      fillColor: "purple",
      fillOpacity: 0.5,
      color: "purple",
      weight: 1,
    },
  };

  const pennsylvaniaOptions = {
    style: {
      fillColor: "blue",
      fillOpacity: 0.5,
      color: "blue",
      weight: 1,
    },
  };

  const handleFloridaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        if (!geoJsonRef.current) return;

        const map = event.target._map;
        map.setView([27.8, -83.5], 7);

        geoJsonRef.current.clearLayers();
        geoJsonRef.current.addData(florida);
        setCurrentState("florida");

        console.log(currentState);
      },
    });
  };

  const handleGeorgiaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        setCurrentState("georgia");
        const map = event.target._map;
        map.setView([32.7, -83.2], 7);
        console.log(currentState);
      },
    });
  };

  const handlePennsylvaniaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        const map = event.target._map;
        map.setView([41.203323, -77.194527], 7);
      },
    });
  };

  console.log(currentState);
  return (
    <MapContainer center={[38.5, -96]} zoom={5} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        style={{ border: "none" }}
        {...tileLayerOptions}
      />
      <GeoJSON
        ref={geoJsonRef}
        data={floridaOutline}
        {...floridaOptions}
        onEachFeature={handleFloridaClicked}
      />
      <GeoJSON
        data={georgiaOutline}
        {...georgiaOptions}
        onEachFeature={handleGeorgiaClicked}
      />
      <GeoJSON
        data={pennsylvaniaOutline}
        style={pennsylvaniaOptions.style}
        onEachFeature={handlePennsylvaniaClicked}
      />
    </MapContainer>
  );
};

export default Map;
