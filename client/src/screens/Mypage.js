import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { MypageList } from './MypageList';
const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;
const Mypage = ({ navigation }) => {
  return (
    <>
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
    </>
  );
};

export default Mypage;
