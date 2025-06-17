// src/services/__tests__/ShtetiService.test.ts
import React from 'react'; // Add React import for React.ReactNode
import * as ShtetiService from '../ShtetiService';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock Axios
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Mock Expo modules
jest.mock('expo', () => ({
  Linking: { makeUrl: jest.fn() },
  Constants: { manifest: {} },
  SplashScreen: {
    preventAutoHideAsync: jest.fn(),
    hideAsync: jest.fn(),
  },
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// Mock Expo Router with fixed type
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock the api module
jest.mock('../api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
}));

const mockApi = require('../api').default;

describe('ShtetiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetchShtetet returns data', async () => {
    const mockData = [{ id: '1', emri: 'Kosova' }];
    mockApi.get.mockResolvedValue({ data: mockData });

    const result = await ShtetiService.fetchShtetet();
    expect(result).toEqual(mockData);
    expect(mockApi.get).toHaveBeenCalledWith('/api/shtetet');
  });

  test('addShteti makes POST request', async () => {
    const payload = { emri: 'Albania' };
    mockApi.post.mockResolvedValue({});

    await ShtetiService.addShteti(payload);
    expect(mockApi.post).toHaveBeenCalledWith('/api/add-shtetin', payload);
  });

  test('updateShteti makes PUT request', async () => {
    const id = '1';
    const payload = { emri: 'Albania Updated' };
    mockApi.put.mockResolvedValue({ data: payload });

    const result = await ShtetiService.updateShteti(id, payload);
    expect(result).toEqual(payload);
    expect(mockApi.put).toHaveBeenCalledWith(`/api/shtetin-update/${id}`, payload);
  });

  test('deleteShtet makes DELETE request', async () => {
    const id = '1';
    mockApi.delete.mockResolvedValue({});

    await ShtetiService.deleteShtet(id);
    expect(mockApi.delete).toHaveBeenCalledWith(`/api/shtetin-delete/${id}`);
  });

  test('fetchShtetet handles errors', async () => {
    const error = new Error('Network error');
    mockApi.get.mockRejectedValue(error);

    await expect(ShtetiService.fetchShtetet()).rejects.toThrow(error);
  });
});