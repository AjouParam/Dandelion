import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Text } from 'react-native';
import userState from '@contexts/userState';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { Image, Input, Button, Spinner } from '@components/index';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '@utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GoogleLoginButton from '@components/GoogleLoginButton';
import decode from 'jwt-decode';
import { logo } from '../assets/index';

const ImageContainer = styled.View`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const Logo = styled.Image`
  width: 240px;
  height: 240px;
`;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 30px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;
const LoginButtonContainer = styled.View`
  width: 100%;
  margin-top: 10px;
  align-items: center;
`;
const ResetPasswordContainer = styled.View`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 30px;
  margin-top: -20px;
`;
const JoinContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 40px;
`;

const Login = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useRecoilState(userState.emailState);
  const [uid, setUid] = useRecoilState(userState.uidState);
  // const {spinner} = useContext(ProgressContext);
  const insets = useSafeAreaInsets();

  //앱 실행시 JWT 체크 후 자동 로그인?
  useLayoutEffect(() => {
    //자동 로그인?
    _loadInitialState();
  }, []);

  const _loadInitialState = async () => {
    const value = await AsyncStorage.getItem('auth_token');
    if (value !== null) {
      const decoded = decode(value);
      console.log(decoded);
    }
  };

  useEffect(() => {
    setDisabled(!(emailInput && password && !errorMessage));
  }, [emailInput, password, errorMessage]);

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmailInput(changedEmail);
    setErrorMessage(validateEmail(changedEmail) ? '' : '이메일을 확인해주세요');
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const _handleLoginButtonPress = async () => {
    /*JWT 로그인 구현 부분*/
    try {
      //spinner.start();
      //API request
      await axios
        .post('http://10.0.2.2:3000/account/signin', { email: emailInput, password: password })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 'SUCCESS') {
            try {
              AsyncStorage.setItem('auth_token', res.data.accessToken);
              setEmail(emailInput);
              setUid(res.data.accessToken);

              // navigation.navigate('Main');
            } catch (error) {
              throw new Error(res.data.message);
            }
          } else if (res.data.status === 'FAILED') {
            throw new Error(res.data.message);
          }
        })
        .catch((error) => {
          // console.log(error);
          // Alert.alert('로그인 실패', error);
          throw new Error(error);
        });
      //spinner.start();
    } catch (e) {
      Alert.alert('로그인 에러', e.message);
    } finally {
      //spinner.stop();
    }
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} extraScrollHeight={20}>
      <Container insets={insets}>
        <ImageContainer>
          <Logo source={logo} resizeMode="contain" />
        </ImageContainer>
        <Input
          label="이메일"
          value={emailInput}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="이메일"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="비밀번호"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="비밀번호"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <ResetPasswordContainer>
          <Button
            title="비밀번호 재설정"
            onPress={() => navigation.navigate('PasswordReset')}
            isFilled={false}
            fontColor="#9E9E9E"
            width="50%"
            height="16px"
          />
        </ResetPasswordContainer>
        {/* <Button title="로그인" onPress={_handleLoginButtonPress} disabled={disabled} /> */}
        <LoginButtonContainer>
          <Button title="로그인" onPress={_handleLoginButtonPress} radius="25px" ifFilled={true} width="300px" />
          <GoogleLoginButton />
        </LoginButtonContainer>
        <JoinContainer>
          <Text>아직 민들레 회원이 아니신가요?</Text>
          <Button
            title="회원가입"
            onPress={() => navigation.navigate('Signup')}
            isFilled={false}
            width="100px"
            height="16px"
          />
        </JoinContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
};
export default Login;
