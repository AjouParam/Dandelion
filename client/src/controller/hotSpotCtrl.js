import React from 'react';
import { View, Text, Alert, Dimensions } from 'react-native';
import styled from 'styled-components';
import LocalMindle from '../screens/myPage/localmindle';
import GlobalMindle from '../screens/myPage/globalmindle';

import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';

const jwtToken = useRecoilValue(userState.uidState);
const currentPosition = useRecoilValue(userState.userlocation);
axios.defaults.baseURL = 'http://3.35.45.177:3000/';
axios.defaults.headers.common['x-access-token'] = jwtToken;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const Title = styled.Text`
  margin: 16px;
  font-size: 20px;
`;

export const HotSpotCtrl = {
  getLocalHotspot: async function (page, setLocalHotspot, setLocalLoading) {
    console.log(page);
    console.log(currentPosition);
    await axios
      .post(
        `dandelion/get/hotspot/local`,
        {
          currentPosition: {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          },
          maxDistance: 300,
        },

        {
          params: { page: page, maxPost: 10 },
        },
      )
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log(res.data.message);
          setLocalHotspot(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .then(() => {
        setLocalLoading(true);
      });
  },
  getGlobalHotspot: async function (page, setGlobalHotspot, setGlobalLoading) {
    console.log(page);
    console.log(currentPosition);
    await axios
      .post(
        `dandelion/get/hotspot/national`,
        {
          currentPosition: {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          },
        },
        {
          params: { page: page, maxPost: 10 },
        },
      )
      .then((res) => {
        console.log(currentPosition);
        if (res.data.status === 'SUCCESS') {
          console.log(res.data.message);
          setGlobalHotspot(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .then(() => {
        setGlobalLoading(true);
      });
  },
};

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
