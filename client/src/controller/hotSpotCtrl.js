import React from 'react';
import { View, Text, Alert, Dimensions } from 'react-native';
import styled from 'styled-components';
import LocalMindle from '../screens/myPage/localmindle';
import GlobalMindle from '../screens/myPage/globalmindle';

const Title = styled.Text`
  margin: 16px;
  font-size: 20px;
`;
export const HotSpotModule = {
  //   hotSpot: <HotSpot />,
  local: function () {
    return (
      <>
        <Title>내 주변 핫스팟</Title>
        <LocalMindle navigation={this.navigation} props={this.props} />
      </>
    );
  },
  global: function () {
    return (
      <>
        <Title>전국 핫스팟</Title>
        <GlobalMindle navigation={this.navigation} props={this.props} />
      </>
    );
  },
};
