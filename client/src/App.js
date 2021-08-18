import React, { useState } from 'react';
import { StatusBar, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Navigation from './navigations';

import { ProgressProvider, UserProvider } from './contexts';

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};
const cacheFonts = (fonts) => {
  return fonts.map((font) => Font.loadAsync(font));
};

const App = () => {
  const [isReady, setIsReady] = useState(true);

  return isReady ? (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <ProgressProvider>
            <StatusBar barStyle="dark-content" />
            <Navigation />
          </ProgressProvider>
        </UserProvider>
      </ThemeProvider>
    </RecoilRoot>
  ) : (
    <AppLoading onError={console.warn} />
  );
};

export default App;
