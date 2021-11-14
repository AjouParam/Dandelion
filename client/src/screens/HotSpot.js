import React, { useState } from 'react';
import { View, Text, Alert, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';

import { HotSpotModule } from '../controller/hotSpotCtrl';
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
  return (
    <Container>
      <SwipeContainer></SwipeContainer>
      <Swiper
        showsPagination={true}
        paginationStyle={{ position: 'absolute', bottom: Dimensions.get('window').height - utilConstant.marginSwiper }}
        loop={false}
      >
        {HotSpotModule['local']?.call({ navigation })}
        {HotSpotModule['global']?.call({ navigation })}
      </Swiper>
    </Container>
  );
};

export default HotSpot;
