import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getState = (state) => api.get(`/map/${state}`);

export const getStateOutline = (state) => api.get(`/map/${state}`);
export const getDistrictPlan = (state, planType) =>
  api.get(`/map/${state}/${planType}`);
export const getEnsemble = (state) => api.get(`/map/${state}/ensemble`);

const apis = {
  getState,
  getStateOutline,
  getDistrictPlan,
  getEnsemble,
};

export default apis;
