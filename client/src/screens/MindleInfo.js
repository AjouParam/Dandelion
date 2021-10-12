import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ProfileModal from '@components/Modal';
import BoardContent from '@components/MindlePostContent';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';

const Container = styled.SafeAreaView`
  flex: 1;
  display: flex;
  padding: 15px 15px;
  height: 100%;
  background-color: #ffffff;
  justify-content: flex-start;
`;

const Divider = styled.View`
  margin-top: 10px;
  height: 1px;
  border: 0.3px solid #000000;
`;
const ImageContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  margin-top: 20px;
`;

const Image = styled.View`
  border: 1px solid;
  height: 80px;
  width: 80px;
  margin: 5px;
`;

const Tab = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  padding: 5px;
  justify-content: space-evenly;
`;

const MindleInfo = ({ mindleKey, name, position, overlap, navigation, route }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);
  const jwtToken = useRecoilValue(userState.uidState);
  const [noData, setNoData] = useState(false);
  const CONTENT_NUM = 5;

  useEffect(() => {
    axios.defaults.baseURL = 'http://10.0.2.2:3000/';
    axios.defaults.headers.common['x-access-token'] = jwtToken;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    setLoading(true);
    setListLoading(true);
    fetchData(mindleKey);

    return () => {
      setData(null);
    };
  }, [mindleKey]);

  useEffect(() => {
    if (page === 1 && data.length > 0) {
      setNoData(false);
      setLoading(false);
      setListLoading(false);
      setPage((prev) => prev + 1);
    }
    if (page > 1) {
      setListLoading(false);
      setPage((prev) => prev + 1);
    }
  }, [data]);

  const fetchData = async (mindleId) => {
    const dataList = await axios
      .get(`/${mindleId}/post/`, {
        params: {
          page: page,
          maxPost: CONTENT_NUM,
        },
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log(res.data.message);
          return res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (res.data.status === 'FAILED') {
          console.log(res.data.message);
          return 'FAILED';
        }
      })
      .catch((err) => console.log(err));

    if (dataList !== 'FAILED') {
      if (dataList.length === 0 && page === 0) setNoData(true);
      // setDataList(dataList);

      setData((prev) => [...prev, ...dataList]);
    }
  };

  /**
   * {
          "status": "SUCCESS",
          "message": "민들레에 해당하는 게시글입니다.",
          "data": [
              {
                  "_id": "615ac06b37a3bd4cc0c2f91c",
                  "location": {
                      "longitude": 127.04275784194242,
                      "latitude": 37.28335975273373
                  },
                  "createdAt": "2021-10-04T08:50:51.405Z",
                  "updatedAt": "2021-10-04T09:29:20.810Z",
                  "_dandelion": "614c4ae99aa99a08e0d57c30",
                  "_user": {
                      "_id": "61365d8cd4e22a2dd4df2a6f",
                      "name": "testUser0907",
                      "thumbnail":(유저 프사 s3 링크)
                  },
                  "title": "test2 게시글 수정",
                  "text": "blahblah",
                  "images": [
                      "one",
                      "two"
                  ],
                  "likes": 0,
                  "comments": 0
              }
          ]
      } 
   */

  const renderItem = useCallback(({ item }) => {
    if (data)
      return (
        <>
          <BoardContent
            userPhoto={null}
            name={item._user.name}
            date={item.createdAt}
            title={item.title}
            text={item.text}
            images={item.images}
            likes={item.likes}
            comments={item.comments}
            setMenuOpen={setMenuOpen}
            navigation={navigation}
            isPost={true}
          />
        </>
      );
  });

  const handleLoadMore = () => {
    console.log('load more');
    setListLoading(true);
    fetchData(mindleKey);
  };

  if (loading)
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="0000ff" />
        </View>
      </Container>
    );
  if (mindleKey && !loading)
    return (
      <>
        <Container>
          {/* <Header /> */}

          <Tab>
            <TouchableOpacity
              onPress={() => {
                setTabIndex(0);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                backgroundColor: tabIndex === 0 ? '#bdbdbd' : '#fefefe',
              }}
            >
              <Text>게시글</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTabIndex(1);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                backgroundColor: tabIndex === 0 ? '#fefefe' : '#bdbdbd',
              }}
            >
              <Text>이벤트</Text>
            </TouchableOpacity>
          </Tab>

          <Divider />
          {overlap && (
            <TouchableOpacity
              style={{
                zIndex: 1,
                width: 60,
                height: 60,
                position: 'absolute',
                top: '90%',
                right: '5%',
                alignSelf: 'flex-end',
                borderWidth: 1,
                borderRadius: 50,
                justifyContent: 'center',
                backgroundColor: '#dbdbdb',
              }}
              onPress={() => {
                navigation.navigate('MakePost', {
                  mindleId: mindleKey,
                  latitude: position.latitude,
                  longitude: position.longitude,
                  onGoBack: (newPost) => {
                    setListLoading(true);
                    setData((prev) => [newPost, ...prev]);
                  },
                });
              }}
            >
              <Text style={{ alignSelf: 'center', fontSize: 30 }}>+</Text>
            </TouchableOpacity>
          )}
          {overlap && !noData && (
            <>
              <FlatList
                data={tabIndex === 0 ? data : [0]}
                renderItem={
                  tabIndex === 0
                    ? renderItem
                    : () => (
                        <View>
                          <Text>이벤트 목록</Text>
                        </View>
                      )
                }
                keyExtractor={(item, idx) => String(idx)}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListHeaderComponent={() => (
                  <>
                    {tabIndex === 0 && (
                      <ImageContainer>
                        {/* TODO : 데이터리스트에서 랜덤 이미지 7개 가져오기 */}
                        <Image></Image>
                        <Image></Image>
                        <Image></Image>
                        <Image></Image>
                        <Image></Image>
                        <Image></Image>
                        <Image></Image>
                        <Image></Image>
                      </ImageContainer>
                    )}
                  </>
                )}
              />
            </>
          )}
          {overlap && noData && (
            <View style={{ alignItems: 'center' }}>
              <Text>게시글이 없습니다.</Text>
            </View>
          )}

          {listLoading && (
            <View style={{ justifySelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="0000ff" />
            </View>
          )}

          <ProfileModal width="180px" height="100px" modalVisible={menuOpen} setModalVisible={setMenuOpen}>
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'space-evenly',
                padding: 5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
                  onPress={() => {
                    Alert.alert('쪽지 보내기', '쪽지 보내기 화면으로 이동');
                  }}
                >
                  <Text style={{ fontSize: 16 }}>쪽지 보내기</Text>
                </TouchableOpacity>
              </View>
              <Divider />
              <View
                style={{
                  flex: 1,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  width: '100%',
                  marginTop: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setMenuOpen(false);
                  }}
                  style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
                >
                  <Text style={{ fontSize: 16, color: 'red' }}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ProfileModal>
        </Container>
      </>
    );
};
export default MindleInfo;
