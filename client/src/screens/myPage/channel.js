import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../../service/socket';
import styled from 'styled-components/native';
import Input from '../../components/post/commentInput';
import userState from '../../contexts/userState';
import Chat from '../../components/post/Chat';
import { Dimensions, Platform, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useRecoilValue } from 'recoil';

axios.defaults.baseURL = 'http://10.0.2.2:4000/';
const headers = {
  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  Accept: '*/*',
};
const getDate = async (_id) => {
  const result = await axios.post('/mail/loadDetail', {
    _id,
  });
  return result.data.data;
};

const channel = ({ navigation, props }) => {
  const name = useRecoilValue(userState.nameState);
  const [messageList, setMessageList] = useState([]);
  const addComment = (text) => {
    console.log('프롭스', props);
    socket?.emit('sendMessage', props._id, name, text, props.name);
  };
  useEffect(async () => {
    setMessageList(await getDate(props._id));
    console.log(messageList);
  }, []);

  useEffect(() => {
    socket?.on('receiveMessage', (res) => {
      console.log('파이이', res);
      if (messageList.length > 0) {
        setMessageList((prev) => [...prev, res]);
      } else {
        setMessageList([res]);
      }
    });
  }, []);
  return (
    <>
      {messageList
        ?.sort((a, b) => (a.createAt > b.createAt ? 1 : -1))
        .map((element, index) => (
          <Chat key={index} props={element} type={element.sender === name ? true : false} />
        ))}
      <Input navigation={navigation} functionCall={{ addComment }} />
    </>
  );
};

export default channel;
