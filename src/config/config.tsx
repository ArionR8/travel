import { API_BASE_URL as ENV_API_BASE_URL } from "@env";

// You can provide a fallback directly in your code if the .env variable might be missing
// and you haven't set allowUndefined: false in babel.config.js
// const fallbackBaseUrl = "http://172.29.16.1:5000"; // Your original fallback

// The react-native-dotenv plugin will make ENV_API_BASE_URL undefined if it's not in .env (and allowUndefined is true)
export const API_BASE_URL = ENV_API_BASE_URL;
// || fallbackBaseUrl;

// Optional: Log which URL is being used, especially during development
if (!ENV_API_BASE_URL) {
  //   console.warn(
  //     `API_BASE_URL not found in .env, using fallback: ${fallbackBaseUrl}`
  //   );
} else {
  console.log(`Using API_BASE_URL from .env: ${API_BASE_URL}`);
}
