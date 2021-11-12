import axios from 'axios';
import { level1, level2, level3, level4 } from '../assets/index';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';
import mapCtrl from '@controller/mapCtrl';
const jwtToken = useRecoilValue(userState.uidState);
const levelToRadius = (num) => (num == 1 || num == 2 ? 30 : num == 3 ? 40 : 50);

//level별 민들레 이미지
const levelList = [level1, level2, level3, level4];
const levelToIMG = (num) => levelList[1 <= num && num <= 3 ? num - 1 : 3];

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
  axios.defaults.baseURL = 'http://3.35.45.177:3000/';
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

//level별 반경 크기 및 충돌 확인
const CompData = async (Target, currentPOS, setCurrentMindle, setBtnToggle, setMindles) => {
  const data = await getData(Target); //초기 민들레 생성

  if (data.length > 0) {
    console.log('데이터는 이거지', typeof data, toString.call(data), data);
    const list = data.reduce((result, props) => {
      //사용자와 민들레가 겹칠 경우 버튼을 민들레 심기에서 입장으로 변경
      const visible = isCollision(props, result) ? false : true;
      if (mapCtrl.distance(props, currentPOS)) {
        setCurrentMindle({
          latitude: props.location.latitude,
          longitude: props.location.longitude,
          title: props.name,
          src: levelToIMG(props.level),
          radius: levelToRadius(props.level),
          overlap: mapCtrl.distance(props, currentPOS),
          key: props._id,
          visible: visible,
        });
        setBtnToggle(true);
      }
      result.push({
        latitude: props.location.latitude,
        longitude: props.location.longitude,
        title: props.name,
        src: levelToIMG(props.level),
        radius: levelToRadius(props.level),
        overlap: mapCtrl.distance(props, currentPOS),
        key: props._id,
        visible: visible,
      });
      return result;
    }, Array());
    setMindles(list);
  }
};

export default { isCollision, getData, CompData, levelToRadius, levelToIMG };
