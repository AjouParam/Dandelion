import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import Post from '@components/MindlePostContent';
import ProfileModal from '@components/Modal';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Comments = styled.ScrollView``;
const Comment = styled.View`
  padding: 5px;
  border: 1px solid #000000;
`;
const Text = styled.Text``;
const Divider = styled.View`
  margin-top: 10px;
  height: 1px;
  border: 0.3px solid #000000;
`;

const MindlePost = ({ route, navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setComments([
      { writer: '익명1', comment: '익명1님이 작성하신 댓글입니다.', date: new Date().toISOString() },
      { writer: '익명2', comment: '익명2님이 작성하신 댓글입니다.', date: new Date().toISOString() },
      { writer: '익명3', comment: '익명3님이 작성하신 댓글입니다.', date: new Date().toISOString() },
      { writer: '익명4', comment: '익명4님이 작성하신 댓글입니다.', date: new Date().toISOString() },
      { writer: '익명5', comment: '익명5님이 작성하신 댓글입니다.', date: new Date().toISOString() },
      { writer: '익명6', comment: '익명6님이 작성하신 댓글입니다.', date: new Date().toISOString() },
      { writer: '익명7', comment: '익명7님이 작성하신 댓글입니다.', date: new Date().toISOString() },
      { writer: '익명8', comment: '익명8님이 작성하신 댓글입니다.', date: new Date().toISOString() },
    ]);
    setData({
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
          isPost={true}
          isInPost={true}
          setMenuOpen={setMenuOpen}
        />
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
