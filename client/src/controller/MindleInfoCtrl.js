const getClickedMindleInfo = (mindle, setClickedMindleInfo) => {
  // console.log('mindle info');
  // console.log(mindle);
  setClickedMindleInfo({
    key: mindle.key,
    name: mindle.title,
    madeby: '창시자', //데이터 필요
    description: mindle.description || '민들레 설명 데이터 없음',
    visitCount: 18, //데이터 필요
    current: 1, //데이터 필요
    overlap: mindle.overlap,
    position: { latitude: mindle.latitude, longitude: mindle.longitude },
  });
  console.log(mindle);
};

export default { getClickedMindleInfo };
