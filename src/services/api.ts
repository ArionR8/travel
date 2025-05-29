// /src/services/api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
