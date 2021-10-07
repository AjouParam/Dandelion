import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { View, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import userState from '@contexts/userState';
import { Button, Image, Input } from '@components';
import { profile } from '../assets/index';

const Profile = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  background-color: #ffffff;
  padding: 15px 20px;
`;
const StyledImage = styled.Image`
  width: 60px;
  height: 60px;
  border-color: #000000;
  background-color: #ffffff;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;
const Mypage = ({ navigation }) => {
  const [email, setEmail] = useRecoilState(userState.emailState);
  const [uid, setUid] = useRecoilState(userState.uidState);
  const [photoUrl, setPhotoUrl] = useState();
  const theme = useContext(ThemeContext);
  const _handleLogoutButtonPress = async () => {
    try {
      // await logout();
      setUid('');
      setEmail('');
      navigation.navigate('Maps');
    } catch (e) {
      console.log('[Profile] logout: ', e.message);
    }
  };

  const _handlePhotoChange = async (url) => {
    try {
      // const updatedUser = await updateUserPhoto(url); 새로운 사진으로 변경 저장
      // setPhotoUrl(url); 사진 저장
    } catch (e) {
      Alert.alert('Photo Error', e.message);
    }
  };
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <Container>
        <Profile>
          <StyledImage source={profile} onChangeImage={_handlePhotoChange} rounded />
          <Text> 이메일:{email} </Text>
          <Button title="로그아웃" onPress={_handleLogoutButtonPress} width="150px" height="40px" fontSize="17px" />
        </Profile>
      </Container>

      <Container onPress={() => navigation.navigate('MypageList')}>
        <Text>리스트 1</Text>
      </Container>

      <Container onPress={() => navigation.navigate('MypageList')}>
        <Text>리스트 2</Text>
      </Container>

      <Container onPress={() => navigation.navigate('MypageList')}>
        <Text>리스트 3</Text>
      </Container>

      <Container onPress={() => navigation.navigate('MypageList')}>
        <Text>리스트 4</Text>
      </Container>
    </View>
  );
};

export default Mypage;
