import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';

const Container = styled.View`
  flex: 1;
  display: flex;
  padding: 15px 15px;
  background-color: #ffffff;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const Divider = styled.View`
  margin-top: 10px;
  height: 1px;
  border: 0.5px solid #000000;
`;
const MindleInfo = ({ navigation, route }) => {
  const [mindleInfo, setMindleInfo] = useState({ name: '', madeby: '', hashtag: [], visitCount: '', current: '' });

  useEffect(() => {
    setMindleInfo(route.params.mindleInfo);
    setTimeout(() => {
      if (mindleInfo) console.log(mindleInfo);
    }, 200);
  }, []);

  const Header = () => {
    return (
      <>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
            <View style={{ marginRight: 15 }}>
              <StyledText>{mindleInfo.name}</StyledText>
            </View>
            <Text>made by {mindleInfo.madeby}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
            <View style={{ marginRight: 15 }}>
              <Text>누적 방문자 {mindleInfo.visitCount}</Text>
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text>실시간 {mindleInfo.current}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
            {mindleInfo.hashtag.map((item, idx) => (
              <View key={idx} style={{ marginRight: 10 }}>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Container>
        <Header />
        <Divider />
      </Container>
    </>
  );
};
export default MindleInfo;
