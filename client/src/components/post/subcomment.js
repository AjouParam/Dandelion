import React, { useState } from 'react';
import { Alert, Text, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from 'react-native';
import { level1, level2, level3, level4 } from '../../assets/index';
import styled from 'styled-components/native';
const DefaultProfileImage = require('../../assets/profile/profile_default.png');
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
const BottomContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const SubContainer = styled.View``;
const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 100px;
`;
const User = styled.Text``;
const Date = styled.Text``;
const ChoiceButton = styled.TouchableOpacity`
  margin: 0px 5px;
`;
const CommentText = styled.Text``;

const SubComment = ({ navigation, props, depth }) => {
  const {
    name,
    state,
    text,
    createdAt,
    updatedAt,
    _id,
    _user,
    _post,
    __v,
    isDeleted,
    deleteSubComment,
    _parentComment,
  } = props;
  console.log('subcomment', props);
  return (
    <Container style={{ marginLeft: (depth - 1) * 50 }}>
      <CommentContainer>
        <TopContainer>
          <ProfileImg source={DefaultProfileImage} />
          <SubContainer>
            <User>{name ? name : _user.name}</User>
            <Date>{createdAt !== updatedAt ? createdAt : `${updatedAt} (수정됨)`}</Date>
          </SubContainer>
          {!state && (
            <TouchableOpacity>
              <ChoiceButton
                onPress={() => {
                  Alert.alert('답글 삭제', '답글을 삭제하시겠습니까?', [
                    { text: '취소', style: 'cancel' },
                    {
                      text: '확인',
                      onPress: () => {
                        deleteSubComment(_parentComment, _id);
                      },
                    },
                  ]);
                }}
              >
                <Text> 삭제</Text>
              </ChoiceButton>
            </TouchableOpacity>
          )}
        </TopContainer>
        <BottomContainer>
          <CommentText>{isDeleted ? '삭제된 댓글입니다.' : text}</CommentText>
        </BottomContainer>
      </CommentContainer>
    </Container>
  );
};

export default SubComment;
