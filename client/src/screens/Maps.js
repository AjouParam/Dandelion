import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Button, ImageButton } from '@components';
import { Platform, PermissionsAndroid, View, Text, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { profile, button } from '../assets/index';
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
  const [location, setLocation] = useState(undefined);

  useEffect(() => {
    requestPermission().then((result) => {
      console.log({ result });
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          (pos) => {
            setLocation(pos.coords);
            console.log(location);
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

  // if (!location) {
  //   return (
  //     <View>
  //       <Text>Splash Screen</Text>
  //     </View>
  //   );
  // }
  const updateMapStyle = () => {
    setMapWidth('100%');
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
        initialRegion={{
          latitude: 37.28301,
          longitude: 127.04343,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.003,
        }}
        onMapReady={() => {
          updateMapStyle();
        }}
        // mapPadding={{top: 20, right: 20, bottom: 550, left: 20}}
      >
        <Marker
          coordinate={{ latitude: 37.28301, longitude: 127.04343 }}
          title="아주대학교"
          description="테스트용 마커"
        />
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
