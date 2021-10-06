import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';

const BoardContainer = styled.View`
  width: 100%;
  padding: 10px 10px;
  justify-content: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;
const BoardUserInfo = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const BoardUserImageContainer = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  padding: 5px 5px;
  align-items: center;
  justify-content: center;
`;
const BoardUserImage = styled.Image`
  width: 40px;
  height: 40px;
`;
const BoardUserName = styled.Text`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 3px;
`;
const BoardContents = styled.View`
  margin-top: 5px;
  padding-left: 55px;
`;
const BoardContentTextContainer = styled.View`
  min-height: 60px;
  max-height: 100px;
  justify-content: flex-start;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
`;
const BoardContentImageContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const BoardContentImage = styled.View`
  border: 1px solid black;
  width: 70px;
  height: 55px;
  margin-right: 10px;
`;
const BoardTipContainer = styled.View`
  height: 30px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MindlePostContent = ({
  userPhoto,
  name,
  date,
  title,
  text,
  images,
  likes,
  comments,
  setMenuOpen = () => {},
  navigation = null,
  isPost = false,
  isInPost = false,
}) => {
  return (
    <BoardContainer>
      <BoardUserInfo>
        <BoardUserImageContainer
          onPress={() => {
            if (isPost) setMenuOpen(true);
          }}
        >
          <BoardUserImage source={{ uri: userPhoto }} />
        </BoardUserImageContainer>
        <View style={{ flex: 1, padding: 5 }}>
          <BoardUserName
            onPress={() => {
              if (isPost) setMenuOpen(true);
            }}
          >
            {name}
          </BoardUserName>
          <Text>{date}</Text>
        </View>
      </BoardUserInfo>
      <BoardContents>
        <BoardContentTextContainer>
          <Title
            onPress={() => {
              if (isPost && !isInPost)
                navigation.navigate('MindlePost', {
                  userPhoto: userPhoto,
                  name: name,
                  date: date,
                  title: title,
                  text: text,
                  images: images,
                  likes: likes,
                  comments: comments,
                });
            }}
          >
            {title}
          </Title>
          <Text
            onPress={() => {
              if (isPost && !isInPost)
                navigation.navigate('MindlePost', {
                  userPhoto: userPhoto,
                  name: name,
                  date: date,
                  title: title,
                  text: text,
                  images: images,
                  likes: likes,
                  comments: comments,
                });
            }}
          >
            {text}
          </Text>
        </BoardContentTextContainer>
        <BoardContentImageContainer>
          <BoardContentImage />
          <BoardContentImage />
          <BoardContentImage />
        </BoardContentImageContainer>
        <BoardTipContainer>
          <TouchableOpacity>
            <Text>Like {likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Comments {comments}</Text>
          </TouchableOpacity>
        </BoardTipContainer>
      </BoardContents>
    </BoardContainer>
  );
};
export default MindlePostContent;
