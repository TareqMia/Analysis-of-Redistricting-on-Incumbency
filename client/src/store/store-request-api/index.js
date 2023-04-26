import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getStateOutlines = () => api.get(`/map/${state}`);

export const getMapGeoJson = (stateCode) => api.get(`/map/${stateCode}`);
export const getDistricts = (stateCode) =>
  api.get(`/districts/incumbents/${stateCode}`);

const apis = {
  getMapGeoJson,
  getDistricts,
  getStateOutlines,
};

export default apis;
