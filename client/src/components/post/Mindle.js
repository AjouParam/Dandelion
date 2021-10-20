import React, { useState } from 'react';
import { View, Text, Header } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;
const TopView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MidView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const BottomView = styled.View`
  display: flex;
  flex-direction: column;
`;

const MindleName = styled.Text``;
const MindleDistance = styled.Text``;
const CountVisitor = styled.Text``;
const CountEvent = styled.Text``;
const Address = styled.Text``;
const TagText = styled.Text``;

const Mindle = (props) => {
  return (
    <Container>
      <TopView>
        <MindleName>{props.name}</MindleName>
        <MindleDistance>{`${props.distance} km`}</MindleDistance>
      </TopView>
      <MidView>
        <CountVisitor>{`누적 방문자 ${props.countVisitor}명`}</CountVisitor>
        <CountEvent>{`이벤트 ${props.countEvent}개`}</CountEvent>
      </MidView>
      <BottomView>
        <Address>{props.address}</Address>
        <TagText>{props.tag}</TagText>
      </BottomView>
    </Container>
  );
};

Mindle.defaultProps = {
  name: '아무개',
  distance: '5.8',
  countVisitor: 42,
  countEvent: 9,
  address: '아주대학교',
  tag: '#무',
};

export default Mindle;
