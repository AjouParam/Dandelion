import React, { useState } from 'react';
import { View, Text, Header, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components';

import Mindle from '../../components/post/Mindle';

import utilConstant from '../../utils/utilConstant';
import { PostModule } from '../../controller/postCtrl';

const ImageList = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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
  align-content: center;
`;

const PostButton = styled.Text`
  border-bottom-width: 1;
  border-color: 'rgba(158, 150, 150, .5)';
  width: ${Dimensions.get('window').width / 2}px;
  font-size: 20px;
  text-align: center;
`;
const EventButton = styled.Text`
  border-bottom-width: 1;
  border-color: 'rgba(158, 150, 150, .5)';
  width: ${Dimensions.get('window').width / 2}px;
  font-size: 20px;
  text-align: center;
`;

const backgroundStyle = { backgroundColor: 'dimgrey' };

const MindleSubPage = ({ navigation, props }) => {
  const [state, setState] = useState('post');

  return (
    <>
      <Mindle //type setting
        click={false}
        navigation={navigation}
        props={props}
      />
      <ImageList>
        {Array.from({ length: utilConstant.defaultMindleImage }).map((element) => (
          <ImageElement />
        ))}
      </ImageList>
      <ButtonContainer>
        <TouchableOpacity onPress={() => setState('post')}>
          <PostButton style={state === 'post' ? backgroundStyle : {}}>게시물</PostButton>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setState('event')}>
          <EventButton style={state === 'event' ? backgroundStyle : {}}>이벤트</EventButton>
        </TouchableOpacity>
      </ButtonContainer>
      {PostModule[state]?.call({ navigation, props: null, state: null })}
    </>
  );
};

export default MindleSubPage;
