import React from 'react';
import { View, Text, Header } from 'react-native';
import Post from '../../components/post/Post';

const PostSubPage = () => {
  return (
    <>
      <Post //type setting
        props={{
          name: '동관 앞',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      <Post />
      <Post />
    </>
  );
};

export default PostSubPage;
