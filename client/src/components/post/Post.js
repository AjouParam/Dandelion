import React, { useState } from 'react';
import { View, Text, Header, Image, ScrollView } from 'react-native';
import { level1, level2, level3, level4 } from '../../assets/index';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const TopView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const MidView = styled.View`
  margin: 0px 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const BottomView = styled.View`
  display: flex;
  flex-direction: row;
  margin: 0px 0px 0px 50px;
  justify-content: space-between;
`;
const PostFrontView = styled.View`
  margin: 0px 5px;
  display: flex;
  flex-direction: column;
`;
const ImageList = styled.ScrollView`
  display: flex;
  flex-direction: row;
  overflow: scroll;
`;
const LikeContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const MessageContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  border: 1px solid black;
`;
const PostImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  border: 1px solid black;
`;
const LikeImage = styled.Image`
  width: 20px;
  height: 20px;
`;
const MessageImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const MindleName = styled.Text``;
const MindleDate = styled.Text``;
const PostText = styled.Text``;

const Like = styled.Text``;
const Message = styled.Text``;

const Post = ({ navigation, props }) => {
  return (
    <Container>
      <TopView>
        <ProfileImg source={level1} />
        <PostFrontView>
          <MindleName>{props.name}</MindleName>
          <MindleDate>{props.date}</MindleDate>
        </PostFrontView>
      </TopView>
      <MidView>
        <PostText>{props.text}</PostText>
        <ImageList horizontal={true}>
          {props.imageList.map((element) => (
            <PostImage source={element} />
          ))}
        </ImageList>
      </MidView>
      <BottomView>
        <LikeContainer>
          <LikeImage source={level2} />
          <Like>{props.like}</Like>
        </LikeContainer>
        <MessageContainer>
          <MessageImage source={level3} />
          <Message>{props.message}</Message>
        </MessageContainer>
      </BottomView>
    </Container>
  );
};

Post.defaultProps = {
  name: '아무개',
  date: '2021.07.19',
  text: '많아요~',
  imageList: [level1, level2, level3, level4, level1, level2],
  like: 6,
  message: 23,
};

export default Post;
