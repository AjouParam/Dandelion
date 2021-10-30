import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';
import CustomHeader from '@/components/CustomHeader';
import Mindle from '@/components/post/Mindle';

const Container = styled.View`
  flex: 1;
`;

const MindleSelect = ({ navigation }) => {
  const renderMindleList = useCallback(({ item }) => (
    <Mindle
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
  ));

  return (
    <Container>
      <FlatList
        data={mindleList}
        renderItem={renderMindleList}
        keyExtractor={(item, idx) => String(item._id)}
        ListHeaderComponent={() => <CustomHeader navigation={navigation} title={'민들레 목록'} />}
      />
    </Container>
  );
};
export default MindleSelect;
