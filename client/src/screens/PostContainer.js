import React from 'react';
import { View, Text, Header } from 'react-native';

import CustomHeader from '../components/CustomHeader';

import { PostModule } from '../controller/postCtrl';

const PostContainer = ({ navigation, route }) => {
  const { title, type, props = null, state = null } = route.params;

  return (
    <>
      <CustomHeader navigation={navigation} title={title} />
      {PostModule[type]?.call({ navigation, props, state })}
    </>
  );
};

export default PostContainer;
