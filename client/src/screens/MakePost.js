import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 5px;
`;
const Text = styled.Text`
  font-size: 14px;
`;
const TitleContainer = styled.View`
  height: 10%;
  padding: 15px 5px;
  justify-content: center;
  border-bottom-width: 1px;
`;
const TitleInput = styled.TextInput`
  height: 80px;
`;
const Body = styled.View`
  height: 80%;
  padding: 15px 5px;
  border-bottom-width: 1px;
`;
const BodyInput = styled.TextInput``;

const Footer = styled.View`
  padding: 15px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  width: 100%;
`;
const SelectPhotoButton = styled.TouchableOpacity``;
const PostButton = styled.TouchableOpacity``;

const MakePost = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [images, setImages] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    console.log(route);
    setLatitude(route.params.latitude);
    setLongitude(route.params.longitude);
  }, []);

  const setPost = () => {
    /**
     * {
        "title":"test2에 첫게시글",
        "text":"블라블라",
        "location":{
            "longitude":127.04275784194242,
            "latitude":37.28335975273373
        },
        "images":["test1.jpg","test2.jpg"]
        }
     */
  };
  return (
    <Container>
      <TitleContainer>
        <TitleInput
          placeholder={'제목'}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
        ></TitleInput>
      </TitleContainer>
      <Body>
        <BodyInput
          placeholder={'내용을 입력하세요.'}
          value={bodyText}
          onChangeText={(text) => {
            setBodyText(text);
          }}
        ></BodyInput>
      </Body>
      <Footer>
        <SelectPhotoButton>
          <Text>사진</Text>
        </SelectPhotoButton>
        {/* TODO : Replace to navigation header button */}
        <PostButton>
          <Text
            onPress={() => {
              Alert.alert('TODO', `${title}, ${bodyText}, ${latitude}, ${longitude}`);
            }}
          >
            완료
          </Text>
        </PostButton>
      </Footer>
    </Container>
  );
};
export default MakePost;
