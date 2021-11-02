import React, { useState } from 'react';
import { View, Text, Header, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { level1, level2, level3, level4 } from '../../assets/index';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  border-bottom-width: 1px;
  border-color: 'rgba(158, 150, 150, .5)';
`;
const TopView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 5px 0px;
`;
const MidView = styled.View`
  padding: 5px 0px;
  padding-right: 10px;
  margin-left: 50px;
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
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
`;
const ImageList = styled.ScrollView`
  padding: 10px 0px;
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

const UserName = styled.Text`
  font-size: 15px;
  margin-bottom: 3px;
`;
const PostDate = styled.Text`
  font-size: 13px;
`;
const PostText = styled.Text``;

const Like = styled.Text``;
const Message = styled.Text``;

const Post = ({ navigation, props, click }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => click && navigation.navigate('Post', { title: props.name, props, type: 'detail', state: 'post' })}
    >
      <Container>
        <TopView>
          <ProfileImg source={level1} />
          <PostFrontView>
            <UserName>{props.name}</UserName>
            <PostDate>{props.date}</PostDate>
          </PostFrontView>
        </TopView>
        <MidView>
          <PostText>{props.text}</PostText>
          <ImageList horizontal={true}>
            {[level1, level2, level3, level4, level1, level2].map((element) => (
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
    </TouchableWithoutFeedback>
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
