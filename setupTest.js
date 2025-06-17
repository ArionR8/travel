// setupTests.js
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

// Minimal Expo mocks
jest.mock('expo', () => ({
    Linking: { makeUrl: jest.fn() },
    Constants: { manifest: {} },
    SplashScreen: {
        preventAutoHideAsync: jest.fn(),
        hideAsync: jest.fn(),
    },
}));

// Minimal React Navigation mock
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({ navigate: jest.fn() }),
}));

// Minimal Expo Router mock
jest.mock('expo-router', () => ({
    useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
    Link: ({ children }) => children,
}));