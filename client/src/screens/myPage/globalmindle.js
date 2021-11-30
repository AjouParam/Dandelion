import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

import styled from 'styled-components/native';
import { HotSpotCtrl } from '../../controller/hotSpotCtrl';

import Mindle from '../../components/post/Mindle';
import axios from 'axios';
const Container = styled.ScrollView`
  height: ${Dimensions.get('window').height - 60}px;
  background-color: #ffffff;
`;

const MindleSubPage = ({ navigation, props }) => {
  //console.log('HotSpot props', props);
  const [globalHotspot, setGobalHotspot] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    HotSpotCtrl.getLocalHotspot(page, setGobalHotspot, setLoading, setPage);
  }, []);
  return (
    <Container>
      {loading &&
        globalHotspot.map((item) => {
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
          />;
        })}
    </Container>
  );
};

export default MindleSubPage;
