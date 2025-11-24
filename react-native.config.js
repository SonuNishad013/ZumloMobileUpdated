module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./src/assets/fonts/'], // stays the same
  dependencies: {
    'react-native-exit-app': {
      platforms: {
        ios: null, // disable iOS autolinking
      },
    },
  },
};
