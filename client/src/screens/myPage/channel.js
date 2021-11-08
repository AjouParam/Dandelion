import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat';
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
        marginHorizontal: 3,
      }}
    >
      <SendText>전송</SendText>
    </Send>
  );
};

const BubbleStyle = (props) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: '#424242',
          fontFamily: 'CerebriSans-Book',
        },
        left: {
          color: '#424242',
          fontFamily: 'CerebriSans-Book',
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E2E2E2',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 0,
        },
        right: {
          backgroundColor: '#F6F6F6',
          borderWidth: 1,
          borderColor: '#E2E2E2',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 20,
        },
      }}
    />
  );
};
const RenderInput = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: 'white',
        borderTopColor: '#E8E8E8',
        borderTopWidth: 1,
        padding: 2,
      }}
    />
  );
};
const channel = ({ props }) => {
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
        autoCorrect: true,
        textContentType: 'none', // iOS only
        underlineColorAndroid: 'transparent', // Android only
      }}
      multiline={true}
      renderUsernameOnMessage={true}
      scrollToBottom={true}
      renderSend={(props) => <SendButton {...props} />}
      renderBubble={(props) => <BubbleStyle {...props} />}
      renderInputToolbar={(props) => <RenderInput {...props} />}
    />
  );
};

export default channel;
