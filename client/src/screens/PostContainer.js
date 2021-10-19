import React from 'react';
import { View, Text, Header } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Post from '../components/Post';

const PostContainer = ({ navigation, route }) => {
  const { title } = route.params;
  return (
    <>
      <View>
        <CustomHeader navigation={navigation} title={title} />
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
        <Post /> //default post
        <Post />
      </View>
    </>
  );
};

export default PostContainer;
