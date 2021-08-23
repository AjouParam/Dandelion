import React, { useState } from 'react';
import { StatusBar, Image, Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { RecoilRoot } from 'recoil';
import { theme } from './theme';
import Navigation from '@navigations/index';
import { ProgressProvider } from '@contexts/progress';

const App = () => {
  const [isReady, setIsReady] = useState(true);

  return isReady ? (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ProgressProvider>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </ProgressProvider>
      </ThemeProvider>
    </RecoilRoot>
  ) : (
    <Text>로딩중</Text>
  );
};

export default App;
