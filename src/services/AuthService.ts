// /src/services/AuthService.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

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

// Save user and token locally and set default auth header
async function storeUserSession(user: User, token: string): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  await AsyncStorage.setItem(TOKEN_KEY, token);
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Clear session and remove default auth header
async function clearUserSession(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
  await AsyncStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.common.Authorization;
}

export async function login(username: string, password: string): Promise<User> {
  try {
    const response = await api.post("/api/login", { username, password });
    const { user, token } = response.data;
    await storeUserSession(user, token);
    return user;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Login failed";
    throw new Error(message);
  }
}

export async function logout(): Promise<void> {
  await clearUserSession();
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
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return token;
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

export async function getUserCount(): Promise<number> {
  try {
    const response = await api.get("/api/users-count");
    return response.data.count;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to fetch user count";
    throw new Error(message);
  }
}

export async function requestPasswordReset(email: string): Promise<string> {
  try {
    const response = await api.post("/api/forgot-password", { email });
    return response.data.token; // Only for testing; in production, this would go to email
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to request password reset";
    throw new Error(message);
  }
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  try {
    await api.post("/api/reset-password", { token, newPassword });
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to reset password";
    throw new Error(message);
  }
}
