import React from 'react';
import styled from 'styled-components/native';
import { View, Text, Alert, Dimensions } from 'react-native';
import userState from '@contexts/userState';
import { useRecoilState } from 'recoil';
// import { DefaultProfile } from '../assets/index'; //dummy
import { Button, ImageButton } from '@components';
import PostContainer from './PostContainer';

const DefaultProfile = require('../assets/profile/profile_default.png');

const DEVICE_WIDTH = Dimensions.get('screen').width;
const MypageContainer = styled.ScrollView`
  flex: 1;
  background-color: #f9f9f9;
`;
const MyPageList = styled.View`
  width: ${DEVICE_WIDTH}px;
`;
const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 10px 20px;
  height: 50px;
  opacity: 1;
  text-align: left;
`;

const UserInfoContainer = styled.View`
  height: 216px;
  width: ${DEVICE_WIDTH}px;
  margin: 15px 0px;
  background-color: #ffffff;
`;

const UserInfo = styled.View`
  height: 120px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;
const UserContentsContainer = styled.View`
  flex-direction: row;
  width: ${DEVICE_WIDTH}px;
  height: 96px;
  border-top-width: 1px;
  border-top-color: #eeeeee;
  opacity: 1;
  justify-content: space-evenly;
  align-items: center;
`;
const UserContent = styled.TouchableOpacity`
  width: ${DEVICE_WIDTH / 3}px;
  height: 96px;
  border-right-width: 1px;
  border-right-color: #eeeeee;
  padding: 5px;
  align-items: center;
  justify-content: center;
  color: #959595;
`;

const ListSection = styled.View`
  margin-bottom: 15px;
  background-color: #ffffff;
`;
const Profile = styled.Image`
  border-radius: 100px;
  width: 60px;
  height: 60px;
  margin: 10px;
  margin-left: 20px;
`;

const NameText = styled.Text`
  font-size: 18px;
  color: #424242;
  margin-bottom: 5px;
  font-weight: 800;
`;
const EmailText = styled.Text`
  font-size: 14px;
  height: 16px;
  color: #424242;
`;
const ContainerText = styled.Text`
  font-size: 16px;
  color: #424242;
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
    <MypageContainer>
      <UserInfoContainer>
        <UserInfo>
          <Profile source={DefaultProfile} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center', //for align to right
            }}
          >
            <NameText>{Username}</NameText>
            <EmailText>{email}</EmailText>
          </View>
        </UserInfo>

        <UserContentsContainer>
          <UserContent>
            <Text>씨앗</Text>
          </UserContent>
          <UserContent onPress={() => navigation.navigate('PostContainer', { title: '쪽지', type: 'mail' })}>
            <Text>쪽지</Text>
            {/* <Text style={{ color: '#EFB233', fontWeight: 700, fontSize: 18 }}>3</Text> */}
          </UserContent>
          <UserContent>
            <Text>쿠폰</Text>
          </UserContent>
        </UserContentsContainer>
      </UserInfoContainer>
      <MyPageList>
        <ListSection>
          <Container onPress={() => navigation.navigate('PostContainer', { title: '내가 쓴 글', type: 'post' })}>
            <ContainerText>내가 쓴 글</ContainerText>
          </Container>
          <Container
            onPress={() => navigation.navigate('PostContainer', { title: '내가 심은 민들레', type: 'mindle' })}
          >
            <ContainerText>내가 심은 민들레</ContainerText>
          </Container>

          <Container onPress={() => navigation.navigate('PostContainer', { title: '쿠폰 목록' })}>
            <ContainerText>쿠폰 목록</ContainerText>
          </Container>
        </ListSection>

        <ListSection>
          <Container onPress={() => navigation.navigate('PostContainer', { title: '권한 설정' })}>
            <ContainerText>권한 설정</ContainerText>
          </Container>

          <Container onPress={() => navigation.navigate('PostContainer', { title: '등급 설명' })}>
            <ContainerText>등급 설명</ContainerText>
          </Container>

          <Container onPress={() => navigation.navigate('PostContainer', { title: '무료 광고' })}>
            <ContainerText>무료 광고</ContainerText>
          </Container>
        </ListSection>

        <ListSection>
          <Container>
            <ContainerText
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
            >
              로그아웃
            </ContainerText>
          </Container>
          <Container onPress={() => navigation.navigate('PostContainer', { title: '회원 탈퇴' })}>
            <ContainerText style={{ color: '#777777' }}>회원 탈퇴</ContainerText>
          </Container>
        </ListSection>
      </MyPageList>
    </MypageContainer>
  );
};

export default Mypage;
