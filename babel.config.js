module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@src': './src',
          '@common': './src/common',
          '@reducers': './src/reducers',
          '@store': './src/store',
          '@actions': './src/actions',
          '@sagas': './src/sagas',
          '@screens': './src/screens',
          '@images': './assets/img'
        },
      },
    ],
    'react-native-reanimated/plugin'
  ],
};