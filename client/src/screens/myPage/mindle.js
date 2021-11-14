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
          name: '동관 앞',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '동관',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '동관 옆',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '동관 앞',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '동관 앞',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '동관 앞',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '동관 앞',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: '동관 앞',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      {/* <Mindle />
      <Mindle /> */}
    </Container>
  );
};

export default MindleSubPage;
