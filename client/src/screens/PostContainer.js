import React from 'react';
import { View, Text, Header } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import PostCtrl from '../controller/postCtrl';

const PostContainer = ({ navigation, route }) => {
  const { title, type, props = null, state = null } = route.params;
  return (
    <>
      <View>
        <CustomHeader navigation={navigation} title={title} />
        {PostCtrl[type]?.call({ navigation, props, state })}
      </View>
    </>
  );
};

export default PostContainer;