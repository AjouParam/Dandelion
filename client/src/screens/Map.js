import React from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View } from 'react-native';
const Container = styled.View`
  flex: 1;
`;
const StyledText = styled.Text`
  font-size: 16px;
`;
const Map = () => {
  return (
    <Container>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.28301,
          longitude: 127.04343,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.003,
        }}
      />
      <Marker
        coordinate={{ latitude: 37.28301, longitude: 127.04343 }}
        title="아주대학교"
        description="테스트용 마커"
      />
    </Container>
  );
};
export default Map;
