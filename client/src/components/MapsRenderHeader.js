import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;
const styles = StyleSheet.create({
  panel: {
    padding: 15,
    backgroundColor: '#ffffff',
  },

  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 5,
  },
});
const MapsRenderHeader = ({ clickedMindleInfo }) => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
      <View style={styles.panel}>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
          <View style={{ marginRight: 15 }}>
            <StyledText>{clickedMindleInfo.name}</StyledText>
          </View>
          <Text>made by {clickedMindleInfo.madeby}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
          <View style={{ marginRight: 15 }}>
            <Text>누적 방문자 {clickedMindleInfo.visitCount}</Text>
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text>실시간 {clickedMindleInfo.current}</Text>
          </View>
        </View>

        <View style={{ marginRight: 10 }}>
          <Text>{clickedMindleInfo.description}</Text>
        </View>
      </View>
    </>
  );
};

export default MapsRenderHeader;
