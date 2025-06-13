module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Expo's default preset
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          // Optional:
          // blacklist: null,
          // whitelist: null,
          // safe: false,
          allowUndefined: true, // Good for development
        },
      ],
      // ... any other plugins you use
    ],
  };
};