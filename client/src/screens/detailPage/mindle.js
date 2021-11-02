import React, { useState } from 'react';
import { View, Text, Header, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components';

import Mindle from '../../components/post/Mindle';

import utilConstant from '../../utils/utilConstant';
import { PostModule } from '../../controller/postCtrl';

const Container = styled.View`
  height: ${Dimensions.get('window').height}px;
  display: flex;
  background-color: #fff;
  justify-content: flex-start;
`;
const MindleContainer = styled.View`
  height: 120px;
  background-color: #fff;
`;
const ImageList = styled.View`
  display: flex;
  height: 190px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fff;
`;
const ImageElement = styled.Image`
  border: 1px solid black;
  width: 80px;
  height: 80px;
  margin: 5px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 40px;
  align-content: center;
`;

const PostButton = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width / 2}px;
`;
const PostButtonText = styled.Text`
  color: ${(props) => (props.state === 'post' ? '#EFB233' : '#CCCCCC')};
`;
const EventButton = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width / 2}px;
`;
const EventButtonText = styled.Text`
  color: ${(props) => (props.state === 'event' ? '#EFB233' : '#CCCCCC')};
`;
const PostContainer = styled.View`
  height: ${Dimensions.get('window').height - 310}px;
  background-color: #fff;
`;
const backgroundStyle = { backgroundColor: 'dimgrey' };

const MindleSubPage = ({ navigation, props }) => {
  const [state, setState] = useState('post');

  return (
    <Container>
      <MindleContainer>
        <Mindle //type setting
          click={false}
          navigation={navigation}
          props={props}
        />
      </MindleContainer>
      <ImageList>
        {Array.from({ length: utilConstant.defaultMindleImage }).map((element) => (
          <ImageElement />
        ))}
      </ImageList>
      <ButtonContainer>
        <PostButton
          onPress={() => setState('post')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            backgroundColor: '#fff',
            borderBottomWidth: 2,
            borderBottomColor: state === 'post' ? '#EFB233' : '#CCCCCC',
          }}
        >
          <PostButtonText state={state}>게시물</PostButtonText>
        </PostButton>
        <EventButton
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            backgroundColor: '#fff',
            borderBottomWidth: 2,
            borderBottomColor: state === 'event' ? '#EFB233' : '#CCCCCC',
          }}
          onPress={() => setState('event')}
        >
          <EventButtonText state={state}>이벤트</EventButtonText>
        </EventButton>
      </ButtonContainer>
      <PostContainer>{PostModule[state]?.call({ navigation, props: null, state: null })}</PostContainer>
    </Container>
  );
};

export default MindleSubPage;
