import React, { useState, useRef, useEffect, useContext } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { Image, Input, Button } from '@components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace, validatePassword } from '@utils/common';
import { Alert } from 'react-native';

import userState from '@contexts/userState';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Signup = ({ navigation }) => {
  // const { dispatch } = useContext(UserContext);
  // const { spinner } = useContext(ProgressContext);
  const [userName, setUserName] = useRecoilState(userState.nameState);
  const [userEmail, setUserEmail] = useRecoilState(userState.emailState);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [emailButton, setEmailButton] = useState(true);
  const [emailValid, setEmailValid] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const didMountRef = useRef();

  useEffect(() => {
    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailButton(false);
    }
  }, [email]);

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = '이름을 입력하세요';
      } else if (!validateEmail(email)) {
        _errorMessage = '이메일을 확인해주세요';
      } else if (!validatePassword(password)) {
        _errorMessage = '숫자,문자,특수문자 1개 이상 6자에서 16자';
      } else if (password !== passwordConfirm) {
        _errorMessage = '비밀번호가 맞지 않습니다.';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(!(name && email && password && passwordConfirm && !errorMessage && emailValid));
  }, [name, email, password, passwordConfirm, errorMessage, emailValid]);

  useEffect(() => {}, [email]);
  // const _handleSignupButtonPress = async () => {
  //   try {
  //     spinner.start();
  //     const user = await signup({ email, password, name, photoUrl });
  //     dispatch(user);
  //   } catch (e) {
  //     Alert.alert('회원가입 오류', e.message);
  //   } finally {
  //     spinner.stop();
  //   }
  // };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Input
          label="닉네임"
          value={name}
          onChangeText={(text) => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="닉네임"
          returnKeyType="next"
        />
        <Input
          ref={emailRef}
          label="이메일"
          value={email}
          onChangeText={(text) => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="이메일"
          returnKeyType="next"
        />

        <Button
          title={emailValid ? '사용 가능한 이메일 입니다' : '이메일 중복확인'}
          onPress={() => {
            //TODO : 서버에서 이메일 중복 확인
            setEmailButton(true);
            Alert.alert('이메일 중복 확인', '사용할 수 있는 이메일 입니다.');
            setEmailValid(true);
            passwordRef.current.focus();
          }}
          disabled={emailButton}
        />

        <Input
          ref={passwordRef}
          label="비밀번호"
          value={password}
          onChangeText={(text) => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="비밀번호"
          returnKeyType="done"
          isPassword
        />
        <Input
          ref={passwordConfirmRef}
          label="비밀번호 확인"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
          // onSubmitEditing={_handleSignupButtonPress}
          placeholder="비밀번호 재입력"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="회원가입"
          onPress={() => {
            Alert.alert('회원가입', '회원가입 성공!', [
              {
                text: '로그인',
                onPress: () => {
                  navigation.navigate('Login');
                },
              },
            ]);
          }}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
