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

const CreateMindle = ({ modalVisible, setModalVisible, position }) => {
  const jwtToken = useRecoilValue(userState.uidState);
  const nameRef = useRef();
  const hashtagRef = useRef();
  const [mindleName, setMindleName] = useState('');
  const [hashtag, setHashtag] = useState('');

  useEffect(() => {
    axios.defaults.baseURL = 'http://10.0.2.2:3000/';
    axios.defaults.headers.common['x-access-token'] = jwtToken;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    console.log('jwtToken', jwtToken);
  }, []);

  const modalClose = () => {
    setModalVisible(false);
    setMindleName('');
    setHashtag('');
  };

  const createMindle = async () => {
    if (position) console.log(`create in (longitude, latitude) : (${position.longitude}, ${position.latitude})`);

    await axios
      .post('/dandelion/create', {
        name: mindleName,
        location: { longitude: position.longitude, latitude: position.latitude },
        description: hashtag,
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          Alert.alert('성공', '민들레 심기 성공');
          modalClose();
        } else if (res.data.status === 'FAILED') {
          Alert.alert('실패', res.data.message);
        }
      })
      .catch((error) => {
        Alert.alert('실패', error.message.slice(5, error.message.length));
        console.log('실패 좌표값', position);
      });
  };

  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <Container>
        <Input
          ref={nameRef}
          label="이름"
          value={mindleName}
          onChangeText={(text) => {
            setMindleName(text);
          }}
          onSubmitEditing={() => hashtagRef.current.focus()}
          placeholder="민들레 이름"
          returnKeyType="next"
          width="250px"
        />
        <Input
          label="해시태그"
          value={hashtag}
          onChangeText={(text) => {
            setHashtag(text);
          }}
          placeholder="#태그1 #태그2 #태그3 ..."
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
            }}
            width="100px"
          />
        </BtnContainer>
      </Container>
    </Modal>
  );
};
export default CreateMindle;
