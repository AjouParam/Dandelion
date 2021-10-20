import React from 'react';
import { View, Text, Header } from 'react-native';
import Mindle from '../../components/post/Mindle';

const MindleSubPage = () => {
  return (
    <>
      <Mindle //type setting
        props={{
          name: '동관 앞',
          distance: '5.8',
          countVisitor: 42,
          countEvent: 9,
          address: '영통임다.',
          tag: '#아대',
        }}
      />
      <Mindle />
      <Mindle />
    </>
  );
};

export default MindleSubPage;
