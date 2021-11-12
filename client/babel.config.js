module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@contexts': './src/contexts',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@controller': './src/controller',
        },
      },
      'module:react-native-dotenv',
    ],
  ],
};
