import React from 'react';
import { View } from 'react-native';
import MindlePreview from '@screens/mindlePage/MindlePreview';
import MindleInfo from '@screens/mindlePage/MindleInfo';

const getClickedMindleInfo = (mindle, setClickedMindleInfo) => {
  // console.log('mindle info');
  // console.log(mindle);
  setClickedMindleInfo({
    mindleKey: mindle.key,
    name: mindle.title,
    madeby: '창시자', //데이터 필요
    description: mindle.description || '민들레 설명 데이터 없음',
    visitCount: 18, //데이터 필요
    current: 1, //데이터 필요
    overlap: mindle.overlap,
    position: { latitude: mindle.latitude, longitude: mindle.longitude },
    level: mindle.level,
  });
  console.log(mindle);
};

export const MindleModule = {
  mindleSelect: function () {
    return <MindleSelect navigation={this.navigation} props={this.props} />;
  },
  mindlePost: function () {
    return <MindleInfo navigation={this.navigation} props={this.props} />;
  },
  mindlePreview: function () {
    return <MindlePreview navigation={this.navigation} props={this.props} />;
  },
};
export default { getClickedMindleInfo };
