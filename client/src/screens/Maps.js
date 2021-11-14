import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components/native';
import MapData from '@contexts/Maps/MapData';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { Button, ImageButton, Mindle, MapsRenderHeader } from '@components';
import { TouchableOpacity, View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { profile, tester1, button } from '../assets/index';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import CreateMindle from '@components/CreateMindle';
import MindlePreview from '@screens/mindlePage/MindlePreview';
import MindleInfo from '@screens/mindlePage/MindleInfo';
import mapCtrl from '@controller/mapCtrl';
import dandelionCtrl from '@controller/dandelionCtrl';
import MindleInfoCtrl from '@controller/MindleInfoCtrl';
import { coord2address } from '@utils/common';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DefaultProfileImage = require('../assets/profile/profile_default.png');

const Container = styled.View`
  flex: 1;
  elevation: 2;
`;

const Maps = ({ navigation }) => {
  const bottomSheet = useRef();
  const fall = new Animated.Value(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [researchMap, setResearchMap] = useState(false); //위치 변화시 현 위치에서 검색 버튼
  const [clickedMindleInfo, setClickedMindleInfo] = useState(MapData.clickedMindleInfo);

  //모바일 화면에서 최적으로 지도를 랜더하기 위한 mapWidth 설정
  const [mapWidth, setMapWidth] = useState('99%');

  //사용자와 서클이 겹침에 따라 버튼 구별
  const [btnToggle, setBtnToggle] = useState();

  //현재 사용자 위치
  const [location, setLocation] = useState(MapData.location);

  //지도에서 현재 기준으로 삼고 있는 위치
  const [currentMapCoord, setCurrentMapCoord] = useState(MapData.currentMapCoord);
  const [currentMindle, setCurrentMindle] = useState({});
  //지도에 표시하기 위한 민들레 값들을 저장하는 변수
  const [checkInitialRegion, setCheckInitalRegion] = useState(false); //지도 초기 위치로 설정 되었는지(처음부터 재검색 버튼을 뜨는 것을 방지하기 위함)
  //API 기준 좌표
  const [mindleBaseCoord, setMindleBaseCoord] = useState(MapData.currentMapCoord);

  //TODO : useMemo
  const [mindles, setMindles] = useState([]);
  const renderInner = () =>
    clickedMindleInfo && (
      <View style={{ height: '100%' }}>
        {clickedMindleInfo.overlap ? (
          <MindleInfo navigation={navigation} props={clickedMindleInfo} />
        ) : (
          <MindlePreview navigation={navigation} props={clickedMindleInfo} mindleKey={clickedMindleInfo.mindleKey} />
        )}
      </View>
    );
  //지도가 준비 될 경우 실행되는 함수
  const updateMapStyle = () => {
    setMapWidth('100%');
  };
  const renderHeader = () => {
    if (clickedMindleInfo) return <MapsRenderHeader clickedMindleInfo={clickedMindleInfo} />;
  };
  useEffect(() => {
    mapCtrl.getUserLocation(
      setLocation,
      currentMapCoord,
      setCurrentMapCoord,
      setBtnToggle,
      setCurrentMindle,
      setMindles,
    );
  }, []);

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
        snapPoints={[DEVICE_HEIGHT - 15, 130, 0]}
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
          loadingEnabled={true}
          loadingIndicatorColor={'#F3D737'}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={currentMapCoord}
          maxZoomLevel={19}
          minZoomLevel={17}
          toolbarEnabled={false}
          onMapReady={() => {
            updateMapStyle();
          }}
          onRegionChangeComplete={(currnet) => {
            // onRegionChange(currnet);
            mapCtrl.onRegionChange(
              currnet,
              mindleBaseCoord,
              checkInitialRegion,
              setCheckInitalRegion,
              setResearchMap,
              setCurrentMapCoord,
              setMindleBaseCoord,
            );
          }}
        >
          {mindles.map((props, index) => {
            if (props.visible === false) {
              console.log('무야호');
            } else {
              return (
                <Mindle
                  key={String(index)}
                  props={props}
                  onPress={() => {
                    MindleInfoCtrl.getClickedMindleInfo(props, setClickedMindleInfo);
                    bottomSheet.current.snapTo(1);
                  }}
                />
              );
            }
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
                MindleInfoCtrl.getClickedMindleInfo(currentMindle, setClickedMindleInfo);
                bottomSheet.current.snapTo(1);
              }}
              width="200px"
              height="60px"
              fontSize="25px"
              backgroundcolor="#431F0E"
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
              backgroundcolor="#431F0E"
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
          <ImageButton src={DefaultProfileImage} onPress={() => navigation.navigate('Mypage')} rounded />
        </View>
        <View
          style={{
            position: 'absolute',
            top: '90%',
            alignSelf: 'flex-end',
          }}
        >
          {/* 현재 ../asset/index.js에 있는 button 이미지로 버튼 생성 rounded 값으로 둥근 형태*/}
          <ImageButton
            src={button}
            onPress={() => navigation.navigate('HotSpot', { title: '핫스팟', type: 'hotSpot' })}
            rounded
          />
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
              backgroundcolor="#431F0E"
              onPress={() => {
                setResearchMap(false);
                //getData(currentMapCoord, location);
                dandelionCtrl.CompData(currentMapCoord, location, setCurrentMindle, setBtnToggle, setMindles);
              }}
            />
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            top: '10%',
            alignSelf: 'center',
          }}
        >
          <Text>카카오 API</Text>
          <Button
            onPress={() => {
              coord2address(location);
            }}
          />
        </View>
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
});
export default Maps;
