import React, { useState } from 'react';
import { View, Text, Header, TouchableWithoutFeedback, Button, Dimensions, TouchableOpacity } from 'react-native';
import { level1, level2, level3, level4 } from '../../assets/index';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const CommentContainer = styled.View`
  margin: 0px 20px;
`;
const TopContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: ${Dimensions.get('window').width / 2}px;
  justify-content: space-between;
`;
const BottomContainer = styled.View``;
const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  border: 1px solid black;
`;
const User = styled.Text``;
const Date = styled.Text``;
const ChoiceButton = styled.Text``;
const CommentText = styled.Text``;

const Comment = ({ navigation, props, depth }) => {
  return (
    <Container style={{ marginLeft: depth * 50 }}>
      <ProfileImg source={level1} />
      <CommentContainer>
        <TopContainer>
          <User>{props.name}</User>
          <Date>{props.date}</Date>
          <TouchableOpacity>
            <ChoiceButton>{props.state === 'visitor' ? '답글' : '삭제'}</ChoiceButton>
          </TouchableOpacity>
        </TopContainer>
        <BottomContainer>
          <CommentText>{props.text}</CommentText>
        </BottomContainer>
      </CommentContainer>
    </Container>
  );
};

export default Comment;
