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

export default { distance, levelToIMG, levelToRadius };