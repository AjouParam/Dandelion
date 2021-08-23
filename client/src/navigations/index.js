import React, { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { Spinner } from '@components/index';
import { ProgressContext } from '@contexts/progress';
import userState from '@contexts/userState';
import MainStack from './MainStack';

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);
  const uid = useRecoilValue(userState.uidState);
  const email = useRecoilValue(userState.emailState);

  return (
    <NavigationContainer>
      {uid && email ? <MainStack /> : <AuthStack />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
