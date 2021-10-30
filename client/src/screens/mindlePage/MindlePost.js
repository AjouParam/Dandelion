import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';

import utilConstant from '../../utils/utilConstant';

import Post from '@components/MindlePostContent';
import ProfileModal from '@components/Modal';
import Comment from '@components/post/comment';
import CommentInput from '@components/post/commentInput';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: ${Dimensions.get('window').height - utilConstant.postMarginHeight}px;
`;

const Divider = styled.View`
  margin-top: 10px;
  height: 1px;
  border: 0.3px solid #000000;
`;

const MessageContainer = styled.ScrollView`
  height: 400px;
  padding-top: 10px;
  background-color: #ffffff;
`;

const MindlePost = ({ route, navigation }) => {
  const userName = useRecoilValue(userState.nameState);
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setComments([
      {
        commentId: '1k2j3',
        depth: 0,
        name: '라이언',
        date: '07 09 01:55',
        state: 'visitor',
        text: '잘 보고 갑니다.',
      },
      {
        commentId: '2c2j3',
        depth: 1,
        name: '피치',
        date: '07 09 01:55',
        state: 'admin',
        text: '네엡',
      },
      {
        commentId: '1q1j3',
        depth: 0,
        name: '라이언',
        date: '07 09 01:55',
        state: 'visitor',
        text: '잘 보고 갑니다.',
      },
      {
        commentId: '1k3g3',
        depth: 0,
        name: '라이언',
        date: '07 09 01:55',
        state: 'visitor',
        text: '잘 보고 갑니다.',
      },
    ]);

    setData({
      mindleId: route.params.mindleId,
      postId: route.params.postId,
      userPhoto: route.params.userPhoto,
      name: route.params.name,
      date: route.params.date,
      updatedAt: route.params.updatedAt,
      title: route.params.title,
      text: route.params.text,
      images: route.params.images,
      likes: route.params.likes,
      comments: route.params.comments,
    });
  }, []);

  useEffect(() => {
    if (comments && data) setLoaded(true);
  }, [comments]);

  const setComment = (text) => {};

  const addComment = (text) =>
    setComments((prev) => [
      ...prev,
      {
        commentId: 'newid',
        depth: 0,
        name: userName,
        date: '30 10 20:55',
        state: 'visitor',
        text: text,
      },
    ]);

  if (loaded)
    return (
      <Container>
        <Post
          mindleId={data.mindleId}
          postId={data.postId}
          userPhoto={
            data.userPhoto ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png'
          }
          name={data.name}
          date={data.date}
          updatedAt={data.updatedAt}
          title={data.title}
          text={data.text}
          images={data.images}
          likes={data.likes}
          comments={data.comments}
          isInMindle={true}
          isInPost={true}
          setMenuOpen={setMenuOpen}
          setRefresh={route.params.setRefresh}
          navigation={navigation}
        />
        <MessageContainer>
          {comments.map((element) => (
            <Comment
              key={element.commentId}
              depth={element.depth}
              props={{ name: element.name, date: element.date, state: element.state, text: element.text }}
            />
          ))}
        </MessageContainer>
        <CommentInput functionCall={{ addComment }} />
        <ProfileModal width="180px" height="100px" modalVisible={menuOpen} setModalVisible={setMenuOpen}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'space-evenly',
              padding: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
                onPress={() => {
                  Alert.alert('쪽지 보내기', '쪽지 보내기 화면으로 이동');
                }}
              >
                <Text style={{ fontSize: 16 }}>쪽지 보내기</Text>
              </TouchableOpacity>
            </View>
            <Divider />
            <View
              style={{
                flex: 1,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                width: '100%',
                marginTop: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setMenuOpen(false);
                }}
                style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
              >
                <Text style={{ fontSize: 16, color: 'red' }}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ProfileModal>
      </Container>
    );
  else
    return (
      <Container>
        <ActivityIndicator size="large" color="0000ff" />
      </Container>
    );
};
export default MindlePost;
