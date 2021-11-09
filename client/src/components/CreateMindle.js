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

const CreateMindle = ({ modalVisible, setModalVisible, position, setMindles }) => {
  const jwtToken = useRecoilValue(userState.uidState);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [mindleName, setMindleName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.defaults.baseURL = 'http://3.35.45.177:3000/';
    axios.defaults.headers.common['x-access-token'] = jwtToken;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }, []);

  const modalClose = () => {
    setModalVisible(false);
    setMindleName('');
    setDescription('');
  };
  const levelToRadius = (num) => {
    if (num == 1) {
      return 30;
    } else {
      return 50;
    }
  };
  const createMindle = async () => {
    if (position) console.log(`create in (longitude, latitude) : (${position.longitude}, ${position.latitude})`);

    await axios
      .post('/dandelion/create', {
        name: mindleName,
        location: { longitude: position.longitude, latitude: position.latitude },
        description: description,
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          /**
           *  <Mindle
                key={String(index)} //TODO : 올바른 key 값으로 수정 필요
                latitude={props.latitude}
                longitude={props.longitude}
                title={props.title}
                description={props.description}
                src={mindle1}
                radius={props.radius}
                overlap={props.overlap}
                //겹치는 경우 민들레 심기 아닌 경우 민들레 입장
                onPress={
                  props.overlap
                    ? () => Alert.alert('민들레 심기 정상')
                    : () => {
                        getClickedMindleInfo();
                        bottomSheet.current.snapTo(1);
                      }
                }
              />
           */

          setMindles((prev) =>
            prev.push({
              latitude: res.data.data.location.coordinates[1],
              longitude: res.data.data.location.coordinates[0],
              title: res.data.data.name,
              description: res.data.data.description,
              radius: levelToRadius(res.data.data.level),
              overlap: true,
            }),
          );
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
          onSubmitEditing={() => descriptionRef.current.focus()}
          placeholder="민들레 이름"
          returnKeyType="next"
          width="250px"
        />
        <Input
          label="설명"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
          placeholder="민들레에 대한 설명"
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
