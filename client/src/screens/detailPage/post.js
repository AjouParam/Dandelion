import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { View, Text, Header, Dimensions, ScrollView } from 'react-native';
import Post from '../../components/post/Post';
import Comment from '../../components/post/comment';
import CommentInput from '../../components/post/commentInput';
import styled from 'styled-components';

const Container = styled.View`
  background-color: 'rgba(158, 150, 150, .5)';
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: ${Dimensions.get('window').height - 70}px;
`;
const MessageContainer = styled.ScrollView`
  height: 400px;
`;
const PostSubPage = ({ navigation, props }) => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    <Comment depth={0} props={{ name: '라이언', date: '07 09 01:55', state: 'visitor', text: '잘 보고 갑니다.' }} />,
    <Comment depth={0} props={{ name: '라이언', date: '07 09 01:55', state: 'visitor', text: '잘 보고 갑니다.' }} />,
    <Comment depth={1} props={{ name: '피치', date: '07 09 01:55', state: 'admin', text: '네엡' }} />,
    <Comment depth={0} props={{ name: '라이언', date: '07 09 01:55', state: 'visitor', text: '잘 보고 갑니다.' }} />,
    <Comment depth={0} props={{ name: '라이언', date: '07 09 01:55', state: 'visitor', text: '잘 보고 갑니다.' }} />,
  ]);
  const addComment = (text) =>
    setMessages((v) => [
      ...v,
      <Comment depth={0} props={{ name: '라이언', date: '07 09 01:55', state: 'visitor', text: text }} />,
    ]);
  const changeValue = (text) => setInputText(text);
  return (
    <Container>
      <Post //type setting
        click={false}
        navigation={navigation}
        props={props}
      />
      <MessageContainer>{messages.map((element) => element)}</MessageContainer>

      <CommentInput functionCall={{ addComment }} />
    </Container>
  );
};

export default PostSubPage;
