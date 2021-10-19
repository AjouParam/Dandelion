import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';

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
const BodyInput = styled.TextInput`
  flex-shrink: 1;
`;

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
  const titleRef = useRef();
  const bodyTextRef = useRef();
  const submitRef = useRef();
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [images, setImages] = useState([]);
  const [mindleId, setMindleId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const jwtToken = useRecoilValue(userState.uidState);
  const name = useRecoilValue(userState.nameState);
  useEffect(() => {
    axios.defaults.baseURL = 'http://10.0.2.2:3000/';
    axios.defaults.headers.common['x-access-token'] = jwtToken;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    setMindleId(route.params.mindleId);
    setLatitude(route.params.latitude);
    setLongitude(route.params.longitude);
  }, []);

  const setPost = async () => {
    const data = {
      title: title,
      text: bodyText,
      location: {
        longitude: longitude,
        latitude: latitude,
      },
      images: images,
    };

    await axios.post(`/${mindleId}/post/create`, data).then((res) => {
      /**{
        "status": "SUCCESS",
        "message": "게시글을 작성하였습니다.",
        "data": {
            "createdAt": "2021-10-04T08:50:51.405Z",
            "updatedAt": "2021-10-04T08:50:45.717Z",
            "likes": 0,
            "images": [
                "test1.jpg",
                "test2.jpg"
            ],
            "comments": 0,
            "_id": "615ac06b37a3bd4cc0c2f91c",
            "_user": "61365d8cd4e22a2dd4df2a6f",
            "_dandelion": "614c4ae99aa99a08e0d57c30",
            "location": {
                "type": "Point",
                "coordinates": [
                    127.04275784194242,
                    37.28335975273373
                ]
            },
            "title": "test2에 첫게시글",
            "text": "블라블라",
            "__v": 0
          }
        } 
      */
      if (res.data.status === 'SUCCESS') {
        console.log(res.data.message);
        const userId = res.data.data._user;
        res.data.data._user = { _id: userId, name: name };
        route.params.onGoBack(res.data.data);
        navigation.goBack();
      } else {
        console.log('Failed to post');
      }
    });
  };
  return (
    <Container>
      <TitleContainer>
        <TitleInput
          ref={titleRef}
          placeholder={'제목'}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          onSubmitEditing={() => bodyTextRef.current.focus()}
        ></TitleInput>
      </TitleContainer>
      <Body>
        <BodyInput
          ref={bodyTextRef}
          placeholder={'내용을 입력하세요.'}
          value={bodyText}
          onChangeText={(text) => {
            setBodyText(text);
          }}
          multiline={true}
        ></BodyInput>
      </Body>
      <Footer>
        <SelectPhotoButton>
          <Text>사진</Text>
        </SelectPhotoButton>
        {/* TODO : Replace to navigation header button */}
        <PostButton>
          <Text
            ref={submitRef}
            onPress={() => {
              setPost();
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
