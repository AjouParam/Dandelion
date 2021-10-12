import { level1, level2, level3, level4 } from '../assets/index';
const levelToRadius = (num) => (num == 1 || num == 2 ? 30 : num == 3 ? 40 : 50);

//level별 민들레 이미지
const levelList = [level1, level2, level3, level4];
const levelToIMG = (num) => levelList[1 <= num && num <= 3 ? num - 1 : 3];

//유클리드 distance로 민들레 반경 안에 사용자가 들어와 있는 판단하는 함수
const distance = (mindlePOS, currnetPOS) => {
  return (
    Math.sqrt(
      Math.pow(mindlePOS.location.latitude - currnetPOS.latitude, 2) +
        Math.pow(mindlePOS.location.longitude - currnetPOS.longitude, 2),
    ) <
    0.00001 * levelToRadius(mindlePOS.level)
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

export default { distance, levelToIMG, levelToRadius, onRegionChange };
