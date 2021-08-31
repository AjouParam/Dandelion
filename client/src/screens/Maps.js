import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Button, Image } from '@components';
import { Platform, PermissionsAndroid, View, Text,StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

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

const Maps = () => {
  const [location, setLocation] = useState();
  const [mapWidth,setMapWidth]=useState('99%');
  useEffect(() => {
    requestPermission().then((result) => {
      console.log({ result });
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          (pos) => {
            setLocation(pos.coords);
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

  if (!location) {
    return (
      <View>
        <Text>Splash Screen</Text>
      </View>
    );
  }
  const updateMapStyle=()=>{
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
        onMapReady={()=>{
          updateMapStyle()
        }}
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
          }}
          width="100px"
          height="40px"
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
        <Image showButton rounded />
      </View>

      <View
        style={{
          position: 'absolute',
          top: '90%',
          alignSelf: 'flex-end',
        }}
      >
        <Image showButton rounded />
      </View>
    </Container>
  );
};
export default Maps;