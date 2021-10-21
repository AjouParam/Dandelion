import React from 'react';
import { View, Text, Header } from 'react-native';
import Post from '../../components/post/Post';

const PostSubPage = ({ navigation }) => {
  console.log(navigation);
  return (
    <>
      <Post //type setting
        navigation={navigation}
        props={{
          name: '동관 앞',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      {/* <Post />
      <Post /> */}
    </>
  );
};

export default PostSubPage;
