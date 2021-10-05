import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { Button, ImageButton, Mindle } from '@components';
import { TouchableOpacity, Platform, PermissionsAndroid, View, Text, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { profile, button, level1, level2, level3, level4 } from '../assets/index';
import axios from 'axios';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import CreateMindle from '@components/CreateMindle';
import MindlePreview from '@screens/MindlePreview';
import MindleInfo from '@screens/MindleInfo';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';

const Container = styled.View`
  flex: 1;
`;
const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

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

const Maps = ({ navigation }) => {
  const bottomSheet = useRef();
  const fall = new Animated.Value(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [researchMap, setResearchMap] = useState(false); //위치 변화시 현 위치에서 검색 버튼
  const [clickedMindleInfo, setClickedMindleInfo] = useState({
    key: '',
    name: '',
    madeby: '',
    description: [],
    visitCount: '',
    current: '',
    position: { latitude: '', longitude: '' },
  });

  //모바일 화면에서 최적으로 지도를 랜더하기 위한 mapWidth 설정
  const [mapWidth, setMapWidth] = useState('99%');

  //사용자와 서클이 겹침에 따라 버튼 구별
  const [btnToggle, setBtnToggle] = useState();

  //현재 사용자 위치
  const [location, setLocation] = useState({
    accuracy: 20,
    altitude: 0,
    altitudeAccuracy: 40,
    heading: 0,
    latitude: 37.5,
    longitude: 127.043705,
    speed: 0,
  });

  //지도에서 현재 기준으로 삼고 있는 위치
  const [currentMapCoord, setCurrentMapCoord] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.003,
  });
  const [currentMindle, setCurrentMindle] = useState({});
  //지도에 표시하기 위한 민들레 값들을 저장하는 변수
  //TODO : useMemo
  const [mindles, setMindles] = useState([]);
  const renderInner = () =>
    clickedMindleInfo && (
      <View style={{ height: '100%' }}>
        {clickedMindleInfo.overlap ? (
          <MindleInfo
            mindleKey={clickedMindleInfo.key}
            name={clickedMindleInfo.name}
            overlap={clickedMindleInfo.overlap}
            navigation={navigation}
            position={clickedMindleInfo.position}
          />
        ) : (
          <MindlePreview
            mindleKey={clickedMindleInfo.key}
            name={clickedMindleInfo.name}
            overlap={clickedMindleInfo.overlap}
            navigation={navigation}
          />
        )}
      </View>
    );

  //API 기준 좌표
  const [mindleBaseCoord, setMindleBaseCoord] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.003,
  });

  const [API_TIMER, setApiTimer] = useState();

  const renderHeader = () => {
    if (clickedMindleInfo)
      return (
        <>
          <View style={styles.header}>
            <View style={styles.panelHeader}>
              <View style={styles.panelHandle} />
            </View>
          </View>
          <View style={styles.panel}>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
              <View style={{ marginRight: 15 }}>
                <StyledText>{clickedMindleInfo.name}</StyledText>
              </View>
              <Text>made by {clickedMindleInfo.madeby}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
              <View style={{ marginRight: 15 }}>
                <Text>누적 방문자 {clickedMindleInfo.visitCount}</Text>
              </View>
              <View style={{ marginLeft: 15 }}>
                <Text>실시간 {clickedMindleInfo.current}</Text>
              </View>
            </View>

            <View style={{ marginRight: 10 }}>
              <Text>{clickedMindleInfo.description}</Text>
            </View>
          </View>
        </>
      );
  };

  //level별 반경 크기
  const levelToRadius = (num) => {
    if (num == 1 || num == 2) {
      return 30;
    } else if (num == 3) {
      return 40;
    } else {
      return 50;
    }
  };
  //level별 민들레 이미지
  const levelToIMG = (num) => {
    if (num == 1) {
      return level1;
    } else if (num == 2) {
      return level2;
    } else if (num == 3) {
      return level3;
    } else {
      return level4;
    }
  };
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

  const jwtToken = useRecoilValue(userState.uidState);
  //API로 데이터 가져오는 함수
  const getData = async (TargetPOS, currentPOS) => {
    axios.defaults.baseURL = 'http://10.0.2.2:3000/';
    axios.defaults.headers.common['x-access-token'] = jwtToken;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //초기 메인 버튼을 민들레 심기로 설정
    setBtnToggle(false);
    await axios
      .post('/dandelion/get', {
        centerPosition: {
          latitude: TargetPOS.latitude,
          longitude: TargetPOS.longitude,
        },
        maxDistance: 200, //maxDistance는 최대 몇 m까지 불러올 것인가
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          const list = res.data.data.map((props) => {
            //사용자와 민들레가 겹칠 경우 버튼을 민들레 심기에서 입장으로 변경
            if (distance(props, currentPOS)) {
              setCurrentMindle({
                latitude: props.location.latitude,
                longitude: props.location.longitude,
                title: props.name,
                src: levelToIMG(props.level),
                radius: levelToRadius(props.level),
                overlap: distance(props, currentPOS),
                key: props._id,
              });
              setBtnToggle(true);
            }

            return {
              latitude: props.location.latitude,
              longitude: props.location.longitude,
              title: props.name,
              src: levelToIMG(props.level),
              radius: levelToRadius(props.level),
              overlap: distance(props, currentPOS),
              key: props._id,
            };
          });
          setMindles(list);
        } else if (res.data.status === 'FAILED') {
          Alert.alert('에러', '현재 민들레를 가져올 수 없습니다.');
        }
      })
      .catch((err) => {
        Alert.alert('오류', '오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      });
  };

  useEffect(() => {
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
            if (currentMapCoord.latitude == 0 && currentMapCoord.longitude == 0) {
              setCurrentMapCoord({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0001,
                longitudeDelta: 0.003,
              });
            }
            console.log('현재 사용자 위치', position.coords.latitude, position.coords.longitude);
            getData(position.coords, position.coords); //초기 민들레 생성
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
  }, []);
  //지도가 준비 될 경우 실행되는 함수
  const updateMapStyle = () => {
    setMapWidth('100%');
  };
  const [checkInitialRegion, setCheckInitalRegion] = useState(false); //지도 초기 위치로 설정 되었는지(처음부터 재검색 버튼을 뜨는 것을 방지하기 위함)
  //지도의 좌표가 변경시 호출 되는 함수
  const onRegionChange = (pos) => {
    console.log('current: latitude', pos.latitude, 'longitude', pos.longitude);
    if (pos.latitude != 0 && pos.longitude != 0) {
      if (!checkInitialRegion) {
        setCheckInitalRegion(true);
      }
      if (checkInitialRegion) {
        setResearchMap(true);
      }
      setCurrentMapCoord({
        latitude: pos.latitude,
        longitude: pos.longitude,
        latitudeDelta: pos.latitudeDelta,
        longitudeDelta: pos.longitudeDelta,
      });
    }
  };

  const getClickedMindleInfo = (mindle) => {
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

  return (
    <Container>
      <CreateMindle
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        position={location}
        setMindles={setMindles}
      />

      <BottomSheet
        ref={bottomSheet}
        snapPoints={[700, 140, 0]}
        initialSnap={2}
        callbackNode={fall}
        enabledGestureInteraction={true}
        renderHeader={renderHeader}
        renderContent={renderInner}
        enabledContentGestureInteraction={true}
        enabledContentTapInteraction={false}
        enabledInnerScrolling={true}
        onCloseEnd={() => {
          setClickedMindleInfo(null);
        }}
      />

      <Animated.View style={{ flex: 1, opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)) }}>
        <MapView
          style={[styles.map, { width: mapWidth }]}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={currentMapCoord}
          maxZoomLevel={19}
          minZoomLevel={17}
          onMapReady={() => {
            updateMapStyle();
          }}
          onRegionChangeComplete={(currnet) => {
            onRegionChange(currnet);
          }}
        >
          {mindles.map((props, index) => {
            return (
              <Mindle
                key={props.key}
                latitude={props.latitude}
                longitude={props.longitude}
                title={props.title}
                src={props.src}
                radius={props.radius}
                overlap={props.overlap}
                onPress={() => {
                  getClickedMindleInfo(props);
                  bottomSheet.current.snapTo(1);
                }}
              />
            );
          })}
        </MapView>
        <View
          style={{
            position: 'absolute', //use absolute position to show button on top of the map
            top: '90%', //for center align
            alignSelf: 'center', //for align to right
          }}
        >
          {btnToggle ? (
            <Button
              title={'민들레 입장'}
              onPress={() => {
                //TODO : 민들레 입장
                getClickedMindleInfo(currentMindle);
                bottomSheet.current.snapTo(1);
              }}
              width="200px"
              height="60px"
              fontSize="25px"
            />
          ) : (
            <Button
              title={'민들레 심기'}
              onPress={() => {
                //TODO : 민들레 심기
                setModalVisible(true);
                console.log('현재 좌표값', 'latitude : ' + location.latitude + '\nlongitude : ' + location.longitude); //좌표값 확인을 위한 팝업
              }}
              width="200px"
              height="60px"
              fontSize="25px"
            />
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            top: '90%',
            alignSelf: 'flex-start',
          }}
        >
          {/* 현재 ../asset/index.js에 있는 profile 이미지로 버튼 생성 rounded 값으로 둥근 형태 */}
          <ImageButton src={profile} onPress={() => navigation.navigate('Mypage')} rounded />
        </View>
        <View
          style={{
            position: 'absolute',
            top: '90%',
            alignSelf: 'flex-end',
          }}
        >
          {/* 현재 ../asset/index.js에 있는 button 이미지로 버튼 생성 rounded 값으로 둥근 형태*/}
          <ImageButton src={button} onPress={() => navigation.navigate('HotSpot')} rounded />
        </View>
        {researchMap && (
          <View
            style={{
              position: 'absolute',
              top: '5%',
              alignSelf: 'center',
            }}
          >
            <Button
              title="현 지도에서 검색"
              width="200px"
              height="50px"
              fontSize="20px"
              onPress={() => {
                setResearchMap(false);
                getData(currentMapCoord, location);
              }}
            />
          </View>
        )}
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  panel: {
    padding: 15,
    backgroundColor: '#ffffff',
  },

  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 5,
  },
});
export default Maps;
