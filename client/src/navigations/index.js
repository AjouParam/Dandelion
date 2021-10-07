import React, { useContext, useMemo, useLayoutEffect } from 'react';
import { useRecoilState } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStack from './AuthStack';
import { Spinner } from '@components/index';
import { ProgressContext } from '@contexts/Progress';
import userState from '@contexts/userState';
import MainStack from './MainStack';
import axios from 'axios';

const headers = {
  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  Accept: '*/*',
};

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);
  const [email, setEmail] = useRecoilState(userState.emailState);
  const [uid, setUid] = useRecoilState(userState.uidState);
  const [name, setName] = useRecoilState(userState.nameState);

  useLayoutEffect(() => {
    const _loadInitialState = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          const userData = decode(value);
          console.log(userData);
          const todayUTC = new Date().getTime() / 1000;
          const expUTC = userData.exp;
          console.log(expUTC - todayUTC);
          if (expUTC - todayUTC <= 0) {
            //expired
            await AsyncStorage.removeItem('token');
            console.log('token expired');
          } else if (expUTC - todayUTC <= 864000 && expUTC - todayUTC > 0) {
            // token refresh
            await axios
              .get('http:/10.0.2.2:3000/account/regenerateToken', {
                headers: {
                  'x-access-token': value,
                },
              })
              .then(async (res) => {
                if (res.data.status === 'SUCCESS') {
                  console.log('refresh token');
                  console.log();
                  await AsyncStorage.setItem('token', res.data.accessToken);
                  const token = decode(res.data.accessToken);
                  setName(token.name);
                  setUid(res.data.accessToken);
                  setEmail(userData.email);
                } else {
                  console.log(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log('valid token');
            setName(userData.name);
            setUid(value);
            setEmail(userData.email);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    _loadInitialState();
  }, []);

  return (
    <NavigationContainer>
      {uid && email ? <MainStack /> : <AuthStack />}
      {/* <MainStack/> */}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
