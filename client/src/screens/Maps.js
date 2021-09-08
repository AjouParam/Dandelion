import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { Button, ImageButton, Mindle } from '@components';
import { Platform, PermissionsAndroid, View, Text, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { profile, button, mindle1 } from '../assets/index';

import dummy from '../utils/dummy.json';
const Container = styled.View`
  flex: 1;
`;
const StyledText = styled.Text`
  font-size: 16px;
`;

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

const Maps = ({ navigation }) => {
  const [mapWidth, setMapWidth] = useState('99%');
  //현재 사용자 위치
  const [location, setLocation] = useState({
    accuracy: 20,
    altitude: 0,
    altitudeAccuracy: 40,
    heading: 0,
    latitude: 37.5,
    longitude: 127.043705,
    speed: 0,
  }); //현재 사용자 위치
  const [region, setRegion] = useState({
    latitude: 37.280675,
    longitude: 127.043705,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.003,
  });
  const [btnToggle, setBtnToggle] = useState();

  // if (!location) {
  //   return (
  //     <View>
  //       <Text>Splash Screen</Text>
  //     </View>
  //   );
  // }
  const [mindles, setMindles] = useState([]);
  useEffect(() => {
    const _watchId = Geolocation.watchPosition(
      (position) => {
        setLocation(position.coords);
        // console.log('positon.coords', position.coords);
        setRegion({
          latitude: position.coords.latitude + 0.0015,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.003,
        });
        const distance = (mindlePOS, currnetPOS) => {
          return (
            Math.sqrt(
              Math.pow(mindlePOS.latitude - currnetPOS.latitude, 2) +
                Math.pow(mindlePOS.longitude - currnetPOS.longitude, 2),
            ) <
            0.00001 * mindlePOS.radius
          );
        };
        //dummy는 가상 데이터
        const mindleList = dummy.data.map((props) => {
          // console.log('positon.coords2', position.coords);
          if (distance(props, position.coords)) {
            setBtnToggle(true);
            console.log('버튼변경');
          }
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
        setMindles(mindleList);
        // console.log(mindleList);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );

    return () => {
      if (_watchId) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, []);

  const updateMapStyle = () => {
    setMapWidth('100%');
  };
  //현재 변환된 지도상 위치 값 변화
  const onRegionChange = (region) => {
    console.log('currnet : ', region);
  };

  const styles = StyleSheet.create({
    map: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });

  return (
    <Container>
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
              onPress={() => Alert.alert('민들레 터치 정상')}
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
        {/*버튼 컴포넌트 */}
        {btnToggle ? (
          <Button
            title={'민들레 입장'}
            onPress={() => {
              //TODO : 민들레 심기
              Alert.alert('현재 좌표값', 'latitude : ' + location.latitude + '\nlongitude : ' + location.longitude); //좌표값 확인을 위한 팝업
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
              Alert.alert('현재 좌표값', 'latitude : ' + location.latitude + '\nlongitude : ' + location.longitude); //좌표값 확인을 위한 팝업
            }}
            width="200px"
            height="60px"
            fontSize="25px"
          />
        )}
      </View>
      {/*왼쪽 프로필 이미지*/}
      <View
        style={{
          position: 'absolute',
          top: '90%',
          alignSelf: 'flex-start',
        }}
      >
        <ImageButton src={profile} onPress={() => navigation.navigate('Mypage')} rounded />
      </View>

      <View
        style={{
          position: 'absolute',
          top: '90%',
          alignSelf: 'flex-end',
        }}
      >
        <ImageButton src={button} onPress={() => navigation.navigate('HotSpot')} rounded />
      </View>
    </Container>
  );
};
export default Maps;
