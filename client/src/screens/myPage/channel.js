import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';
import decode from 'jwt-decode';
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { tester1, tester2, tester3, tester4, tester5, profile } from '../../assets/index';
import axios from 'axios';
// const test_image = [tester1, tester2, tester3, tester4, tester5];

const SendBtn = styled.TouchableOpacity``;
const SendText = styled.Text`
  color: #efb233;
  font-size: 18px;
  font-weight: 700;
`;

const SendButton = (props, sendMessage) => {
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
      <SendBtn
        onPress={() => {
          /** TODO : Send message through socket */
          sendMessage();
        }}
      >
        <SendText>전송</SendText>
      </SendBtn>
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
const RenderTime = (props) => {
  return (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: 'grey',
        },
        right: {
          color: 'grey',
        },
      }}
    />
  );
};
const channel = ({ navigation, props }) => {
  const token = useRecoilValue(userState.uidState);
  const userName = decode(token).name;
  const userId = decode(token)._id;
  const [messages, setMessages] = useState([]);

  const roomId = props.roomId,
  const audienceName = props.name;
  const audienceProfile = props.src;
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  axios.defaults.baseURL = 'http://3.35.45.177:3000/';
  axios.defaults.headers.common['x-access-token'] = token;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  useEffect(() => {
    /** TODO : Get messages api */

    const loadMessages = async (roomId) => {
      await axios
        .post('/mail/loadDetail', {
          _id: 'testid', //roomId
        })
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            setMessages(res.data.data);
          } else {
            console.log('쪽지 기록 불러오기 실패');
          }
        });
    };

    //loadMessages();

    setMessages([
      {
        _id: 1,
        text: `안녕 ${userName}!!`,
        createdAt: new Date(),
        user: {
          _id: '12345',
          name: props.name,
          avatar: props.src,
        },
      },
      {
        _id: 2,
        text: `반가워 ${audienceName}!`,
        createdAt: new Date(),
        user: {
          _id: userId,
          name: userName,
          avatar: profile,
        },
      },
    ]);
  }, []);

  const sendMessage = async () => {
    // TODO : SocketIO
  };

  /** 마이페이지  */
  return (
    <GiftedChat
      listViewProps={{
        style: { backgroundColor: '#ffffff' },
      }}
      placeholder="보낼 메시지를 입력하세요"
      messages={messages}
      user={{ _id: userId, name: userName, avatar: profile }}
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
      renderSend={(props) => <SendButton {...props} sendMessage={sendMessage} />}
      renderBubble={(props) => <BubbleStyle {...props} />}
      renderInputToolbar={(props) => <RenderInput {...props} />}
      renderTime={(props) => <RenderTime {...props} />}
    />
  );
};

export default channel;
