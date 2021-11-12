import React, { useState, useRef, useEffect, useContext } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { Image, SignupInput, SmallButton, Button } from '@components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { validateEmail, removeWhitespace, validatePassword, validateName } from '@utils/common';
import { Alert } from 'react-native';
import axios from 'axios';

import userState from '@contexts/userState';

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom + 30}px;
`;
const FormContainer = styled.View``;
const SubFormContainer = styled.View``;
const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
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
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  // const [_errorMessage, setErrorMessage] = useState('');

  const [name_errorMessage, setName_errorMessage] = useState('');
  const [email_errorMessage, setEmail_errorMessage] = useState('');
  const [password_errorMessage, setPassword_errorMessage] = useState('');
  const [passwordConfirm_errorMessage, setPasswordConfirm_errorMessage] = useState('');

  const [name_right, setNameRight] = useState(false);
  const [email_right, setEmailRight] = useState(false);
  const [pass_right, setPassRight] = useState(false);
  const [passcon_right, setPassConRight] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [nameButton, setNameButton] = useState(true);
  const [nameValid, setNameValid] = useState(false);
  const [emailButton, setEmailButton] = useState(true);
  const [emailValid, setEmailValid] = useState(false);

  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const didMountRef = useRef();
  const [emailClick, setEmailClick] = useState(false);
  const [nameClick, setNameClick] = useState(false);
  const [passClick, setPassClick] = useState(false);
  const [passConClick, setPassConClick] = useState(false);
  //초기 마운트 될 때에는 useState변수에 변화가 없으므로 useEffect 동작 안함

  useEffect(() => {
    if (email) {
      if (!validateEmail(email)) {
        setEmailValid(false);
        setEmailButton(false);
      }
    } else {
      setEmailButton(true);
    }

    if (emailClick) {
      let errorMessage_email = '';
      if (email && !validateEmail(email)) {
        errorMessage_email = '이메일을 확인해주세요';
        setEmailRight(false);
      } else {
        errorMessage_email = '';
        setEmailRight(true);
      }
      setEmail_errorMessage(errorMessage_email);
    } else {
      setEmailClick(true);
    }
  }, [email]);

  useEffect(() => {
    if (name) {
      setNameButton(false);
    } else {
      setNameButton(true);
    }
    if (nameClick) {
      let errorMessage_name = '';
      if (!validateName(name)) {
        errorMessage_name = '이름을 확인해주세요';
        setNameRight(false);
      } else {
        errorMessage_name = '';
        setNameRight(true);
      }
      setName_errorMessage(errorMessage_name);
    } else {
      setNameClick(true);
    }
  }, [name]);

  useEffect(() => {
    if (passClick) {
      let errorMessage_pass = '';
      if (password && !validatePassword(password)) {
        errorMessage_pass = '영어, 숫자, 특수문자 포함 8자 이상을 입력하세요.';
        setPassRight(false);
      } else {
        errorMessage_pass = '';
        setPassRight(true);
      }
      setPassword_errorMessage(errorMessage_pass);
    } else {
      setPassClick(true);
    }
  }, [password]);

  useEffect(() => {
    if (passConClick) {
      let errorMessage_passcof = '';
      if (passwordConfirm && !validatePassword(passwordConfirm)) {
        errorMessage_passcof = '비밀번호가 일치하지 않습니다.';
        setPassConRight(false);
      } else {
        errorMessage_passcof = '';
        setPassConRight(true);
      }
      setPasswordConfirm_errorMessage(errorMessage_passcof);
    } else {
      setPassConClick(true);
    }
  }, [passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(
        name &&
        nameValid &&
        email &&
        emailValid &&
        password &&
        passwordConfirm &&
        !email_errorMessage &&
        !name_errorMessage &&
        !password_errorMessage &&
        !passwordConfirm_errorMessage
      ),
    );
  }, [
    name,
    email,
    password,
    passwordConfirm,
    name_errorMessage,
    email_errorMessage,
    password_errorMessage,
    passwordConfirm_errorMessage,
  ]);

  const checkEmailDuplicate = async () => {
    //TODO : API request
    await axios
      .post('http://3.35.45.177:3000/account/checkEmail', { email: email })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          setEmailButton(true); //사용가능한경우 disable=true 버튼 블락 / disabled=false 버튼 활성화
          Alert.alert('이메일 중복 확인', '사용할 수 있는 이메일 입니다.');
          setEmailValid(true);
          nameRef.current.focus();
        } else if (res.data.status === 'FAILED') {
          Alert.alert('이메일 중복 확인', '이미 가입된 이메일입니다.');
          setEmail('');
          setEmailValid(false);
        }
      })
      .catch((err) => {
        Alert.alert('오류', '오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      });
  };

  const checkNameDuplicate = async () => {
    //TODO : API request
    await axios
      .post('http://3.35.45.177:3000/account/checkName', { name: name })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          Alert.alert('닉네임 중복 확인', '사용 가능한 닉네임입니다.');
          setNameValid(true);
          setNameButton(true);
          passwordRef.current.focus();
        } else if (res.data.status === 'FAILED') {
          Alert.alert('닉네임 중복 확인', '이미 사용중인 닉네임입니다.');
          setName('');
          setNameValid(false);
        }
      })
      .catch((err) => {
        Alert.alert('오류', '오류가 발생했습니다. 잠시 후 다시 시도해주세요');
      });
  };

  const signUp = async (email, password, name) => {
    await axios
      .post('http://3.35.45.177:3000/account/signup/', {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        switch (res.data.status) {
          case 'FAILED':
            Alert.alert('회원가입 실패', res.data.message);
            break;
          case 'SUCCESS':
            Alert.alert('회원가입', '회원가입 성공!', [
              {
                text: '로그인하기',
                onPress: () => {
                  navigation.navigate('Login');
                },
              },
            ]);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const _handleSignupButtonPress = async () => {
    try {
      // spinner.start();
      await signUp(email, password, name);
    } catch (e) {
      Alert.alert('회원가입 실패', e.message);
    } finally {
      // spinner.stop();
    }
  };

  return (
    // <KeyboardAwareScrollView extraScrollHeight={20} style={{ backgroundColor: '#ffffff' }}>
    <Container insets={insets}>
      <FormContainer>
        <SubFormContainer>
          <InputContainer>
            <SignupInput
              ref={emailRef}
              label="이메일"
              value={email}
              onChangeText={(text) => {
                setEmail(removeWhitespace(text));
                setEmailValid(false);
                setEmailButton(false);
              }}
              onSubmitEditing={() => nameRef.current.focus()}
              placeholder="이메일 주소"
              returnKeyType="next"
              width="250px"
              height="50px"
              isRight={email_right}
            />

            <SmallButton
              title={emailValid ? '사용 가능' : '중복확인'}
              onPress={() => {
                if (!validateEmail(email)) {
                  Alert.alert('유요하지 않는 이메일', '이메일을 다시 입력해주세요');
                } else {
                  //TODO : 서버에서 이메일 중복 확인
                  checkEmailDuplicate();
                }
              }}
              // disable=true 버튼 블락 / disabled=false 버튼 활성화
              disabled={emailButton}
              width="90px"
              height="40px"
            />
          </InputContainer>
          <ErrorText>{email_errorMessage}</ErrorText>
          <InputContainer>
            <SignupInput
              ref={nameRef}
              label="닉네임"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setNameValid(false);
                setNameButton(false);
              }}
              onSubmitEditing={() => {
                setName(name.trim());
                checkNameDuplicate();
              }}
              onBlur={() => setName(name.trim())}
              placeholder="닉네임을 입력하세요"
              returnKeyType="next"
              width="250px"
              height="50px"
              isRight={name_right}
            />

            <SmallButton
              title={nameValid ? '사용 가능' : '중복확인'}
              onPress={() => {
                //TODO : 닉네임 중복 체크
                checkNameDuplicate();
              }}
              // disable=true 버튼 블락 / disabled=false 버튼 활성화
              disabled={nameButton}
              width="90px"
              height="40px"
            />
          </InputContainer>
          <ErrorText>{name_errorMessage}</ErrorText>
        </SubFormContainer>
        <SubFormContainer>
          <SignupInput
            ref={passwordRef}
            label="비밀번호"
            value={password}
            onChangeText={(text) => setPassword(removeWhitespace(text))}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            placeholder="영어, 숫자, 특수문자 포함 8자 이상"
            returnKeyType="done"
            isPassword
            height="50px"
            isRight={pass_right}
          />
          <ErrorText>{password_errorMessage}</ErrorText>
          <SignupInput
            ref={passwordConfirmRef}
            label="비밀번호 확인"
            value={passwordConfirm}
            onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
            onSubmitEditing={_handleSignupButtonPress}
            placeholder="비밀번호 확인"
            returnKeyType="done"
            isPassword
            height="50px"
            isRight={passcon_right}
          />
          <ErrorText>{passwordConfirm_errorMessage}</ErrorText>
        </SubFormContainer>
      </FormContainer>
      <Button title="회원가입" onPress={_handleSignupButtonPress} disabled={disabled} />
    </Container>
    // </KeyboardAwareScrollView>
  );
};

export default Signup;
