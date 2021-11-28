import React, { useEffect, useState } from 'react';
import { Dimensions, Text } from 'react-native';

import styled from 'styled-components/native';

import Mindle from '../../components/post/Mindle';
import { HotSpotCtrl } from '../../controller/hotSpotCtrl';

const Container = styled.ScrollView`
  height: ${Dimensions.get('window').height - 60}px;
  background-color: #ffffff;
`;

const MindleSubPage = ({ navigation, props, setLoading }) => {
  //console.log('HotSpot props', props);
  const [localHotspot, setLocalHotspot] = useState([]);
  //const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    const getData = async () => {
      return await HotSpotCtrl.getLocalHotspot(page, setPage);
    };

    const temp = getData();
    setLocalHotspot(temp);
  }, []);
  useEffect(() => {
    setLoading(true);
    console.log(localHotspot);
  }, [localHotspot]);

  return (
    <Container>
      {localHotspot.len > 0 &&
        localHotspot.map((item) => {
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
