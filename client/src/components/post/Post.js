import React, { useState } from 'react';
import { View, Text, Header, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { level1, level2, level3, level4 } from '../../assets/index';
import styled from 'styled-components/native';
import axios from 'axios';
const DefaultProfileImage = require('../../assets/profile/profile_default.png');
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
  align-items: center;
  justify-content: center;
`;
const MessageContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 100px;
`;
const PostImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
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
const PostTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Message = styled.Text``;

const LikeButtonImage = styled.Image`
  width: 35px;
  height: 55px;
`;
const CommentIcon = styled.Image`
  width: 35px;
  height: 55px;
`;
const CommentText = styled.Text``;
const LikeText = styled.Text``;
const Unlike = require('../../assets/post/like_unclicked.png');
const Like = require('../../assets/post/like_clicked.png');
const CommentImage = require('../../assets/post/comment.png');
const LikeButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 50px;
  height: 35px;
  align-items: center;
  justify-content: center;
`;
const Post = ({ navigation, props, click }) => {
  // console.log('innerPost', props);
  const [likesNum, setLikesNum] = useState(props.likes);
  const [like, setLike] = useState(props.userLike);
  const toggleLike = async () => {
    // /:dandelionId/:postId/like
    await axios.post(`${props._dandelion}/${props._id}/like`).then((res) => {
      if (res.data.status === 'SUCCESS') {
        console.log(res.data.message, res.data.data.currentLikeStatus);
        setLike(res.data.data.currentLikeStatus);
        setLikesNum((prev) => (res.data.data.currentLikeStatus ? prev + 1 : prev - 1));
        setLikesList(res.data.data.currentLikeStatus, likesNum, postId);
      }
    });
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => click && navigation.navigate('Post', { title: props.name, props, type: 'detail', state: 'post' })}
    >
      <Container>
        <TopView>
          <ProfileImg source={DefaultProfileImage} />
          <PostFrontView>
            <UserName>{props._user.name}</UserName>
            <PostDate>{props.createdAt}</PostDate>
          </PostFrontView>
        </TopView>
        <MidView>
          <PostTitle>{props.title}</PostTitle>
          <PostText>{props.text}</PostText>
          <ImageList horizontal={true}>
            {props.images.map(
              (element) => (
                <PostImage source={{ uri: element }} />
              ),
              // console.log(element);
            )}
          </ImageList>
        </MidView>
        <BottomView>
          <LikeContainer>
            <LikeButton
              onPress={() => {
                toggleLike();
              }}
            >
              <LikeButtonImage source={like ? Like : Unlike} />
              <LikeText>{props.likes}</LikeText>
            </LikeButton>
          </LikeContainer>
          <MessageContainer>
            <CommentIcon source={CommentImage} />
            <CommentText>{props.comments}</CommentText>
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
