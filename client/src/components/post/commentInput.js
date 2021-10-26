import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { View, Text, Image, TextInput, Dimensions } from 'react-native';

import { level1 } from '../../assets/index';
import utilConstant from '../../utils/utilConstant';

const Container = styled.View`
  position: absolute;
  display: flex;
  flex-direction: row;
  padding: 0px 10px;
  bottom: 10px;
  background-color: white;
`;
const Input = styled.TextInput`
  border: 1px solid black;
  margin: 10px;
  width: ${Dimensions.get('window').width - utilConstant.marginWidth}px;
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
  const [addHeight, setAddHeight] = useState(utilConstant.defaultKeyboardHeight);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setAddHeight(utilConstant.KeyboardHeight);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setAddHeight(utilConstant.defaultKeyboardHeight);
    });
  }, []);

  return (
    <Container style={{ marginBottom: addHeight }}>
      <ProfileImg source={level1} />
      <Input
        onSubmitEditing={() => addComment(inputText)}
        onChangeText={(text) => setInputText(text)}
        placeholder="아무거나 입력해주세요."
      />
    </Container>
  );
};

export default CommentInput;
