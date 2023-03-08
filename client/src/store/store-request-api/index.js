import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getMapGeoJson = (stateCode) => api.get(`/map/${stateCode}`);

const apis = {
  getMapGeoJson,
};

export default apis;
