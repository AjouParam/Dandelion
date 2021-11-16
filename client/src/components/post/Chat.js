import React, { useState, useEffect } from 'react';
import { Alert, Text, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Button } from 'react-native';
import styled from 'styled-components/native';
import { MailImage, ImageButton } from '@components';
import { useRecoilValue, useRecoilState } from 'recoil';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${({ type }) => type};
  padding: 10px;
`;
const ContentsView = styled.View`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px;
`;

const MindleName = styled.Text`
  /* padding-left: 5px;
  padding-top: 5px; */
`;
const MailText = styled.Text`
  /* padding-left: 5px;
  padding-top: 5px; */
  padding: 5px;
  border: 1px;
  border-radius: 5px;
  align-self: center;
`;
const Chat = ({ props, type }) => {
  const { sender, message, createAt } = props;
  return (
    <Container type={type ? 'flex-end' : 'flex-start'}>
      <MailImage url={11} imageStyle={{}} rounded={true} />
      <ContentsView>
        <MindleName>{sender}</MindleName>
        <MailText>{message}</MailText>
      </ContentsView>
    </Container>
  );
};

export default Chat;
