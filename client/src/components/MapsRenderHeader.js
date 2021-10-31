import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const HeaderContainer = styled.View`
  height: 130px;
  padding: 5px 25px;
  background-color: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
const HeaderHandle = styled.View`
  width: 100%;
  height: 15px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;
const HeaderHandleBar = styled.View`
  width: 26px;
  height: 4px;
  background-color: #e2e2e2;
`;
const MindleTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 5px 0;
`;
const MindleTitle = styled.Text`
  font-weight: 800;
  font-size: 20px;
`;
const MindleCreater = styled.Text`
  margin-left: 25px;
  font-weight: 400;
  font-size: 13px;
`;

const VisitorContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;
const InfoText = styled.Text`
  font-weight: 500;
  font-size: 13px;
  margin-right: 25px;
`;
const CumulativeVisitors = styled.Text`
  font-weight: 600;
  font-size: 13px;
  color: #efb233;
`;
const CurrentVisitors = styled.Text`
  font-weight: 600;
  font-size: 13px;
  color: #87c548;
`;
const DescriptionContainer = styled.View`
  margin-bottom: 10px;
`;
const MindleDescription = styled.Text`
  font-weight: 400;
  font-size: 13;
`;

const MapsRenderHeader = ({ clickedMindleInfo }) => {
  return (
    <>
      <HeaderContainer>
        <HeaderHandle>
          <HeaderHandleBar />
        </HeaderHandle>
        <MindleTitleContainer>
          <MindleTitle>{clickedMindleInfo.name}</MindleTitle>
          <MindleCreater>made by {clickedMindleInfo.madeby}</MindleCreater>
        </MindleTitleContainer>
        <VisitorContainer>
          <InfoText>
            누적 방문자 <CumulativeVisitors>{clickedMindleInfo.visitCount}</CumulativeVisitors>
          </InfoText>
          <InfoText>
            실시간 <CurrentVisitors>{clickedMindleInfo.current}</CurrentVisitors>
          </InfoText>
        </VisitorContainer>

        <DescriptionContainer>
          <MindleDescription>{clickedMindleInfo.description}</MindleDescription>
        </DescriptionContainer>
      </HeaderContainer>
    </>
  );
};

export default MapsRenderHeader;
