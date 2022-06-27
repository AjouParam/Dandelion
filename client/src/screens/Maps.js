import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { Button, ImageButton, Mindle } from '@components';
import { Platform, PermissionsAndroid, View, Text, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { profile, button, mindle1 } from '../assets/index';
import axios from 'axios';
import dummy from '../utils/dummy.json';

const Container = styled.View`
  flex: 1;
`;
const StyledText = styled.Text`
  font-size: 16px;
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

//메인페이지 컴포넌트 시작
const Maps = ({ navigation }) => {
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

  //지도에 표시하기 위한 민들레 값들을 저장하는 변수
  const [mindles, setMindles] = useState([]);

  //초기 위치에서 10m 이상 차이 발생시 새로운 좌표 값 설정
  useEffect(() => {
    //GPS 이용 승인
    requestPermission().then((result) => {
      //사용자 승인 후 좌표 값 획득
      if (result == 'granted') {
        //변화된 좌표 값 획득
        Geolocation.watchPosition(
          (position) => {
            //변화된 사용자 좌표 location 변수에 최신화
            setLocation(position.coords);
            // console.log('positon.coords', position.coords);

            //지도에서 현재 기준으로 삼고 있는 위치 최신화
            //현재 사용자 위치에서 위도를 0.0015로 높게 설정
            setRegion({
              latitude: position.coords.latitude + 0.0015,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0001,
              longitudeDelta: 0.003,
            });

            //유클리드 distance로 민들레 반경 안에 사용자가 들어와 있는 판단하는 함수
            const distance = (mindlePOS, currnetPOS) => {
              return (
                Math.sqrt(
                  Math.pow(mindlePOS.latitude - currnetPOS.latitude, 2) +
                    Math.pow(mindlePOS.longitude - currnetPOS.longitude, 2),
                ) <
                0.00001 * mindlePOS.radius
              );
            };

            //초기 메인 버튼을 민들레 심기로 설정
            setBtnToggle(false);

            //------API 구현시 백엔드로 부터 민들레 데이터 가져오는 부분----------------------
            /*
              예상되어지는 데이터 값
              ex)
              res.data=>
              {
                  "status": "상태",
                  "data": [
                  {
                    "latitude": "위도값1",
                    "longitude": "경도값1",
                    "title": "민들레이름1",
                    "description": "민들레 설명1",
                    "src": "크기에 따른 이미지 URL",
                    "radius": "민들레 반경 크기1"
                  },
                  {
                    "latitude": "위도값2",
                    "longitude": "경도값2",
                    "title": "민들레이름2",
                    "description": "민들레 설명2",
                    "src": "이미지 URL2",
                    "radius": "민들레 반경 크기2"
                  }
                ]
              }
              */
            /*
            //API로 데이터 요청 부분
            await axios
              .post('http://10.0.2.2:3000/(현재 위치 근방 민들레 가져오는 API)', {
                //위도 값, 경도 값 json 형식으로 post 전송
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              })
              .then((res) => {
                //올바른 데이터 전송시
                if (res.data.status === 'SUCCESS') {
                  //! 추후 res 데이터 값에 따라 변경
                  //mindles에 저장할 임시 데이터 생성
                  const mindleList = res.data.data.map((props) => {
                    // console.log('positon.coords2', position.coords);
                    //사용자와 민들레가 겹칠 경우 버튼을 민들레 심기에서 입장으로 변경 
                    if (distance(props, position.coords)) {
                      setBtnToggle(true); 
                      //console.log('버튼변경');
                    }
                    //기존 받아온 데이터에서 overlap 값 추가 overlap 값으로 반경 색상 및 작동하는 함수 변경
                    return {
                      latitude: props.latitude,
                      longitude: props.longitude,
                      title: props.title,
                      description: props.description,
                      src: props.src,
                      radius: props.radius,
                      overlap: distance(props, position.coords),
                    };
                  });
                  //console.log(mindleList);
                  // console.log(dummy.data);
                  
                  //임시로 만든 mindleList 값을 mindles에 저장
                  setMindles(mindleList);
                  // console.log(mindleList);
                } else if (res.data.status === 'FAILED') {
                  //서버에서 제대로 된 정보를 가지고 오지 못하였을 때
                  Alert.alert('에러', '현재 민들레를 가져올 수 없습니다.');
                }
              })
              .catch((err) => {
                //예상치 못한 오류 발생시
                Alert.alert('오류', '오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
              });
              */
            //------API 구현시 백엔드로 부터 민들레 데이터 가져오는 부분----------------------

            //------API 구현전 '../utils/dummy.json'에서 가져오는 더미 데이터로 구현------
            const mindleList = dummy.data.map((props) => {
              // console.log('positon.coords2', position.coords);

              //현재 사용자 위치와 민들레가 겹칠 경우 민들레 심기에서 입장으로 변경
              if (distance(props, position.coords)) {
                setBtnToggle(true);
                console.log('버튼변경');
              }
              //얻은 데이터에서 거리를 측정하여 overlap attr 추가 -> 민들레 색상 및 동작 함수 변경 예정
              return {
                latitude: props.latitude,
                longitude: props.longitude,
                title: props.title,
                description: props.description,
                src: props.src,
                radius: props.radius,
                overlap: distance(props, position.coords),
              };
            });
            //------API 구현전 '../utils/dummy.json'에서 가져오는 더미 데이터로 구현------

            //임시로 생성된 mindleList 값을 mindles에 저장
            setMindles(mindleList);
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

  //지도가 준비 될 경우 실행되는 함수
  const updateMapStyle = () => {
    setMapWidth('100%');
  };

  //지도의 기준 좌표가 변경시 호출 되는 함수
  const onRegionChange = (region) => {
    console.log('currnet : ', region);
  };

  //지도에서 사용되어지는 StyleSheet
  const styles = StyleSheet.create({
    map: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });

  //Maps에서 랜더링 하는 컴포넌트
  return (
    <Container>
      {/*A. 현재 사용되어지는 Goole 지도 컴포넌트 */}
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
        {mindles.map((props) => {
          return (
            <Mindle
              latitude={props.latitude}
              longitude={props.longitude}
              title={props.title}
              description={props.description}
              src={mindle1}
              radius={props.radius}
              overlap={props.overlap}
              //겹치는 경우 민들레 심기 아닌 경우 민들레 입장
              onPress={props.overlap ? () => Alert.alert('민들레 심기 정상') : () => Alert.alert('민들레 입장 정상')}
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
              Alert.alert('현재 좌표값', 'latitude : ' + location.latitude + '\nlongitude : ' + location.longitude); //좌표값 확인을 위한 팝업
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
    </Container>
  );
};
//메인페이지 컴포넌트 끝

export default Maps;
