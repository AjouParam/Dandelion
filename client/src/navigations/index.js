import React, { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '@navigations/AuthStack';
import { Spinner } from '@components';
import { ProgressContext, UserContext } from '@contexts';
import userState from '@contexts/userState';
import MainStack from '@navigations/MainStack';

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);
  const { user } = useContext(UserContext);
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
