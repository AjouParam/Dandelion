import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
// import { ProgressContext, UserContext } from '@contexts';
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

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
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

const Login = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useRecoilState(userState.emailState);
  const [uid, setUid] = useRecoilState(userState.uidState);
  const insets = useSafeAreaInsets();

  //앱 실행시 JWT 체크 후 자동 로그인?
  useLayoutEffect(() => {
    //자동 로그인?
    _loadInitialState();
  }, []);

  const _loadInitialState = async () => {
    const value = await AsyncStorage.getItem('auth_token');
    if (value !== null) {
      // check authentication from server
      if (true) {
        let temp_check = false;
      }
      if (temp_check) {
        setUid(value.accessToken);
        navigation.navigate('Maps');
      }
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
      //API request
      //let json = JSON.stringify({ email: emailInput, password: password });
      await axios
        .post('http://10.0.2.2:3000/account/signin', { email: emailInput, password: password })
        .then((res) => {
          //jwt_token == res.data 인가??
          /*
          if (res.length 0) {
            try {
              AsyncStorage.setItem('auth_token', res.accessToken);
              console.log(res + '응답');
              setEmail(emailInput);
              setUid(res.accessToken);
              navigation.navigate('Maps');
            } catch (error) {
              throw new Error('로그인 실패');
            }
          } else {
            //fail to login or no user
            throw new Error('로그인 실패');
            console.log(res);
          }*/

          console.log(res.data);
        })
        .catch((error) => {
          //Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요');
          //Alert.alert(json);
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
        <Button title="로그인" onPress={_handleLoginButtonPress} disabled={disabled} />
        <Button title="이메일로 회원가입" onPress={() => navigation.navigate('Signup')} isFilled={false} />
        {/* <Button title="이메일로 회원가입" onPress={() => Alert.alert('sign up')} isFilled={false} /> */}
      </Container>
    </KeyboardAwareScrollView>
  );
};
export default Login;
