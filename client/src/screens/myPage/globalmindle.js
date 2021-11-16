import React from 'react';
import { Dimensions } from 'react-native';

import styled from 'styled-components/native';

import Mindle from '../../components/post/Mindle';
import axios from 'axios';
const Container = styled.ScrollView`
  height: ${Dimensions.get('window').height - 60}px;
  background-color: #ffffff;
`;

const MindleSubPage = ({ navigation, props }) => {
  console.log('HotSpot props', props);

  return (
    <Container>
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '도래 한옥마을',
          location: { latitude: 35.00252344654882, longitude: 126.82102650940055 },
          distance: 1650,
          countVisitor: 142,
          countEvent: 12,
          tag: '#광주 #포토존',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '마비정벽화마을',
          location: { latitude: 35.78528236884822, longitude: 128.5454231748076 },
          distance: 1500,
          countVisitor: 452,
          countEvent: 4,
          tag: '#대구 #찻집',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '전주한옥마을',
          location: { latitude: 35.815252186814604, longitude: 127.15259325699962 },
          distance: 800,
          countVisitor: 874,
          countEvent: 7,
          tag: '#전주 #한옥 #서예',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '수암골',
          location: { latitude: 36.65121253198789, longitude: 127.49558491712223 },
          distance: 1200,
          countVisitor: 80,
          countEvent: 1,
          tag: '#청주 #야경_명소',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '송월동동화마을',
          location: { latitude: 37.483563995287824, longitude: 126.62368015693144 },
          distance: 100,
          countVisitor: 42,
          countEvent: 12,
          tag: '#인천 #어린이 #커플',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '168계단',
          location: { latitude: 35.12657820003023, longitude: 129.03550674748965 },
          distance: 1600,
          countVisitor: 82,
          countEvent: 9,
          tag: '#부산 #마_이게_부산이다',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '도깨비드라마촬영지',
          location: { latitude: 37.88624655628525, longitude: 128.83422825778555 },
          distance: 3900,
          countVisitor: 12,
          countEvent: 3,
          tag: '#강릉 #날이_좋아서',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '성심당 본점',
          location: { latitude: 36.32868530108883, longitude: 127.427441874004 },
          distance: 4800,
          countVisitor: 62,
          countEvent: 9,
          tag: '#대전 #튀김_소보루',
        }}
      />
      {/* <Mindle />
      <Mindle /> */}
    </Container>
  );
};

export default MindleSubPage;
