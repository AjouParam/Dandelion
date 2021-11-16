import React, { useState, useEffect, useRef } from 'react';
import { Alert, Dimensions, View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';
import DatePicker from 'react-native-date-picker';
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
const EventSettings = styled.View`
  width: 100%;
  min-height: 30%;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fbfbfb;
`;
const EventDescription = styled.Text`
  flex-shrink: 1;
  font-size: 14px;
  color: #434343;
  margin: 5px 0px;
`;
const EventDateSelect = styled.TouchableOpacity`
  background-color: #f3d737;
  width: 120px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;
const EventFirstComeInput = styled.TextInput`
  padding: 0px 10px;
  margin-left: 5px;
  background-color: #ffffff;
  border-radius: 10px;
`;
const EventRewardsInput = styled.TextInput`
  padding: 0px 10px;
  margin-left: 5px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const FlexRowAlignCenterView = styled.View`
  flex-direction: row;
  padding: 0px 5px;
  align-items: center;
`;
const Body = styled.View`
  flex: 1;
  padding: 15px 5px;
  border-bottom-width: 1px;
  justify-content: space-between;
  align-items: flex-start;
`;
const BodyInput = styled.TextInput`
  flex-shrink: 1;
`;
const Footer = styled.View`
  padding: 0px 10px;
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
    type,
    modifyMode = false,
    setRefresh = () => {},
    postContent = { postId: '', title: '', bodyText: '', images: [] },
  } = route.params;
  const titleRef = useRef();
  const bodyTextRef = useRef();
  const submitRef = useRef();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [bodyText, setBodyText] = useState('');
  const [images, setImages] = useState([]);
  const [sendImages, setSendImages] = useState([]);
  const [firstComeNum, setFirstComeNum] = useState(0);
  const [rewards, setRewards] = useState(0);
  const jwtToken = useRecoilValue(userState.uidState);
  const name = useRecoilValue(userState.nameState);

  useEffect(() => {
    axios.defaults.baseURL = 'http://3.35.45.177:3000/';
    axios.defaults.headers.common['x-access-token'] = jwtToken;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    console.log(type);
    navigation.setOptions({ title: type === 'Post' ? '게시글 작성' : '이벤트 생성' });
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
                console.log(res.data.data.map((item) => item));
                const userId = data._user;
                data._user = { _id: userId, name: name };
                data.images = [
                  ...res.data.data.map((item) => {
                    return item.fileUrl;
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
  const modifyEvent = async () => {
    const data = {
      title: title,
      text: bodyText,
      location: {
        longitude: longitude,
        latitude: latitude,
      },
      rewards: rewards,
      firstComeNum: firstComeNum,
      startDate: date.toISOString().slice(0, 10),
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

  const setEvent = async () => {
    const data = {
      title: title,
      text: bodyText,
      location: {
        longitude: longitude,
        latitude: latitude,
      },
      rewards: rewards,
      firstComeNum: firstComeNum,
      startDate: date.toISOString().slice(0, 10),
    };
    console.log(data);
    await axios
      .post(`/${mindleId}/event/create`, data)
      .then((res) => {
        /**{
          "status": "SUCCESS",
          "message": "게시글을 작성하였습니다.",
          data:{ ... },
          } 
        */
        console.log('send');
        if (res.data.status === 'SUCCESS') {
          console.log('이벤트');
          return res.data.data;
        } else {
          console.log(res.data);
          Alert.alert('이벤트 생성 실패', '이벤트 생성에 실패하였습니다. 잠시 후 다시 시도해주세요.');
          return null;
        }
      })
      .then(async (data) => {
        if (data && sendImages.length > 0) {
          console.log(data._id);
          data.comments = 0;
          data.likes = 0;
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
                console.log(res.data.data.map((item) => item));
                const userId = data._user;
                data._user = { _id: userId, name: name };
                data.images = [
                  ...res.data.data.map((item) => {
                    return item.fileUrl;
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
        }
      })
      .catch((err) => {
        console.log('이벤트 생성 에러');
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
      {type === 'Event' && (
        <EventSettings>
          <EventDescription>
            • 이벤트를 숨길 장소에서 글을 등록해주세요. 사용자들이 ar을 통해 해당 장소에 접근합니다.
          </EventDescription>
          <EventDescription>• 쿠폰은 사진을 통해 등록해주세요. 해당 사진들이 당첨자들에게 전송됩니다.</EventDescription>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <EventDateSelect
              onPress={() => {
                console.log('클릭');
                setOpen(true);
              }}
            >
              <Text style={{ color: '#fbfbfb' }}>이벤트 시작 날짜</Text>
            </EventDateSelect>
            <Text style={{ fontSize: 16, color: '#343434' }}>
              날짜 : {date.toISOString().slice(0, 10)} / 시간 : {date.toISOString().slice(11, 16)}
            </Text>
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>

          <FlexRowAlignCenterView styles={{ justifyContent: 'center', width: Dimensions.get('screen').width }}>
            <FlexRowAlignCenterView>
              <EventDescription>선착순</EventDescription>
              <EventFirstComeInput
                placeholder={'몇명'}
                value={firstComeNum}
                onChangeText={(text) => {
                  setFirstComeNum(text);
                }}
              ></EventFirstComeInput>
            </FlexRowAlignCenterView>
            <FlexRowAlignCenterView>
              <EventDescription>리워드</EventDescription>
              <EventRewardsInput
                placeholder={'몇개'}
                value={rewards}
                onChangeText={(text) => {
                  setRewards(text);
                }}
              ></EventRewardsInput>
            </FlexRowAlignCenterView>
          </FlexRowAlignCenterView>
        </EventSettings>
      )}
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
              if (type === 'Event') {
                if (modifyMode) {
                  modifyEvent();
                } else {
                  setEvent();
                }
              } else {
                if (modifyMode) {
                  modifyPost();
                } else {
                  setPost();
                }
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
