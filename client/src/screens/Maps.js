import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { Button, ImageButton, Mindle } from '@components';
import { TouchableOpacity, Platform, PermissionsAndroid, View, Text, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { profile, button, mindle1 } from '../assets/index';
import axios from 'axios';
import dummy from '../utils/dummy.json';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import CreateMindle from '@components/CreateMindle';
import MindleInfo from '@screens/MindleInfo';

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
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    }
  } catch (e) {
    console.log(e);
  }
};
//안드로이드 혹은 ios에서 지도 사용 승인 절차 끝

// 민들레 정보

//메인페이지 컴포넌트 시작
const Maps = ({ navigation }) => {
  const bottomSheet = useRef();
  const fall = new Animated.Value(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedMindleInfo, setClickedMindleInfo] = useState({
    name: '',
    madeby: '',
    hashtag: [],
    visitCount: '',
    current: '',
  });

  const renderInner = () => (
    <View style={{ height: '100%' }}>
      <MindleInfo mindleInfo={clickedMindleInfo} />
    </View>
  );

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
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
              {clickedMindleInfo.hashtag.map((item, idx) => (
                <View key={idx} style={{ marginRight: 10 }}>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </>
      );
  };

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
  const [region, setRegion] = useState({
    latitude: 37.280675,
    longitude: 127.043705,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.003,
  });
  const [test, setTest] = useState({});
  //지도에 표시하기 위한 민들레 값들을 저장하는 변수
  const [mindles, setMindles] = useState([]);
  //초기 위치에서 10m 이상 차이 발생시 새로운 좌표 값 설정

  //유클리드 distance로 민들레 반경 안에 사용자가 들어와 있는 판단하는 함수
  const distance = (mindlePOS, currnetPOS) => {
    return (
      Math.sqrt(
        Math.pow(mindlePOS.latitude - currnetPOS.latitude, 2) + Math.pow(mindlePOS.longitude - currnetPOS.longitude, 2),
      ) <
      0.00001 * mindlePOS.radius
    );
  };
  useEffect(() => {
    //GPS 이용 승인
    requestPermission().then((result) => {
      //사용자 승인 후 좌표 값 획득
      if (result == 'granted') {
        //변화된 좌표 값 획득
        Geolocation.watchPosition(
          async (position) => {
            /*
            {
              "coords": {
                          "accuracy": 20, 
                          "altitude": 0, 
                          "altitudeAccuracy": 40, 
                          "heading": 90, 
                          "latitude": 37.2811483, 
                          "longitude": 127.0435583, 
                          "speed": 0
                        }, 
              "mocked": false, 
              "provider": "fused", 
              "timestamp": 1631366250000
            }
            */

            // console.log('positon.coords', position.coords);
            setTest(position);
            //지도에서 현재 기준으로 삼고 있는 위치 최신화
            //현재 사용자 위치에서 위도를 0.0015로 높게 설정
            //변화된 사용자 좌표 location 변수에 최신화
            setLocation(position.coords);
            //초기 메인 버튼을 민들레 심기로 설정
            setBtnToggle(false);
            try {
              await axios
                .post('http://10.0.2.2:3000/dandelion/get', {
                  //위도 값, 경도 값 json 형식으로 post 전송
                  centerPosition: { latitude: position.coords.latitude, longitude: position.coords.longitude },
                  maxDistance: 100,
                })
                .then((res) => {
                  console.log('Status', res.data.status);
                  //올바른 데이터 전송시
                  if (res.data.status === 'SUCCESS') {
                    //! 추후 res 데이터 값에 따라 변경
                    //mindles에 저장할 임시 데이터 생성
                    const mindleList = res.data.data.map((props) => {
                      // console.log('positon.coords2', position.coords);
                      //사용자와 민들레가 겹칠 경우 버튼을 민들레 심기에서 입장으로 변경
                      if (distance(props.location, position.coords)) {
                        setBtnToggle(true);
                        //console.log('버튼변경');
                      }
                      //기존 받아온 데이터에서 overlap 값 추가 overlap 값으로 반경 색상 및 작동하는 함수 변경
                      return {
                        latitude: props.location.latitude,
                        longitude: props.location.longitude,
                        key: props._id,
                        title: props.name,
                        description: props.name,
                        src: props.src,
                        radius: props.radius,
                        overlap: distance(props.location, position.coords),
                      };
                    });
                    setMindles(mindleList);
                  } else if (res.data.status === 'FAILED') {
                    //서버에서 제대로 된 정보를 가지고 오지 못하였을 때
                    Alert.alert('에러', '현재 민들레를 가져올 수 없습니다.');
                  }
                })
                .catch((err) => {
                  //예상치 못한 오류 발생시
                  Alert.alert('오류', '오류가 발생했습니다. 잠시 후 다시 시도해주세요.', err);
                });

              //임시로 생성된 mindleList 값을 mindles에 저장
              setMindles(midlelist);
            } catch (e) {
              Alert.alert('오류', '오류가 발생했습니다. 잠시 후 다시 시도해주세요.', e);
            }
          },
          //Geolocation.watchPosition 에러 발생
          (error) => {
            console.log(error);
          },
          {
            //높은 정확도 설정
            enableHighAccuracy: true,
            //재측정할 변화 차이
            distanceFilter: 10,
          },
        );
      }
    });
  }, []);

  //region이 변경되면 실행
  useEffect(async () => {
    //초기 메인 버튼을 민들레 심기로 설정
    setBtnToggle(false);
    await axios
      .post('http://10.0.2.2:3000/dandelion/get', {
        //위도 값, 경도 값 json 형식으로 post 전송
        centerPosition: { latitude: region.latitude, longitude: region.longitude },
        maxDistance: 100,
      })
      .then((res) => {
        console.log('Status', res.data.status);
        //올바른 데이터 전송시
        if (res.data.status === 'SUCCESS') {
          //! 추후 res 데이터 값에 따라 변경
          //mindles에 저장할 임시 데이터 생성
          const mindleList = res.data.data.map((props) => {
            // console.log('positon.coords2', position.coords);
            //사용자와 민들레가 겹칠 경우 버튼을 민들레 심기에서 입장으로 변경
            if (distance(props.location, location)) {
              setBtnToggle(true);
              //console.log('버튼변경');
            }
            //기존 받아온 데이터에서 overlap 값 추가 overlap 값으로 반경 색상 및 작동하는 함수 변경
            return {
              latitude: props.location.latitude,
              longitude: props.location.longitude,
              key: props._id,
              title: props.name,
              description: props.name,
              src: props.src,
              radius: props.radius,
              overlap: distance(props.location, position.coords),
            };
          });
          setMindles(mindleList);
          console.log('mindlelist1:', mindleList);
        } else if (res.data.status === 'FAILED') {
          //서버에서 제대로 된 정보를 가지고 오지 못하였을 때
          Alert.alert('에러', '현재 민들레를 가져올 수 없습니다.');
        }
      })
      .catch((err) => {
        //예상치 못한 오류 발생시
        Alert.alert('오류', '오류가 발생했습니다. 잠시 후 다시 시도해주세요.', err);
      });
    //임시로 생성된 mindleList 값을 mindles에 저장
    setMindles(midlelist);
  }, [region]);

  //지도가 준비 될 경우 실행되는 함수
  const updateMapStyle = () => {
    setMapWidth('100%');
  };

  //지도의 기준 좌표가 변경시 호출 되는 함수
  const onRegionChange = async (pos) => {
    console.log('currnet : ', pos);
    const distance = (mindlePOS, currnetPOS) => {
      return (
        Math.sqrt(
          Math.pow(mindlePOS.latitude - currnetPOS.latitude, 2) +
            Math.pow(mindlePOS.longitude - currnetPOS.longitude, 2),
        ) <
        0.00001 * mindlePOS.radius
      );
    };
    if (
      Math.abs(region.latitude - pos.latitude) >= region.latitudeDelta ||
      Math.abs(region.longitude - pos.longitude) >= region.longitudeDelta
    ) {
      console.log('Change Region: ', pos);
      setRegion({
        latitude: pos.latitude,
        longitude: pos.longitude,
        latitudeDelta: pos.latitudeDelta,
        longitudeDelta: pos.longitudeDelta,
      });
    }
  };

  //지도에서 사용되어지는 StyleSheet
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

  const getClickedMindleInfo = () => {
    const mindleInfo = {
      name: '동관 앞',
      madeby: '창시자',
      hashtag: ['#아주대', '#공대', '#뿌셔', '#졸려'],
      visitCount: 6,
      current: 2,
    };
    setClickedMindleInfo(mindleInfo);
  };

  //Maps에서 랜더링 하는 컴포넌트
  return (
    <Container>
      <CreateMindle modalVisible={modalVisible} setModalVisible={setModalVisible} position={location} />

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
        //onOpenEnd={navigateToInfo}
      />
      {/*A. 현재 사용되어지는 Goole 지도 컴포넌트 */}
      <Animated.View style={{ flex: 1, opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)) }}>
        <MapView
          style={[styles.map, { width: mapWidth }]}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={region}
          onMapReady={() => {
            updateMapStyle();
          }}
          onRegionChangeComplete={(currnet) => {
            onRegionChange(currnet);
          }}
        >
          {/*A-1 설정된 midles에 의해 민들레를 랜더링하는 부분 */}
          {mindles.map((props, index) => {
            return (
              <Mindle
                key={String(index)} //TODO : 올바른 key 값으로 수정 필요
                latitude={props.latitude}
                longitude={props.longitude}
                title={props.title}
                description={props.description}
                src={mindle1}
                radius={props.radius}
                overlap={props.overlap}
                //겹치는 경우 민들레 심기 아닌 경우 민들레 입장
                onPress={
                  props.overlap
                    ? () => Alert.alert('민들레 심기 정상')
                    : () => {
                        getClickedMindleInfo();
                        bottomSheet.current.snapTo(1);
                      }
                }
              />
            );
          })}
          {/*A-1 설정된 midles에 의해 민들레를 랜더링하는 부분 */}
        </MapView>
        {/*A. 현재 사용되어지는 Goole 지도 컴포넌트 */}

        {/*B 지도 위에 메인 버튼 컴포넌트 */}
        <View
          style={{
            position: 'absolute', //use absolute position to show button on top of the map
            top: '90%', //for center align
            alignSelf: 'center', //for align to right
          }}
        >
          {/*메인 버튼 컴포넌트 btnToggle 값에 따라 민들레 입장(true) or 민들레 심기로 변경(false)*/}
          {btnToggle ? (
            //현재 사용자와 민들레가 겹쳤을 때 생성되는 버튼
            <Button
              title={'민들레 입장'}
              onPress={() => {
                //TODO : 민들레 입장
                Alert.alert('현재 좌표값', 'latitude : ' + location.latitude + '\nlongitude : ' + location.longitude); //좌표값 확인을 위한 팝업
              }}
              width="200px"
              height="60px"
              fontSize="25px"
            />
          ) : (
            // 현재 사용자와 민들레가 겹치지 않았을 때 생성되는 버튼
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
          {/* 메인 버튼 컴포넌트 btnToggle 값에 따라 민들레 입장(true) or 민들레 심기로 변경(false)*/}
        </View>
        {/*B 지도 위에 메인 버튼 컴포넌트 */}

        {/*C 하단왼쪽 프로필 이미지 버튼 */}
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
        {/*C 하단 왼쪽 프로필 이미지 버튼 */}

        {/*D 하단 오른쪽 핫스팟 리스트 버튼 */}
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
        {/*D 하단 오른쪽 핫스팟 리스트 버튼 */}
      </Animated.View>
    </Container>
  );
};
//메인페이지 컴포넌트 끝

export default Maps;
