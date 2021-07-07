import axios from "axios";
import authStore from "./authStore";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

// Interceptor it return reject 401
instance.interceptors.response.use(undefined, function (err) {
  const orginalRequest = err.config;
  if (err.response.status === 401 && !orginalRequest._retry) {
    orginalRequest._retry = true;
    authStore.checkForToken();
    return instance(orginalRequest);
  }
  return Promise.reject(err);
});

export default instance;
