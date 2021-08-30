import React, { useState } from 'react';
import styled from 'styled-components/native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

const Container = styled.View`
  align-items: center;
  padding: 10px 10px;
  border-radius: 25px;
`;
const Text = styled.Text``;
const UserImage = styled.Image`
  margin: 10px;
  width: 100;
  height: 100;
`;

GoogleSignin.configure({
  webClientId: '168048087924-9pvl2pd6hr6a394eplm2jpjf8jk7qs7s.apps.googleusercontent.com',
  offlineAccess: true,
});

const GoogleLoginButton = () => {
  const [userGoogleInfo, setUserGoogleInfo] = useState({});
  const [loaded, setLoaded] = useState(false);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await setUserGoogleInfo(userInfo);
      setLoaded(true);
      console.log('success');
      console.log(userInfo);
      /*userInfo={
        idToken:'',
        scopes:['url'],
        serverAuthCode:'',
        user:{
          email:'',
          familyName:'',
          givenName:'',
          id:'',
          name:'',
          photo:'url'
        }
      }

      */
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
      console.log(error.message);
    }
  };
  return (
    <>
      <GoogleSigninButton
        onPress={signIn}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        style={{ width: '100%', height: 60 }}
      />
      {loaded ? (
        <Container>
          <Text>{userGoogleInfo.user.name}</Text>
          <Text>{userGoogleInfo.user.email}</Text>
          <UserImage source={{ uri: userGoogleInfo.user.photo }} />
        </Container>
      ) : null}
    </>
  );
};
export default GoogleLoginButton;
