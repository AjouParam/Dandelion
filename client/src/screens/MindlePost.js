import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import Post from '@components/MindlePostContent';
import ProfileModal from '@components/Modal';
import { Button } from '@components/index';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Comments = styled.ScrollView`
  border-top-width: 1px;
  padding: 5px;
`;
const Comment = styled.View`
  margin: 5px;
`;
const Text = styled.Text``;
const Divider = styled.View`
  margin-top: 10px;
  height: 1px;
  border: 0.3px solid #000000;
`;
const CommentSubmitForm = styled.View`
  display: flex;
  flex-direction: row;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
`;

const CommentInput = styled.TextInput`
  height: 90%;
  width: 70%;
  padding: 5px;
  flex: 1;
  border-radius: 10px;
`;
const CommentSubmitButton = styled.TouchableOpacity`
  width: 20%;
  padding: 5px;
  height: 90%;
  color: #ddd;
  align-items: center;
  justify-content: center;
`;

const MindlePost = ({ route, navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    setComments([
      { writer: '익명1', comment: '익명1님이 작성하신 댓글입니다.', date: new Date().toISOString() },
      { writer: '익명2', comment: '익명2님이 작성하신 댓글입니다.', date: new Date().toISOString() },
      { writer: '익명3', comment: '익명3님이 작성하신 댓글입니다.', date: new Date().toISOString() },
    ]);
    setData({
      mindleId: route.params.mindleId,
      postId: route.params.postId,
      userPhoto: route.params.userPhoto,
      name: route.params.name,
      date: route.params.date,
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
        <CommentSubmitForm>
          <CommentInput
            value={commentInput}
            placeholder="댓글을 입력해주세요."
            onChangeText={(text) => {
              setCommentInput(text);
            }}
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor: '#ffffff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 2.4,
              elevation: 2,
            }}
          />
          <Button
            title="게시"
            width="70px"
            height="90%"
            onPress={() => {
              Alert.alert('댓글', '댓글 입력');
            }}
          />
        </CommentSubmitForm>
        <Comments>
          {comments.map((item, idx) => (
            <Comment key={String(idx)}>
              <Text>{item.writer}</Text>
              <Text>{item.comment}</Text>
              <Text>{item.date}</Text>
            </Comment>
          ))}
        </Comments>
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
