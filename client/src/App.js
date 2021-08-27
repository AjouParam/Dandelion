import React, { useState } from 'react';
import { StatusBar, Image, Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { RecoilRoot } from 'recoil';
import { theme } from './theme';
import Navigation from '@navigations/index';
import { ProgressProvider } from '@contexts/Progress';

const App = () => {
  const [isReady, setIsReady] = useState(true);

  // const [user, setUser] = useState({});

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post('api/refresh', { token: user.refreshToken });
  //     setUser({
  //       ...user,
  //       accessToken: res.data.accessToken,
  //       refreshToken: res.data.refreshToken,
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const axiosJWT = axios.create();

  // axiosJWT.interceptors.request.use(
  //   //before every request, check the expirations of token
  //   // before make request, change header of request

  //   async (config) => {
  //     let currentDate = new Date();
  //     //use library -> npm install jwt-decode
  //     const decodedToken = jwt_decode(user.accessToken);
  //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //       //should refresh the token
  //       const data = await refreshToken();
  //       //update header
  //       config.headers['authorization'] = 'Bearer ' + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   },
  // );

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
