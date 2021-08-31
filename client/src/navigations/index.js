import React, { useContext, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { Spinner } from '@components/index';
import { ProgressContext } from '@contexts/Progress';
import userState from '@contexts/userState';
import MainStack from './MainStack';
const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);
  const uid = useRecoilValue(userState.uidState);
  const email = useRecoilValue(userState.emailState);

  return (
    <NavigationContainer>
      
      {/* {uid && email ? <MainStack /> : <AuthStack />} ㄴㅔ비게이션 편집을 위해 임시 주석*/}
      <MainStack/>
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
