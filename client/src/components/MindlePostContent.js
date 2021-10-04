import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';

const BoardContainer = styled.View`
  height: 220px;

  width: 100%;
  padding: 10px 10px;
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
  font-weight: 600;
  margin-bottom: 3px;
`;
const BoardContents = styled.View`
  padding-top: 10px;
  padding-left: 55px;
`;
const BoardContentTextContainer = styled.View`
  height: 50px;
  justify-content: flex-start;
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
  userName,
  date,
  content,
  photoContents,
  likes,
  commentsNum,
  setMenuOpen = () => {},
  navigation = null,
  isPost = false,
}) => {
  if (!isPost)
    return (
      <>
        <BoardContainer>
          <BoardUserInfo>
            <BoardUserImageContainer
              onPress={() => {
                setMenuOpen(true);
              }}
            >
              <BoardUserImage source={{ uri: userPhoto }} />
            </BoardUserImageContainer>
            <View style={{ flex: 1, padding: 5 }}>
              <BoardUserName
                onPress={() => {
                  setMenuOpen(true);
                }}
              >
                {userName}
              </BoardUserName>
              <Text>{date}</Text>
            </View>
          </BoardUserInfo>
          <BoardContents>
            <BoardContentTextContainer>
              <Text
                onPress={() => {
                  navigation.navigate('MindlePost', {
                    userPhoto: userPhoto,
                    userName: userName,
                    date: date,
                    content: content,
                    photoContents: photoContents,
                    likes: likes,
                    commentsNum: commentsNum,
                  });
                }}
              >
                {content}
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
                <Text>Comments {commentsNum}</Text>
              </TouchableOpacity>
            </BoardTipContainer>
          </BoardContents>
        </BoardContainer>
      </>
    );
  else {
    return (
      <BoardContainer>
        <BoardUserInfo>
          <BoardUserImageContainer>
            <BoardUserImage source={{ uri: userPhoto }} />
          </BoardUserImageContainer>
          <View style={{ flex: 1, padding: 5 }}>
            <BoardUserName>{userName}</BoardUserName>
            <Text>{date}</Text>
          </View>
        </BoardUserInfo>
        <BoardContents>
          <BoardContentTextContainer>
            <Text>{content}</Text>
          </BoardContentTextContainer>
        </BoardContents>
      </BoardContainer>
    );
  }
};
export default MindlePostContent;
