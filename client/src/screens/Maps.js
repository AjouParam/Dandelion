import React, { useState, useEffect } from 'react';
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
const Markers = ({ dummy, location }) => {
  useEffect(() => {
    console.log('MapView 랜더링 완료');
  }, [location]);
  return dummy.data.map((props) => {
    if (
      Math.sqrt(Math.pow(props.latitude - location.latitude, 2) + Math.pow(props.longitude - location.longitude, 2)) <
      0.00001 * props.radius
    ) {
      return (
        <Mindle
          latitude={props.latitude}
          longitude={props.longitude}
          title={props.title}
          description={props.description}
          src={mindle1}
          radius={props.radius}
          overlap={true}
          onPress={() => Alert.alert('민들레 터치 정상')}
        />
      );
    } else {
      return (
        <Mindle
          latitude={props.latitude}
          longitude={props.longitude}
          title={props.title}
          description={props.description}
          src={mindle1}
          radius={props.radius}
          overlap={false}
          onPress={() => Alert.alert('민들레 터치 정상')}
        />
      );
    }
  });
};
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

  // if (!location) {
  //   return (
  //     <View>
  //       <Text>Splash Screen</Text>
  //     </View>
  //   );
  // }
  useEffect(() => {
    requestPermission().then((result) => {
      console.log({ result });
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          (pos) => {
            setLocation(pos.coords);
            setRegion({
              latitude: pos.coords.latitude + 0.0015,
              longitude: pos.coords.longitude,
              latitudeDelta: 0.0001,
              longitudeDelta: 0.003,
            });
            console.log('My_Current', location, pos.coords);
          },
          (error) => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 3600,
            maximumAge: 3600,
          },
        );
      }
    });
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
        <Markers dummy={dummy} location={location} />
      </MapView>
      <View
        style={{
          position: 'absolute', //use absolute position to show button on top of the map
          top: '90%', //for center align
          alignSelf: 'center', //for align to right
        }}
      >
        {/*버튼 컴포넌트 */}
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
