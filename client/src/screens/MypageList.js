import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';

const MypageList = ({ navigation }) => {
  return (
    <View>
      <Text>마이페이지 리스트</Text>
      <Button onPress={() => navigation.navigate('Mypage')} title="돌아가기" />
    </View>
  );
};

export default MypageList;
