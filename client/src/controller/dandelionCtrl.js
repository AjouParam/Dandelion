import axios from 'axios';

import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';
const jwtToken = useRecoilValue(userState.uidState);

const sortForRadius = (list) =>
  list.sort(function (a, b) {
    return a.radius > b.radius ? -1 : a.radius > b.radius ? 1 : 0;
  });
const isCollision = (element, list) => {
  list.reduce((result, value) => {
    const distance = Math.sqrt(
      Math.abs(list.latitude - element.latitude) + Math.abs(list.longitude - element.longitude),
    );
    result = element.radius + value.radius >= distance ? true : false;
    return result;
  }, false);
};
const getData = async (TargetPOS) => {
  axios.defaults.baseURL = 'http://10.0.2.2:3000/';
  axios.defaults.headers.common['x-access-token'] = jwtToken;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  //초기 메인 버튼을 민들레 심기로 설정
  return await axios
    .post('/dandelion/get', {
      centerPosition: {
        latitude: TargetPOS.latitude,
        longitude: TargetPOS.longitude,
      },
      maxDistance: 800, //maxDistance는 최대 몇 m까지 불러올 것인가
    })
    .then((res) => {
      if (res.data.status === 'SUCCESS') {
        return res.data.data;
      } else if (res.data.status === 'FAILED') {
        Alert.alert('에러', '현재 민들레를 가져올 수 없습니다.');
        return undefined;
      }
    })
    .catch((err) => {
      Alert.alert('오류', '오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      return undefined;
    });
};

export default { isCollision, getData };
