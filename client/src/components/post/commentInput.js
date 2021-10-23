import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import {
  View,
  Text,
  Header,
  TextInput,
  TouchableWithoutFeedback,
  Button,
  Dimensions,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import { level1, level2, level3, level4 } from '../../assets/index';
import styled from 'styled-components/native';

const Container = styled.View`
  position: absolute;
  display: flex;
  flex-direction: row;
  padding: 0px 10px;
  bottom: 10px;
  /* top: ${Dimensions.get('window').height - 150}px; */
  background-color: white;
`;
const Input = styled.TextInput`
  border: 1px solid black;
  margin: 10px;
  width: ${Dimensions.get('window').width - 80}px;
`;

const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  border: 1px solid black;
  align-self: center;
`;

const CommentInput = ({ navigation, functionCall }) => {
  const { addComment } = functionCall;
  const [addHeight, setAddHeight] = useState(0);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setAddHeight(250);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setAddHeight(0);
    });
  }, []);
  return (
    <Container style={{ marginBottom: addHeight }}>
      <ProfileImg source={level1} />
      <Input
        onPress={() => setAddHeight(200)}
        onSubmitEditing={() => addComment(inputText)}
        onChangeText={(text) => setInputText(text)}
        placeholder="아무거나 입력해주세요."
      />
    </Container>
  );
};

export default CommentInput;
