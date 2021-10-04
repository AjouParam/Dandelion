import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Post from '@components/MindlePostContent';
import { ActivityIndicator } from 'react-native';

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

const MindlePost = ({ route, navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});

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
      userName: route.params.userName,
      date: route.params.date,
      content: route.params.content,
      photoContents: route.params.photoContents,
      likes: route.params.likes,
      commentsNum: route.params.commentsNum,
    });
  }, []);

  useEffect(() => {
    if (comments && data) setLoaded(true);
  }, [comments]);

  if (loaded)
    return (
      <Container>
        <Post
          userPhoto={data.userPhoto}
          userName={data.userName}
          date={data.date}
          content={data.content}
          photoContents={data.photoContents}
          likes={data.likes}
          commentsNum={data.commentsNum}
          isPost={true}
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
