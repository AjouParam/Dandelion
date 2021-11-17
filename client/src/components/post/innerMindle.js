import React, { useEffect, useState } from 'react';
import { View, Text, Header, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { coord2address } from '../../utils/common';
const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: 'rgba(158, 150, 150, .5)';
  padding: 10px 15px;
`;
const TopView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 5px 0;
`;
const MidView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;
const BottomView = styled.View`
  display: flex;
  flex-direction: column;
`;
const MindleName = styled.Text`
  font-weight: 700;
  font-size: 18px;
`;
const MindleDistance = styled.Text``;
const InfoText = styled.Text`
  font-weight: 500;
  font-size: 13px;
  margin-right: 25px;
`;
const CountVisitor = styled.Text`
  font-weight: 600;
  font-size: 13px;
  color: #efb233;
`;
const CountEvent = styled.Text`
  font-weight: 600;
  font-size: 13px;
  color: #87c548;
`;
const Address = styled.Text``;
const TagText = styled.Text`
  font-weight: 400;
  font-size: 13;
`;

// const MindleCreater = styled.Text`
//   margin-left: 25px;
//   font-weight: 400;
//   font-size: 13px;
// `;

const Mindle = ({ navigation, props, click }) => {
  console.log('address', props);
  const [address, setAddress] = useState();
  useEffect(() => {
    coord2address(props.location, setAddress);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => click && navigation.navigate('gotoMap', { location: props.location })}>
      <Container>
        <TopView>
          <MindleName>{props.name}</MindleName>
          <MindleDistance>
            {props.distance < 1000 ? `${props.distance.toFixed(0)} m` : `${props.distance.toFixed(0) / 1000} km`}
          </MindleDistance>
        </TopView>
        <MidView>
          <InfoText>
            누적 방문자 <CountVisitor>{props.cumulativeVisitors}</CountVisitor>
          </InfoText>
          <InfoText>
            이벤트 <CountEvent>{props.events}</CountEvent>
          </InfoText>
        </MidView>
        <BottomView>
          <Address>{address}</Address>
          <TagText>{props.description}</TagText>
        </BottomView>
      </Container>
    </TouchableWithoutFeedback>
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
