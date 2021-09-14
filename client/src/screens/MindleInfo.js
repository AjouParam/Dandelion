import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  background-color: #ffffff;
  height: 610px;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const MindleInfo = () => {
  return (
    <>
      <Container>
        <StyledText>민들레 세부 정보</StyledText>
      </Container>
    </>
  );
};
export default MindleInfo;
