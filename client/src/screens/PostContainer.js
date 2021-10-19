import React from 'react';
import { View, Text, Header } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Button from '../components/Button';

const PostContainer = ({ navigation, route }) => {
  const { title } = route.params;
  console.log('dlrjsi', title);
  return (
    <>
      <View>
        <CustomHeader navigation={navigation} title={title} />
        {/* <Button onPress={() => navigation.navigate('Mypage')} title="돌아가기" /> */}
      </View>
    </>
  );
};

export default PostContainer;
