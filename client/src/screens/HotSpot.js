import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Dimensions, LogBox } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';

import { HotSpotModule, HotSpotCtrl } from '../controller/hotSpotCtrl';
import HotSpotComponent from '../components/post/Mindle';
import utilConstant from '../utils/utilConstant';
import Mindle from '../components/post/Mindle';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';
import axios from 'axios';

const Container = styled.View`
  height: ${Dimensions.get('window').height - utilConstant.marginWidth}px;
`;
const SwipeContainer = styled.View`
  height: 30px;
  background-color: 'rgba(158, 150, 150, .5)';
`;
const HotSpot = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [globalHotspot, setGlobalHotspot] = useState([]);
  const [localHotspot, setLocalHotspot] = useState([]);
  const [localPage, setLocalPage] = useState(1);
  const [globalPage, setGlobalPage] = useState(1);

  const jwtToken = useRecoilValue(userState.uidState);
  const currentPosition = useRecoilValue(userState.userlocation);
  axios.defaults.baseURL = 'http://3.35.45.177:3000/';
  axios.defaults.headers.common['x-access-token'] = jwtToken;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  useEffect(() => {
    LogBox.ignoreLogs(['Expected style']);

    getLocalData();
    getGlobalData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (loading) console.log(localHotspot);
  }, [localHotspot]);

  const getLocalData = async () => {
    return await axios
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
          params: { page: localPage, maxPost: 10 },
        },
      )
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          setLocalPage((prev) => prev + 1);
          setLocalHotspot(res.data.data);
          return res.data.data;
        } else {
          console.log(res.data.message);
          return null;
        }
      });
  };
  const getGlobalData = async () => {
    return await axios
      .post(
        `dandelion/get/hotspot/national`,
        {
          currentPosition: {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          },
        },
        {
          params: { page: globalPage, maxPost: 10 },
        },
      )
      .then((res) => {
        console.log(currentPosition);
        if (res.data.status === 'SUCCESS') {
          console.log(res.data.message);
          setGlobalPage((prev) => prev + 1);
          setGlobalHotspot(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .then(() => {
        setLoading(true);
      });
  };
  return (
    <Container>
      <SwipeContainer></SwipeContainer>
      {loading && (
        <Swiper
          showsPagination={true}
          paginationStyle={{
            position: 'absolute',
            bottom: Dimensions.get('window').height - utilConstant.marginSwiper,
          }}
          loop={false}
        >
          {/* {HotSpotModule['local']?.call({ navigation, loading, setLoading })} */}
          {/* {HotSpotModule['global']?.call({ navigation })} */}
          <>
            {localHotspot.map((item) => {
              return (
                <Mindle //type setting
                  click={true}
                  navigation={navigation}
                  props={{
                    name: item.name,
                    location: item.location,
                    distance: item.distance,
                    cumulativeVisitors: item.cumulativeVisitors,
                    events: item.events,
                    descriptions: item.descriptions,
                  }}
                />
              );
            })}
          </>
          <>
            {globalHotspot.map((item) => {
              return (
                <Mindle //type setting
                  click={true}
                  navigation={navigation}
                  props={{
                    name: item.name,
                    location: item.location,
                    distance: item.distance,
                    cumulativeVisitors: item.cumulativeVisitors,
                    events: item.events,
                    descriptions: item.descriptions,
                  }}
                />
              );
            })}
          </>
        </Swiper>
      )}
    </Container>
  );
};

export default HotSpot;
