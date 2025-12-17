// api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://dev-api.liftrex.com/", 
  timeout: 10000,
});

// ✅ 
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
