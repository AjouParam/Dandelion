import React from 'react';
import { View, Text, Alert } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;
const HotSpot = ({ navigation }) => {
  return (
    <>
      <Container onPress={() => Alert.alert('구현 예정')}>
        <Text>핫스팟 구현할 게시물1</Text>
      </Container>

      <Container onPress={() => Alert.alert('구현 예정')}>
        <Text>핫스팟 구현할 게시물2</Text>
      </Container>

      <Container onPress={() => Alert.alert('구현 예정')}>
        <Text>핫스팟 구현할 게시물3</Text>
      </Container>

      <Container onPress={() => Alert.alert('구현 예정')}>
        <Text>핫스팟 구현할 게시물4</Text>
      </Container>
    </>
  );
};

export default HotSpot;
