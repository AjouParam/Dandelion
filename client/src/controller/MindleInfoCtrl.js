import React from 'react';
import { View } from 'react-native';
import MindlePreview from '@screens/mindlePage/MindlePreview';
import MindleInfo from '@screens/mindlePage/MindleInfo';
import axios from 'axios';
import userState from '@contexts/userState';
import { useRecoilValue } from 'recoil';

axios.defaults.baseURL = 'http://3.35.45.177:3000/';
axios.defaults.headers.common['x-access-token'] = jwtToken;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const jwtToken = useRecoilValue(userState.uidState);
const userlocation = useRecoilValue(userState.userlocation);

const getClickedMindleInfo = async (mindle, currentPosition, setClickedMindleInfo) => {
  const data = {
    currentPosition: currentPosition,
  };
  console.log('ID', mindle.key);
  console.log('CurrentUserLocation', data);
  try {
    await axios
      .post(`dandelion/visit/${mindle.key}`, data)
      .then((res) => {
        console.log('enter!!');
        console.log(res.data);
        if (res.data.status === 'SUCCESS') {
          console.log('res.data.data : ', res.data.data);
          /*[
          {"_creator": {"_id": "6134c6b85e4e6346c5b0b244", "name": "승균"}, 
          "_id": "6193ba9de752e567bb1d07d6", 
          "createdAt": "2021-11-16T03:49:23.371Z", 
          "cumulativeVisitors": 6, 
          "description": "왜 인마상이지?", 
          "distance": 10.91072237849812, 
          "events": 1, 
          "level": 1, 
          "location": {"latitude": 37.2822677, "longitude": 127.0435717}, 
          "name": "인마상", 
          "realTimeVisitors": 6, 
          "recentImages": ["https://paramdandelion.s3.ap-northeast-2.amazonaws.com/post/7453666819273040"]
        }
      ]*/
          return res.data.data[0];
        } else {
          console.log(res.data.message);
          return res.data.data;
        }
      })
      .then((data) => {
        console.log(data);
        if (data !== null)
          setClickedMindleInfo({
            mindleKey: data._id,
            name: data.name,
            madeby: data._creator.name, //데이터 필요
            description: data.description || '민들레 설명 데이터 없음',
            visitCount: data.cumulativeVisitors, //데이터 필요sdf
            current: data.realTimeVisitors, //데이터 필요
            overlap: mindle.overlap,
            position: data.location,
            level: data.level,
            recentImages: data.recentImages,
          });
      })
      .catch((err) => console.log(err.message));
  } catch (err) {
    console.log(err);
  }
  // console.log(mindle);
};

const leaveMindle = async (currentMindleInfo, setClickedMindleInfo) => {
  console.log('leaveMindle');
  console.log(currentMindleInfo);
  try {
    await axios
      .get(`/dandelion/exit/${currentMindleInfo.mindleKey}`)
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log('슈퍼파워', res.data.message);
          setClickedMindleInfo(null);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err.message));
  } catch (err) {
    console.log(err);
  }
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
export default { getClickedMindleInfo, leaveMindle };
