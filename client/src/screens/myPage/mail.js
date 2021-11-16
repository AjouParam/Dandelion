import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, Header, FlatList, SafeAreaView } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import userState from '../../contexts/userState';
import messageRoomState from '../../contexts/messageRoomState';
import Mail from '../../components/post/Mail';

const MailSubPage = ({ navigation, props }) => {
  const [messageList, setMessageList] = useRecoilState(messageRoomState.roomIdState);
  const user = useRecoilValue(userState.nameState);
  console.log('dd', messageList);

  useEffect(async () => {
    const result = await axios.post('http://10.0.2.2:4000/mail/load/', { user });
    if (result.data.status === 'SUCCESS') setMessageList(result.data.data);
  }, []);
  return (
    <>
      {messageList.map((element) => (
        <Mail
          navigation={navigation}
          props={{
            name: element.user,
            text: element.message.message,
            date: element.message.createAt,
            _id: element._id,
          }}
          click={true}
        />
      ))}
    </>
  );
};

export default MailSubPage;
