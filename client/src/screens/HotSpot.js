import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Dimensions, LogBox } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';

import { HotSpotModule, HotSpotCtrl } from '../controller/hotSpotCtrl';
import HotSpotComponent from '../components/post/Mindle';
import utilConstant from '../utils/utilConstant';

const Container = styled.View`
  height: ${Dimensions.get('window').height - utilConstant.marginWidth}px;
`;
const SwipeContainer = styled.View`
  height: 30px;
  background-color: 'rgba(158, 150, 150, .5)';
`;
const HotSpot = ({ navigation }) => {
  const [localHotspot, setLocalHotspot] = useState([]);
  const [globalHotspot, setGlobalHotspot] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  useEffect(() => {
    LogBox.ignoreLogs(['Expected style']);
    HotSpotCtrl.getLocalHotspot(1, setLocalHotspot, setLocalLoading);
    HotSpotCtrl.getGlobalHotspot(1, setGlobalHotspot, setGlobalLoading);
  }, []);
  useEffect(() => {
    console.log(localHotspot);
  }, [localLoading]);
  return (
    <Container>
      <SwipeContainer></SwipeContainer>
      {localLoading && globalLoading && (
        <>
          <Swiper
            showsPagination={true}
            paginationStyle={{
              position: 'absolute',
              bottom: Dimensions.get('window').height - utilConstant.marginSwiper,
            }}
            loop={false}
          >
            {HotSpotModule['local']?.call({ navigation, props: localHotspot })}
            {HotSpotModule['global']?.call({ navigation, props: globalHotspot })}
          </Swiper>
        </>
      )}
    </Container>
  );
};

export default HotSpot;
