import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import Modal from '@components/Modal';
import { Input, Button } from '@components';
import { View, Text } from 'react-native';

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
const CreateMindle = ({ modalVisible, setModalVisible }) => {
  const nameRef = useRef();
  const hashtagRef = useRef();
  const [mindleName, setMindleName] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [hashtagList, setHashtagList] = useState([]);

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
          placeholder="이름"
          returnKeyType="next"
          width="250px"
        />
        <Input
          label="해시태그"
          value={hashtag}
          onChangeText={(text) => {
            setHashtag(text);
          }}
          placeholder="이름"
          returnKeyType="next"
          width="250px"
        />
        <BtnContainer>
          <Button
            title="취소"
            onPress={() => {
              setModalVisible(false);
            }}
            width="100px"
          />
          <Button
            title="확인"
            onPress={() => {
              if (hashtag) {
                const list = hashtag.split(' ');
                console.log(list);
                setHashtagList(list);
              }
              setModalVisible(false);
              setMindleName('');
              setHashtag('');
              setHashtagList([]);
            }}
            width="100px"
          />
        </BtnContainer>
      </Container>
    </Modal>
  );
};
export default CreateMindle;
