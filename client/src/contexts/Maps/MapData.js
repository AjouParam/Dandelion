const clickedMindleInfo = {
  mindleKey: '',
  name: '',
  madeby: '',
  description: [],
  visitCount: '',
  current: '',
  position: { latitude: '', longitude: '' },
  name: '',
  route: '',
};

const location = {
  accuracy: 20,
  altitude: 0,
  altitudeAccuracy: 40,
  heading: 0,
  latitude: 37.5,
  longitude: 127.043705,
  speed: 0,
};
const currentMapCoord = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0001,
  longitudeDelta: 0.003,
};

export default { clickedMindleInfo, location, currentMapCoord };
