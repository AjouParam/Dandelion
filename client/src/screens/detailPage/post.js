import React from 'react';
import { View, Text, Header } from 'react-native';
import Post from '../../components/post/Post';

const PostSubPage = ({ navigation, props }) => {
  return (
    <>
      <Post //type setting
        click={false}
        navigation={navigation}
        props={props}
      />
      {/* <Post />
      <Post /> */}
    </>
  );
};

export default PostSubPage;
