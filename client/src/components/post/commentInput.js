import React, { useState } from 'react';
import {
  View,
  Text,
  Header,
  TextInput,
  TouchableWithoutFeedback,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { level1, level2, level3, level4 } from '../../assets/index';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const Input = styled.TextInput`
  border: 1px solid black;
  width: ${Dimensions.get('window').width - 80}px;
  margin: 10px;
`;

const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  border: 1px solid black;
  align-self: center;
`;

const CommentInput = ({ navigation }) => {
  return (
    <Container>
      <ProfileImg source={level1} />
      <Input onChangeText={(text) => console.log(text)} placeholder="아무거나 입력해주세요." />
    </Container>
  );
};

export default CommentInput;
