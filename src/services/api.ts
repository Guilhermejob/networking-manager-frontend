import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000/",
})

api.interceptors.request.use((config) => {
  const adminKey = localStorage.getItem("admin_accessKey");
if (adminKey) {
    config.headers["x-admin-key"] = adminKey;
  }
  
  return config;
});

export default api;