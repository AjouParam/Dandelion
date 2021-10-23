import React from 'react';
import { View, Text, Header } from 'react-native';

import Post from '../../components/post/Post';

const PostSubPage = ({ navigation, click = true }) => {
  return (
    <>
      <Post //type setting
        click={click}
        navigation={navigation}
        props={{
          name: '아무개',
          date: '2021.07.19',
          text: '많아요~',
          like: 6,
          message: 23,
        }}
      />
      {/* <Post />
      <Post /> */}
    </>
  );
};

export default PostSubPage;
