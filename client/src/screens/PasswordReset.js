import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, Button } from '@components';

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
const PasswordContainer = styled.View``;

const PasswordReset = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  //TODO : 전송 -> CHECK -> verifyCode입력 -> 이메일, 인증번호 전송, 확인 -> check -> 새 비밀번호 입력 -> 이메일, 새 비밀번호 전송
  const [emailSent, setEmailSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const insets = useSafeAreaInsets();

  const sendEmail = async () => {
    try {
      await axios.post('http://10.0.2.2:3000/account/auth', { email: email }).then((res) => {
        if (res.status === 'SUCCESS') {
          setEmailSent(true);
          Alert.alert('확인코드 전송', '입력하신 이메일로 확인코드를 전송하였습니다. 확인해주세요');
        } else if (res.status === 'FAILED') {
          throw new Error(res.data.message);
        }
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
          if (res.status === 'SUCCESS') {
            setEmailSent(false);
            setVerified(true);
            Alert.alert('확인코드 전송', '입력하신 이메일로 확인코드를 전송하였습니다. 확인해주세요');
          } else if (res.status === 'FAILED') {
            throw new Error(res.data.message);
          }
        });
    } catch (error) {
      Alert.alert('오류', error.message);
    }
  };

  const setNewPassword = () => {
    //TODO : /account/resetPwd
    try {
      // await axios
      //   .post('http://10.0.2.2:3000/account/resetPwd', { email: email, password: passwordConfirm })
      //   .then((res) => {
      //     if (res.status === 'SUCCESS') {
      //       setEmailSent(false);
      //       setVerified(true);
      //       Alert.alert('확인코드 전송', '입력하신 이메일로 확인코드를 전송하였습니다. 확인해주세요');
      //     } else if (res.status === 'FAILED') {
      //       throw new Error(res.data.message);
      //     }
      //   });
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
              title="전송"
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
              title="전송"
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
              onSubmitEditing={() => {}}
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
          </>
        )}
      </FormContainer>
      <SubmitContainer>
        <Button
          title="변경"
          onPress={() => {
            setNewPassword();
          }}
        />
      </SubmitContainer>
    </Container>
  );
};
export default PasswordReset;
