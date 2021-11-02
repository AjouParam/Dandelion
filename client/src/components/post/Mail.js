import React, { useState } from 'react';
import { View, Text, Header, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { MailImage, ImageButton } from '@components';
const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-color: 'rgba(158, 150, 150, .5)';
`;
const TopView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ContentsView = styled.View`
  display: flex;
  flex-direction: column;
`;

const MindleName = styled.Text`
  padding-left: 5px;
  padding-top: 5px;
`;
const MailDate = styled.Text`
  margin-right: 5px;
`;
const MailText = styled.Text`
  flex: 1;
  padding-left: 5px;
  padding-top: 5px;
  flex-wrap: wrap;
`;

const Mail = ({ navigation, props, click }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        click && navigation.navigate('PostContainer', { title: props.name, props, type: 'detail', state: 'mindle' })
      }
    >
      <Container>
        <TopView>
          <View style={{ flexDirection: 'row' }}>
            <MailImage url={props.src} imageStyle={{}} rounded={true} />
            <ContentsView>
              <MindleName>{props.name}</MindleName>
              <MailText>{props.text.length > 24 ? props.text.substring(0, 24) + '...' : props.text}</MailText>
            </ContentsView>
          </View>
          <MailDate>{`${props.date}`}</MailDate>
        </TopView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Mail;
