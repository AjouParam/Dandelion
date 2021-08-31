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

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);
  const [email, setEmail] = useRecoilState(userState.emailState);
  const [uid, setUid] = useRecoilState(userState.uidState);

  useLayoutEffect(() => {
    const _loadInitialState = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          const userData = decode(value);
          setUid(value);
          setEmail(userData.email);
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
