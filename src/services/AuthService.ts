// /src/services/AuthService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api"; // ✅ Import your Axios instance

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  number?: string;
  email: string;
  username: string;
  role?: string;
}

const STORAGE_KEY = "current_user";
const TOKEN_KEY = "auth_token";

export async function login(username: string, password: string): Promise<User> {
  try {
    const response = await api.post("/api/login", {
      username,
      password,
    });

    const data = response.data;
    const user: User = data.user;
    const token: string = data.token;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(TOKEN_KEY, token);

    return user;
  } catch (error: any) {
    // Handle Axios error properly
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Login failed";
    throw new Error(message);
  }
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function getCurrentUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function register(userData: {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  username: string;
  password: string;
}): Promise<void> {
  try {
    await api.post("/api/register", userData);
  } catch (error: any) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      error.message ||
      "Registration failed";
    throw new Error(message);
  }
}