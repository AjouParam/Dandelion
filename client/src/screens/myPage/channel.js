import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { tester1, tester2, tester3, tester4, tester5, profile } from '../../assets/index';
const test_image = [tester1, tester2, tester3, tester4, tester5];

const SendText = styled.Text`
  color: #efb233;
  font-size: 18px;
  font-weight: 700;
`;

const SendButton = (props) => {
  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 60,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <SendText>전송</SendText>
    </Send>
  );
};
const channel = ({ navigation, props }) => {
  const [messages, setMessages] = useState([]);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);
  useEffect(() => {
    console.log(messages);
    setMessages([
      {
        _id: 1,
        text: '안녕 병희야',
        createdAt: new Date(),
        user: {
          _id: props.id,
          name: props.name,
          avatar: props.src,
        },
      },
      {
        _id: 2,
        text: '나는 병희라고 해',
        createdAt: new Date(),
        user: {
          _id: 5110,
          name: '장병희',
          avatar: profile,
        },
      },
    ]);
  }, []);
  return (
    <GiftedChat
      listViewProps={{
        style: { backgroundColor: '#ffffff' },
      }}
      placeholder="보낼 메시지를 입력하세요"
      messages={messages}
      user={{ _id: 5110, name: '장병희', avatar: profile }}
      onSend={(messages) => onSend(messages)}
      alwaysShowSend={true}
      textInputProps={{
        autoCapitalize: 'none',
        autoCorrect: false,
        textContentType: 'none', // iOS only
        underlineColorAndroid: 'transparent', // Android only
      }}
      multiline={false}
      renderUsernameOnMessage={true}
      scrollToBottom={true}
      renderSend={(props) => <SendButton {...props} />}
    />
  );
};

export default channel;
