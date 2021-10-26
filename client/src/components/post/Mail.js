import React, { useState } from 'react';
import { View, Text, Header, TouchableWithoutFeedback } from 'react-native';
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
const BottomView = styled.View`
  display: flex;
  flex-direction: column;
`;

const MindleName = styled.Text``;
const MailDate = styled.Text``;
const MailText = styled.Text``;

const Mail = ({ navigation, props, click }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        click && navigation.navigate('PostContainer', { title: props.name, props, type: 'detail', state: 'mindle' })
      }
    >
      <Container>
        <TopView>
          <MindleName>{props.name}</MindleName>
          <MailDate>{`${props.date}`}</MailDate>
        </TopView>
        <BottomView>
          <MailText>{props.text}</MailText>
        </BottomView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Mail;
