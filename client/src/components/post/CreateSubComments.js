import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import Modal from '@components/Modal';
import { Input, Button } from '@components';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';

const Container = styled.View`
  flex: 1;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BtnContainer = styled.View`
  margin-top: 10px;
  margin-left: 20px;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const headers = {
  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  Accept: '*/*',
};

const CreateSubComment = ({ modalVisible, setModalVisible, setSubComments, commentID }) => {
  const jwtToken = useRecoilValue(userState.uidState);
  const userName = useRecoilValue(userState.nameState);
  const TextRef = useRef();
  const [text, setText] = useState('');

  useEffect(() => {
    axios.defaults.baseURL = 'http://3.35.45.177:3000/';
    axios.defaults.headers.common['x-access-token'] = jwtToken;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }, []);

  const modalClose = () => {
    setModalVisible(false);
    setText('');
  };
  const createMindle = async () => {
    await axios
      .post(`/${commentID}/nestedComment/create`, {
        text: text,
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log('create subcomment', res.data.message);
          const resData = res.data.data._user;
          const newComment = {
            ...res.data.data,
            _user: {
              _id: resData,
              name: userName,
            },
          };
          setSubComments((prev) => [...prev, newComment]);
          return true;
        } else {
          console.log(res.data.message);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <Container>
        <Input
          ref={TextRef}
          label="답글"
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
          placeholder="답글 작성"
          returnKeyType="next"
          width="250px"
        />
        <BtnContainer>
          <Button
            title="취소"
            isFilled={false}
            onPress={() => {
              modalClose();
            }}
            width="100px"
          />
          <Button
            title="확인"
            onPress={() => {
              createMindle();
              modalClose();
            }}
            width="100px"
          />
        </BtnContainer>
      </Container>
    </Modal>
  );
};
export default CreateSubComment;
