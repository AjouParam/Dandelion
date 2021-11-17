import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { Dimensions, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import BoardContent from '@components/MindlePostContent';
import axios from 'axios';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import userState from '@contexts/userState';
import commentState from '@contexts/commentState';

const AddPostImage = require('../../assets/post/post_add.png');
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
const Container = styled.View`
  flex: 1;
  display: flex;
  padding: 15px 15px 0px 15px;
  height: ${DEVICE_HEIGHT}px;
  background-color: #ffffff;
  justify-content: flex-start;
`;

const Divider = styled.View`
  margin-top: 10px;
  height: 1px;
  border: 0.3px solid #000000;
`;
const ImageContainer = styled.View`
  flex-direction: row;
  flex-flow: row wrap;
  margin: 10px 10px;
  width: ${DEVICE_WIDTH}px;
`;

const RecentImage = styled.Image`
  height: ${DEVICE_WIDTH / 3.8}px;
  width: ${DEVICE_WIDTH / 3.8}px;
  border-radius: 10px;
  margin: 5px;
`;

const AddPostIcon = styled.Image`
  height: 50px;
  width: 50px;
`;
const Tab = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  padding: 0px 5px;
  justify-content: space-evenly;
`;

const MindleInfo = ({ navigation, props }) => {
  const [type, setType] = useState('Post');
  const { mindleKey, name, position, overlap, route, recentImages } = props;

  const [page, setPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);
  const jwtToken = useRecoilValue(userState.uidState);
  const [noData, setNoData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshEvent, setRefreshEvent] = useState(false);
  const [commentsState, setCommentsState] = useRecoilState(commentState);
  const CONTENT_NUM = 8;

  useEffect(() => {
    axios.defaults.baseURL = 'http://3.35.45.177:3000/';
    axios.defaults.headers.common['x-access-token'] = jwtToken;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    setLoading(true);
    setListLoading(true);
    fetchData(mindleKey, page);
    console.log('recentImages', recentImages);
    return () => {
      setData(null);
    };
  }, [mindleKey]);

  useEffect(() => {
    if (page === 1 && data.length >= 0) {
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

  useEffect(() => {
    if (eventPage === 1 && eventData.length >= 0) {
      setNoData(false);
      setLoading(false);
    }
    setListLoading(false);
    setPage((prev) => prev + 1);
  }, [eventData]);

  useEffect(() => {
    if (refresh) {
      setLoading(true);
      if (type === 'Post') {
        setData([]);
        setPage(1);
        fetchData(mindleKey, 1);
      } else {
        setEventData([]);
        setEventPage(1);
        fetchEvent(mindleKey, 1);
      }
    }
  }, [refresh]);

  useEffect(() => {
    if (commentsState) {
      setRefresh(true);
      setCommentsState(false);
    }
  }, [commentsState]);

  useEffect(() => {
    if (tabIndex == 1) {
      if (eventData.length === 0) {
        console.log('changed  to event tabIndex');
        fetchEvent(mindleKey, page);
      } else {
        setListLoading(false);
      }
    } else {
      if (data.length === 0) {
        fetchData(mindleKey, page);
      } else {
        setListLoading(false);
        setNoData(false);
      }
    }
  }, [tabIndex]);

  const fetchData = async (mindleId, page) => {
    try {
      const dataList = await axios
        .get(`/${mindleId}/post/`, {
          params: {
            page: page,
            maxPost: CONTENT_NUM,
          },
        })
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            //console.log(res.data.data);
            //console.log(res.data.message);
            return res.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          } else if (res.data.status === 'FAILED') {
            //console.log(res.data.message);
            return 'FAILED';
          }
        })
        .catch((err) => console.log(err));
      if (dataList !== 'FAILED') {
        if (dataList.length === 0 && page === 1) setNoData(true);
        // setDataList(dataList);

        setData((prev) =>
          [...prev, ...dataList].filter((item, idx, self) => self.findIndex((e) => e._id === item._id) === idx),
        );
      }
      setRefresh(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = useCallback(({ item }) => {
    if (data && !item.isEvent)
      return (
        <>
          <BoardContent
            mindleId={mindleKey}
            postId={item._id}
            userPhoto={item.thumbnail} //TODO : thumbnail
            name={item._user.name}
            date={item.createdAt}
            updatedAt={item.updatedAt}
            title={item.title}
            text={item.text}
            images={item.images}
            likes={item.likes}
            comments={item.comments}
            userLike={item.userLike}
            setLikesList={(like, likeNum, postId) => {
              setData((prev) => {
                const newData = prev.map((item) => {
                  if (postId === item._id) {
                    console.log('find!');
                    console.log(like, likeNum);
                    const obj = {
                      ...item,
                      likes: like ? likeNum + 1 : likeNum - 1,
                      userLike: like,
                    };
                    console.log(obj);
                    return obj;
                  } else {
                    return item;
                  }
                });
                console.log(newData[0]);
                return newData;
              });
            }}
            onDeletePost={(deletedId) => {
              const toDeleteIdx = data.findIndex((item) => item._id === deletedId);
              if (toDeleteIdx > -1) {
                const newData = Array.from(data);
                newData.splice(toDeleteIdx, 1);
                setData(newData);
              }
            }}
            navigation={navigation}
            isInMindle={true}
            setRefresh={setRefresh}
          />
        </>
      );
  }, []);

  const handleLoadMore = () => {
    console.log('load more');
    setListLoading(true);
    if (type === 'Post') fetchData(mindleKey, page);
    else fetchEvent(mindleKey, eventPage);
  };

  const fetchEvent = async (mindleId, page) => {
    try {
      const dataList = await axios
        .get(`${mindleId}/event`, {
          params: {
            page: eventPage,
            maxPost: CONTENT_NUM,
          },
        })
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            console.log(res.data);
            return res.data.data;
          } else {
            console.log(res.data.message);
            return 'FAILED';
          }
        })
        .catch((err) => console.log(err.message));
      console.log(dataList);
      if (dataList !== 'FAILED') {
        if (dataList.length === 0 && page === 1) setNoData(true);
        // setDataList(dataList);

        setEventData((prev) =>
          [...prev, ...dataList].filter((item, idx, self) => self.findIndex((e) => e._id === item._id) === idx),
        );
      }
      setRefresh(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderEventItem = useCallback(({ item }) => {
    if (eventData)
      return (
        <>
          <BoardContent
            mindleId={mindleKey}
            postId={item._id}
            userPhoto={item.thumbnail} //TODO : thumbnail
            name={item._user.name}
            date={item.createdAt}
            updatedAt={item.updatedAt}
            title={item.title}
            text={item.text}
            images={item.images}
            likes={item.likes}
            comments={item.comments}
            isEvent={true}
            rewards={item.rewards}
            startDate={item.startDate}
            firstComeNum={item.firstComeNum}
            userLike={item.userLike}
            setLikesList={(like, likeNum, postId) => {
              setEventData((prev) => {
                const newData = prev.map((item) => {
                  if (postId === item._id) {
                    //console.log('find!');
                    console.log('like', like, likeNum);
                    const obj = {
                      ...item,
                      likes: like ? likeNum + 1 : likeNum - 1,
                      userLike: like,
                    };
                    //console.log(obj);
                    return obj;
                  } else {
                    return item;
                  }
                });
                //console.log(newData[0]);
                return newData;
              });
            }}
            onDeletePost={(deletedId) => {
              const toDeleteIdx = eventData.findIndex((item) => item._id === deletedId);
              if (toDeleteIdx > -1) {
                const newData = Array.from(eventData);
                newData.splice(toDeleteIdx, 1);
                setData(newData);
              }
            }}
            navigation={navigation}
            isInMindle={true}
            setRefresh={setRefresh}
          />
        </>
      );
  }, []);

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
      <Container>
        {/* <Header /> */}

        <Tab>
          <TouchableOpacity
            onPress={() => {
              setType('Post');
              setTabIndex(0);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              backgroundColor: '#fff',
              borderBottomWidth: 2,
              borderBottomColor: tabIndex === 0 ? '#EFB233' : '#CCCCCC',
            }}
          >
            <Text
              style={{
                color: tabIndex === 0 ? '#EFB233' : '#CCCCCC',
              }}
            >
              게시글
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType('Event');
              setTabIndex(1);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              backgroundColor: '#fff',
              borderBottomWidth: 2,
              borderBottomColor: tabIndex === 1 ? '#EFB233' : '#CCCCCC',
            }}
          >
            <Text
              style={{
                color: tabIndex === 1 ? '#EFB233' : '#CCCCCC',
              }}
            >
              이벤트
            </Text>
          </TouchableOpacity>
        </Tab>

        {overlap && (
          <TouchableOpacity
            style={{
              zIndex: 1,
              width: 65,
              height: 65,
              position: 'absolute',
              top: '90%',
              right: '5%',
              alignSelf: 'flex-end',
              borderWidth: 1,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#421C0B',
            }}
            onPress={() => {
              navigation.navigate('MakePost', {
                mindleId: mindleKey,
                latitude: position.latitude,
                longitude: position.longitude,
                type: type,
                onGoBack: (newPost) => {
                  console.log(newPost);
                  setListLoading(true);
                  if (type === 'Post') setData((prev) => [newPost, ...prev]);
                  else setEventData((prev) => [newPost, ...prev]);
                },
              });
            }}
          >
            <AddPostIcon source={AddPostImage} />
          </TouchableOpacity>
        )}
        {overlap && !noData && (
          <FlatList
            data={tabIndex === 0 ? data : eventData}
            renderItem={tabIndex === 0 ? renderItem : renderEventItem}
            keyExtractor={(item, idx) => String(item._id)}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.4}
            ListHeaderComponent={() =>
              tabIndex === 0 &&
              recentImages.length > 0 && (
                <ImageContainer>
                  {recentImages.map((item, idx) => {
                    return <RecentImage key={idx.toString()} source={{ uri: item }} />;
                  })}
                </ImageContainer>
              )
            }
          />
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
      </Container>
    );
};
export default MindleInfo;
