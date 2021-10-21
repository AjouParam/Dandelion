import React from 'react';
import { View, Text, Header, Dimensions } from 'react-native';
import Post from '../../components/post/Post';
import Comment from '../../components/post/comment';
import CommentInput from '../../components/post/commentInput';
import styled from 'styled-components';

const Container = styled.View`
  background-color: 'rgba(158, 150, 150, .5)';
  height: ${Dimensions.get('window').height}px;
`;
const PostSubPage = ({ navigation, props }) => {
  return (
    <Container>
      <Post //type setting
        click={false}
        navigation={navigation}
        props={props}
      />
      <CommentInput />
      <Comment depth={0} props={{ name: '라이언', date: '07 09 01:55', state: 'visitor', text: '잘 보고 갑니다.' }} />
      <Comment depth={0} props={{ name: '라이언', date: '07 09 01:55', state: 'visitor', text: '잘 보고 갑니다.' }} />
      <Comment depth={1} props={{ name: '피치', date: '07 09 01:55', state: 'admin', text: '네엡' }} />
      <Comment depth={0} props={{ name: '라이언', date: '07 09 01:55', state: 'visitor', text: '잘 보고 갑니다.' }} />
    </Container>
  );
};

export default PostSubPage;
