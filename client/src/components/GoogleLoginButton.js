import React, { useState } from 'react';
import styled from 'styled-components/native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import decode from 'jwt-decode';
import { Alert } from 'react-native';

const Container = styled.View`
  align-items: center;
  width: 300px;
  margin-top: 10px;
`;

GoogleSignin.configure({
  webClientId: '168048087924-9pvl2pd6hr6a394eplm2jpjf8jk7qs7s.apps.googleusercontent.com',
  offlineAccess: true,
});

const GoogleLoginButton = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      try {
        axios.post('http://10.0.2.2:3000/account/google', userInfo.idToken).then((res) => {
          if (res.data.status === 'SUCCESS') {
            try {
              AsyncStorage.setItem('token', res.data.accessToken);
              const userData = decode(res.data.accessToken);
              setEmail(userData.email); //서버로 부터 받는 이메일 주소가 없어 임시 입력 받은 이메로 설정
              setUid(res.data.accessToken);
            } catch (error) {
              Alert.alert('로그인 실패', '구글 계정 로그인에 실패하였습니다. 다시 시도해주세요');
            }
          } else if (res.data.status === 'FAILED') {
            Alert.alert('로그인 실패', '구글 계정 인증에 실패하였습니다. 다시 시도해주세요');
          }
        });
      } catch (err) {
        Alert.alert('로그인 실패', '서버와의 통신에 실패하였습니다. 잠시 후 다시 시도해주세요.');
      }
      /***
       * {
       *    "idToken": "",
       *    "scopes": ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
       *    "serverAuthCode": "4/0AX4XfWgg8SuZfxQO7MIkHciUnXKQ0XNxnnRvBFYC60aIL8zi8_oACrIAOLfx3wG9ikUjzw",
       *    "user": {
       *      "email": "dmstmdrbs98@gmail.com",
       *      "familyName": null,
       *      "givenName": "승균",
       *      "id": "103518316964689714707",
       *      "name": "승균",
       *      "photo": "https://lh3.googleusercontent.com/a/AATXAJwM5cLCU5K6-4zus0tYCmZTq-6er6bv9Bd7k0JC=s96-c"
       *  }
       * }
       */
    } catch (error) {
      Alert.alert('로그인 실패', '구글 계정 로그인에 실패하였습니다. 다시 시도해주세요.');
    }
  };
  return (
    <Container>
      <GoogleSigninButton
        onPress={signIn}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        style={{ width: '100%', height: 60 }}
      />
    </Container>
  );
};
export default GoogleLoginButton;
