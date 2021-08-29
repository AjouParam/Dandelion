import React, { useState } from 'react';
import styled from 'styled-components/native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

const Container = styled.View``;
const Text = styled.Text``;
const UserImage = styled.Image`
  width: 100;
  height: 100;
`;

GoogleSignin.configure({
  webClientId: '47998835212-fn7597uf5chshrelctcps326isflu2si.apps.googleusercontent.com',
  offlineAccess: true,
});

const GoogleLoginButton = () => {
  const [userGoogleInfo, setUserGoogleInfo] = useState({});
  const [loaded, setLoaded] = useState(false);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn;
      await setUserGoogleInfo(userInfo);
      setLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <GoogleSigninButton
        onPress={signIn}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        style={{ width: 100, height: 100 }}
      />
      {loaded ? (
        <Container>
          <Text>{userGoogleInfo.user.name}</Text>
          <Text>{userGoogleInfo.user.email}</Text>
          <UserImage source={{ uri: userGoogleInfo.user.photo }} />
        </Container>
      ) : (
        <Text>Not SignedIn</Text>
      )}
    </>
  );
};
export default GoogleLoginButton;
