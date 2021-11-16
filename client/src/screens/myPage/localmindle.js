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
          name: '수원 화성',
          location: { latitude: 37.287647686215976, longitude: 127.01186771900946 },
          distance: 1650,
          countVisitor: 142,
          countEvent: 12,
          tag: '#48개의_구조물 #18세기',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '화성행궁',
          location: { latitude: 37.28240645749294, longitude: 127.01379890953197 },
          distance: 1500,
          countVisitor: 452,
          countEvent: 4,
          tag: '#1789년의_역사 #수원의자랑',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '광교호수공원',
          location: { latitude: 37.28332785363472, longitude: 127.06586315451247 },
          distance: 800,
          countVisitor: 874,
          countEvent: 7,
          tag: '#호수 #숲 #도심',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '팔달문',
          location: { latitude: 37.2776746267467, longitude: 127.01666668942529 },
          distance: 1200,
          countVisitor: 80,
          countEvent: 1,
          tag: '#18세기 #대형문',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '지동벽화마을',
          location: { latitude: 37.28138245882284, longitude: 127.02301487577867 },
          distance: 1600,
          countVisitor: 82,
          countEvent: 9,
          tag: '#데이트코스',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '효원의 종',
          location: { latitude: 37.279809846792965, longitude: 127.01033197468881 },
          distance: 3900,
          countVisitor: 12,
          countEvent: 3,
          tag: '#수원종 #타종체험',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '수원 구 부국원',
          location: { latitude: 37.272638597391726, longitude: 127.01443039009712 },
          distance: 4800,
          countVisitor: 62,
          countEvent: 9,
          tag: '#수인선 #근대문화공간',
        }}
      />
      {/* <Mindle />
      <Mindle /> */}
    </Container>
  );
};

export default MindleSubPage;
