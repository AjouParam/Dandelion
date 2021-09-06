import React, { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, Button } from '@components';
import { validatePassword } from '@utils/common';

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;
const StyledText = styled.Text`
  font-size: 16px;
`;
const FormContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-start;
  padding: 20px;
`;
const InputContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;
const SubmitContainer = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;
const PasswordContainer = styled.View``;

const PasswordReset = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyCount, setVerifyCount] = useState(0);
  //TODO : 전송 -> CHECK -> verifyCode입력 -> 이메일, 인증번호 전송, 확인 -> check -> 새 비밀번호 입력 -> 이메일, 새 비밀번호 전송
  const [emailSent, setEmailSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [pwdErrorMessage, setPwdErrorMessage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!validatePassword(password)) {
      setPwdErrorMessage('영어, 숫자, 특수문자 포함 8자 이상을 입력하세요.');
    } else {
      if (password && passwordConfirm && password !== passwordConfirm) {
        setPwdErrorMessage('비밀번호가 다릅니다. 다시 확인해주세요.');
      } else {
        setPwdErrorMessage('');
      }
    }
  }, [password, passwordConfirm]);

  const sendEmail = async () => {
    try {
      await axios
        .post('http://10.0.2.2:3000/account/auth', { email: email })
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            setEmailSent(true);
            Alert.alert('확인코드 전송', '입력하신 이메일로 확인코드를 전송하였습니다. 확인해주세요');
          } else if (res.data.status === 'FAILED') {
            // throw new Error(res.data.message);
            Alert.alert('오류', '해당 이메일로 가입된 정보를 찾을 수 없습니다.');
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      Alert.alert('오류', error.message);
    }
  };

  const sendEmailVerifyCode = async () => {
    //TODO : /account/verifyCode
    try {
      await axios
        .post('http://10.0.2.2:3000/account/verifyCode', { email: email, verifyCode: verifyCode })
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            Alert.alert('인증코드 확인', '인증코드가 확인되었습니다. 새로운 비밀번호를 입력해주세요', [
              {
                text: '확인',
                onPress: () => {
                  setEmailSent(false);
                  setVerified(true);
                },
              },
            ]);
          } else if (res.data.status === 'FAILED') {
            if (verifyCount < 5) {
              Alert.alert('인증 코드 불일치', '입증코드가 틀렸습니다. 다시 시도해주세요.');
              setVerifyCount((prevCount) => prevCount + 1);
            } else {
              Alert.alert(
                '시도 횟수 초과',
                '인증 코드 입력 제한 횟수 (5회)를 초과하였습니다. 처음부터 다시 시도해주세요',
                [
                  {
                    text: '확인',
                    onPress: () => {
                      setEmailSent(false);
                      setVerifyCode('');
                      setEmail('');
                    },
                  },
                ],
              );
            }
          }
        });
    } catch (error) {
      Alert.alert('오류', error.message);
    }
  };

  const setNewPassword = async () => {
    //TODO : /account/resetPwd
    try {
      await axios
        .post('http://10.0.2.2:3000/account/resetPwd', { email: email, password: passwordConfirm })
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            Alert.alert('비밀번호 재설정', '비밀번호를 재설정하였습니다. 로그인을 해주세요.', [
              {
                text: '확인',
                onPress: () => {
                  navigation.navigate('Login');
                },
              },
            ]);
          } else if (res.data.status === 'FAILED') {
            throw new Error(res.data.message);
          }
        });
    } catch (error) {
      Alert.alert('오류', error.message);
    }
  };
  return (
    <Container insets={insets}>
      <FormContainer>
        <InputContainer>
          <Input
            ref={emailRef}
            label=""
            placeholder="이메일"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            disabled={emailSent || verified}
          />
          {!emailSent && !verified && (
            <Button
              title="찾기"
              onPress={() => {
                sendEmail();
              }}
              width="60px"
              height="40px"
            />
          )}
        </InputContainer>
        {emailSent && (
          <InputContainer>
            <Input
              value={verifyCode}
              placeholder="이메일 인증 코드 입력"
              onChangeText={(text) => {
                setVerifyCode(text);
              }}
              width="250px"
            />
            <Button
              title="확인"
              onPress={() => {
                sendEmailVerifyCode();
              }}
              width="60px"
              height="40px"
            />
          </InputContainer>
        )}
        {verified && (
          <>
            <Input
              ref={passwordRef}
              label=""
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              onSubmitEditing={() => {
                passwordConfirmRef.current.focus();
              }}
              placeholder="비밀번호"
              returnKeyType="done"
              isPassword
              width="300px"
            />
            <Input
              ref={passwordConfirmRef}
              label=""
              value={passwordConfirm}
              onChangeText={(text) => {
                setPasswordConfirm(text);
              }}
              onSubmitEditing={() => {}}
              placeholder="비밀번호 확인"
              returnKeyType="done"
              isPassword
              width="300px"
            />
            <ErrorText>{pwdErrorMessage}</ErrorText>
          </>
        )}
      </FormContainer>
      <SubmitContainer>
        {verified && (
          <Button
            title="변경"
            onPress={() => {
              if (!password || !passwordConfirm || passwordConfirm !== password) {
                Alert.alert('실패', '비밀번호를 확인해주세요.');
              } else {
                setNewPassword();
              }
            }}
          />
        )}
      </SubmitContainer>
    </Container>
  );
};
export default PasswordReset;
