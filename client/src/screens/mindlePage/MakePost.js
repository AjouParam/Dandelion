import React, { useState, useEffect, useRef } from 'react';
import { Alert, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

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
  justify-content: space-between;
  align-items: flex-start;
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
const ImageList = styled.View`
  display: flex;
  height: 90px;
  width: ${Dimensions.get('window').width - 20}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #fff;
  background-color: #fefefe;
  elevation: 1;
`;
const ImageElement = styled.Image`
  width: 80px;
  height: 80px;
  margin: 5px;
`;
const MakePost = ({ navigation, route }) => {
  const {
    mindleId,
    latitude,
    longitude,
    modifyMode = false,
    setRefresh = () => {},
    postContent = { postId: '', title: '', bodyText: '', images: [] },
  } = route.params;
  const titleRef = useRef();
  const bodyTextRef = useRef();
  const submitRef = useRef();
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [images, setImages] = useState([]);
  const [sendImages, setSendImages] = useState([]);
  const jwtToken = useRecoilValue(userState.uidState);
  const name = useRecoilValue(userState.nameState);
  useEffect(() => {
    axios.defaults.baseURL = 'http://3.35.45.177:3000/';
    axios.defaults.headers.common['x-access-token'] = jwtToken;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    if (modifyMode) {
      setTitle(postContent.title);
      setBodyText(postContent.bodyText);
      setImages(postContent.images);
    }
  }, []);

  const modifyPost = async () => {
    const data = {
      title: title,
      text: bodyText,
      images: images,
    };

    await axios
      .patch(`/${mindleId}/post/update/${postContent.postId}`, data)
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log('게시글 작성');
          return res.data.data;
        } else {
          Alert.alert('게시글 수정', '오류가 발생했습니다.', [
            {
              text: '확인',
              onPress: () => {
                setRefresh(true);
                navigation.goBack();
              },
            },
          ]);
        }
      })
      .then((data) => {
        console.log(data._id);
        if (data) {
          let formData = new FormData();
          formData.append('images', images);
          formData.append('postId', data._id);

          axios
            .post(`/dandelion/images/post`, { headers: { 'Content-Type': 'multipart/form-data' }, formData })
            .then((res) => {
              if (res.data.status === 'SUCCESS') {
                console.log(res);
                const userId = data._user;
                data._user = { _id: userId, name: name };
                data.images = res.data.data;
                console.log(data);
                Alert.alert('게시글 수정', '게시글 수정이 완료되었습니다.', [
                  {
                    text: '확인',
                    onPress: () => {
                      setRefresh(true);
                      navigation.goBack();
                    },
                  },
                ]);
                // setRefresh(true);
                // route.params.onGoBack(data);
                // navigation.goBack();
              } else {
                console.log('이미지 업로드 실패');
              }
            })
            .catch((err) => {
              console.log(err);
              console.log('이미지 에러');
            });
        } else {
          console.log('게시글 작성 실패');
          Alert.alert('에러', '게시글 작성에 실패하였습니다.\n잠시 후 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.log(err.message);
        console.log('게시글 오류');
      });
  };

  const setPost = async () => {
    const data = {
      title: title,
      text: bodyText,
      location: {
        longitude: longitude,
        latitude: latitude,
      },
      // images: images,
    };
    console.log(data);
    console.log('setPost');
    await axios
      .post(`/${mindleId}/post/create`, data)
      .then((res) => {
        /**{
        "status": "SUCCESS",
        "message": "게시글을 작성하였습니다.",
        data:{ ... },
        } 
      */
        console.log('send');
        if (res.data.status === 'SUCCESS') {
          console.log('게시글 작성');
          return res.data.data;
        } else {
          console.log('Failed to post');
          return null;
        }
      })
      .then(async (data) => {
        console.log(data._id);
        data.comments = 0;
        data.likes = 0;
        if (data && sendImages.length > 0) {
          console.log(sendImages);
          let formData = new FormData();
          sendImages.forEach((item) => formData.append('images', item));

          formData.append('postId', data._id);

          await axios
            .post(`/dandelion/images/post`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
              if (res.data.status === 'SUCCESS') {
                console.log(res.data.data.map((item) => item.fileUrl));
                const userId = data._user;
                data._user = { _id: userId, name: name };
                data.images = [
                  ...res.data.data.map((item) => {
                    return { uri: item.fileUrl };
                  }),
                ];
                console.log(data);
                setRefresh(true);
                route.params.onGoBack(data);
                navigation.goBack();
              } else {
                console.log('이미지 업로드 실패');
              }
            })
            .catch((err) => {
              console.log('이미지 작성 에러');
              console.log(err);
            });
        } else {
          console.log('이미지 없음');
          setRefresh(true);
          route.params.onGoBack(data);
          navigation.goBack();
          // console.log('게시글 작성 실패');
          // Alert.alert('에러', '게시글 작성에 실패하였습니다.\n잠시 후 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.log('게시글 작성 에러');
        console.log(err.message);
      });
  };

  const pickImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('이미지 불러오기 취소');
      } else if (response.assets && !images.find((item) => item === response.uri)) {
        console.log('이미지 로드');
        //console.log(response.assets[0]);
        setImages((prev) => [...prev, ...response.assets]);
        const newImages = response.assets.map((item) => {
          const newImage = {
            uri: item.uri,
            type: 'multipart/form-data',
            name: response.assets.toString(),
          };
          return newImage;
        });

        setSendImages((prev) => [...prev, ...newImages]);
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
        <ImageList>
          {images.map((item) => (
            <ImageElement source={{ uri: item.uri }} />
          ))}
        </ImageList>
      </Body>
      <Footer>
        <SelectPhotoButton
          onPress={() => {
            pickImage();
          }}
        >
          <Text>사진 불러오기</Text>
        </SelectPhotoButton>
        {/* TODO : Replace to navigation header button */}
        <PostButton>
          <Text
            ref={submitRef}
            onPress={() => {
              if (modifyMode) {
                modifyPost();
              } else {
                setPost();
              }
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
