import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { back } from '../assets/index';

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 60px;
  align-items: center;
  border-bottom-width: 1;
  border-color: 'rgba(158, 150, 150, .5)';
  font-weight: bold;
  background-color: #ffffff;
`;

const BackButton = styled.Image`
  width: 40px;
  height: 40px;
`;

const OuterButton = styled.TouchableOpacity`
  position: absolute;
  left: 0px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

const CustomHeader = ({ navigation, title }) => {
  return (
    <Header>
      <OuterButton onPress={() => navigation.goBack()}>
        <BackButton source={back} />
      </OuterButton>
      <Title>{title}</Title>
    </Header>
  );
};

export default CustomHeader;
