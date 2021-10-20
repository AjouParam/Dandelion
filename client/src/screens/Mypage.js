import React from 'react';
import styled from 'styled-components/native';
import { View, Text, Alert } from 'react-native';
import userState from '@contexts/userState';
import { useRecoilState } from 'recoil';
import { profile } from '../assets/index'; //dummy
import { Button, ImageButton } from '@components';
import PostContainer from './PostContainer';
const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;
const LogoutContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
`;
const [email, setEmail] = useRecoilState(userState.emailState);
const [uid, setUid] = useRecoilState(userState.uidState);
const [Username, setUsername] = useRecoilState(userState.nameState);

const Mypage = ({ navigation }) => {
  const _handleLogoutButtonPress = async () => {
    try {
      // await logout();
      setUid('');
      setEmail('');
      setUsername('');
      navigation.navigate('Maps');
    } catch (e) {
      console.log('[Profile] logout: ', e.message);
    }
  };
  return (
    <>
      <LogoutContainer>
        <View
          style={{
            alignSelf: 'flex-start', //for align to right
          }}
        >
          <ImageButton src={profile} onPress={() => {}} rounded />
        </View>
        <View
          style={{
            alignSelf: 'center', //for align to right
          }}
        >
          <Text>이름: {Username}</Text>
        </View>
        <View
          style={{
            alignSelf: 'center', //for align to right
          }}
        >
          <Text>이메일: {email}</Text>
        </View>
      </LogoutContainer>
      <LogoutContainer>
        <Button
          title="로그아웃"
          onPress={() => {
            Alert.alert('로그아웃', '로그아웃을 하시려면 확인 버튼을 누르세요.', [
              {
                text: '취소',
                style: 'cancel',
              },
              {
                text: '확인',
                onPress: _handleLogoutButtonPress,
              },
            ]);
          }}
        />
      </LogoutContainer>
      <Container onPress={() => navigation.navigate('PostContainer', { title: '내가 쓴 글', type: 'post' })}>
        <Text>내가 쓴 글</Text>
      </Container>

      <Container onPress={() => navigation.navigate('PostContainer', { title: '내가 심은 민들레', type: 'mindle' })}>
        <Text>내가 심은 민들레</Text>
      </Container>

      <Container onPress={() => navigation.navigate('PostContainer', { title: '쿠폰 목록' })}>
        <Text>쿠폰 목록</Text>
      </Container>

      <Container onPress={() => navigation.navigate('PostContainer', { title: '쪽지' })}>
        <Text>쪽지</Text>
      </Container>

      <Container onPress={() => navigation.navigate('PostContainer', { title: '권한 설정' })}>
        <Text>권한 설정</Text>
      </Container>

      <Container onPress={() => navigation.navigate('PostContainer', { title: '등급 설명' })}>
        <Text>등급 설명</Text>
      </Container>

      <Container onPress={() => navigation.navigate('PostContainer', { title: '무료 광고' })}>
        <Text>무료 광고</Text>
      </Container>

      <Container onPress={() => navigation.navigate('PostContainer', { title: '회원 탈퇴' })}>
        <Text>회원 탈퇴</Text>
      </Container>
    </>
  );
};

export default Mypage;
