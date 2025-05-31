let baseUrl = "http://10.116.10.241:5000"; // fallback ip

try {
    const { LOCAL_API_BASE_URL } = require("./localConfig");
    baseUrl = LOCAL_API_BASE_URL;
} catch (error) {
    console.warn("Using default base URL. Local override not found.");
}

export const API_BASE_URL = baseUrl;
