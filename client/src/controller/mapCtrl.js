import dandelionCtrl from './dandelionCtrl';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
//유클리드 distance로 민들레 반경 안에 사용자가 들어와 있는 판단하는 함수
const distance = (mindlePOS, currnetPOS) => {
  return (
    Math.sqrt(
      Math.pow(mindlePOS.location.latitude - currnetPOS.latitude, 2) +
        Math.pow(mindlePOS.location.longitude - currnetPOS.longitude, 2),
    ) <=
    0.00001 * dandelionCtrl.levelToRadius(mindlePOS.level)
  );
};
const rad = (x) => {
  return (x * Math.PI) / 180;
};

const getDistance = (p1, p2) => {
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.latitude - p1.latitude);
  const dLong = rad(p2.longitude - p1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; // returns the distance in meter
};

const onRegionChange = (
  pos,
  mindleBaseCoord,
  checkInitialRegion,
  setCheckInitalRegion,
  setResearchMap,
  setCurrentMapCoord,
  setMindleBaseCoord,
) => {
  const temp = ({ latitude, longitude, latitudeDelta, longitudeDelta } = pos);
  console.log('current: latitude', latitude, 'longitude', longitude);
  if (latitude != 0 && longitude != 0) {
    if (!checkInitialRegion) {
      setCheckInitalRegion(true);
      setMindleBaseCoord(pos);
    } else {
      if (getDistance(pos, mindleBaseCoord) > 800) {
        setResearchMap(true);
        setMindleBaseCoord(pos);
      }
    }
    setCurrentMapCoord(temp);
  }
};

//안드로이드 혹은 ios에서 지도 사용 승인 절차
const requestPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    }
  } catch (e) {
    console.log(e);
  }
};
//안드로이드 혹은 ios에서 지도 사용 승인 절차 끝

const getUserLocation = async (
  setLocation,
  setUserlocation,
  currentMapCoord,
  setCurrentMapCoord,
  setBtnToggle,
  setCurrentMindle,
  setMindles,
) => {
  //GPS 이용 승인
  requestPermission().then((result) => {
    //사용자 승인 후 좌표 값 획득
    if (result == 'granted') {
      //변화된 좌표 값 획득
      //초기 위치에서 20m 이상 차이 발생시 새로운 좌표 값 설정
      Geolocation.watchPosition(
        async (position) => {
          //변화된 사용자 좌표 location 변수에 최신화
          setLocation(position.coords);
          setUserlocation(position.coords);
          if (currentMapCoord.latitude == 0 && currentMapCoord.longitude == 0) {
            setCurrentMapCoord({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0001,
              longitudeDelta: 0.003,
            });
          }
          console.log('현재 사용자 위치', position.coords.latitude, position.coords.longitude);
          setBtnToggle(false);
          console.log('함수 실행');
          dandelionCtrl.CompData(position.coords, position.coords, setCurrentMindle, setBtnToggle, setMindles);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          //재측정할 변화 차이
          distanceFilter: 20,
        },
      );
    }
  });
};
export default { distance, getDistance, onRegionChange, getUserLocation };
