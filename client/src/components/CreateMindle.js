import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import Modal from '@components/Modal';
import { Input, Button } from '@components';
import { View, Text } from 'react-native';
import axios from 'axios';

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
const CreateMindle = ({ modalVisible, setModalVisible, position }) => {
  const nameRef = useRef();
  const hashtagRef = useRef();
  const [mindleName, setMindleName] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [hashtagList, setHashtagList] = useState([]);

  const modalClose = () => {
    setModalVisible(false);
    setMindleName('');
    setHashtag('');
    setHashtagList([]);
  };

  const createMindle = () => {
    if (hashtag) {
      const list = hashtag.split(' ');
      console.log(list);
      setHashtagList(list);
    }
    if (position) console.log(`create in (longitude, latitude) : (${position.longitude}, ${position.latitude})`);

    modalClose();
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
