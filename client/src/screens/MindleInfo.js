import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ProfileModal from '@components/Modal';
import BoardContent from '@components/MindlePostContent';

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

const MindleInfo = ({ mindleKey, name, position, overlap, navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [DATA, setDATA] = useState([
    {
      userPhoto:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
      userName: '부끄러운 개',
      date: '2021-09-21',
      content: '부끄러운 개님이 작성한 글이에요~ 이건 예시 글이랍니다. 어떻게 나올지 궁금하네요~',
      photoContents: ['', ''],
      likes: 20,
      commentsNum: 17,
    },
    {
      userPhoto:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
      userName: '즐거운 세숑',
      date: '2021-09-21',
      content: '즐거운 세숑님이 작성한 글이에요~ 이건 예시 글이랍니다. 어떻게 나올지 궁금하네요~',
      photoContents: ['', ''],
      likes: 14,
      commentsNum: 11,
    },
    {
      userPhoto:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
      userName: '미친 고릴라',
      date: '2021-09-20',
      content: '미친 고릴라님이 작성한 글이에요~ 이건 예시 글이랍니다. 어떻게 나올지 궁금하네요~',
      photoContents: ['', ''],
      likes: 17,
      commentsNum: 12,
    },

    {
      userPhoto:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
      userName: '성난 닭',
      date: '2021-09-19',
      content: '성난 닭님이 작성한 글이에요~ 이건 예시 글이랍니다. 어떻게 나올지 궁금하네요~',
      photoContents: ['', ''],
      likes: 8,
      commentsNum: 6,
    },
    {
      userPhoto:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
      userName: '살찐 황소',
      date: '2021-09-19',
      content: '살찐 황소님이 작성한 글이에요~ 이건 예시 글이랍니다. 어떻게 나올지 궁금하네요~',
      photoContents: ['', ''],
      likes: 11,
      commentsNum: 9,
    },
    {
      userPhoto:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
      userName: '신난 어피치',
      date: '2021-09-18',
      content: '신난 어피치님이 작성한 글이에요~ 이건 예시 글이랍니다. 어떻게 나올지 궁금하네요~',
      photoContents: ['', ''],
      likes: 2,
      commentsNum: 1,
    },

    {
      userPhoto:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
      userName: '상큼한 무지',
      date: '2021-09-18',
      content: '상큼한 무지님이 작성한 글이에요~ 이건 예시 글이랍니다. 어떻게 나올지 궁금하네요~',
      photoContents: ['', ''],
      likes: 6,
      commentsNum: 4,
    },
    {
      userPhoto:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
      userName: '화난 라이언',
      date: '2021-09-17',
      content: '화난 라이언님이 작성한 글이에요~ 이건 예시 글이랍니다. 어떻게 나올지 궁금하네요~',
      photoContents: ['', ''],
      likes: 51,
      commentsNum: 71,
    },
  ]);

  useEffect(() => {
    console.log(overlap);
    setLoading(true);
    setData(DATA.splice(0, 3));
    setPage((prev) => prev + 1);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      setData(null);
    };
  }, [mindleKey]);

  useEffect(() => {
    //TODO : data 불러왔는지 확인 후 안불러왔으면 로딩, 데이터 불러오기
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [tabIndex]);

  const renderItem = useCallback(
    ({ item }) => (
      <>
        <BoardContent
          userPhoto={item.userPhoto}
          userName={item.userName}
          date={item.date}
          content={item.content}
          photoContents={item.photoContents}
          likes={item.likes}
          commentsNum={item.commentsNum}
          setMenuOpen={setMenuOpen}
          navigation={navigation}
        />
      </>
    ),
    [],
  );

  const getData = (callback) => {
    //TODO : get contents API
    try {
      const newData = DATA.spice(0, 3);
      setData((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
      callback(newData);
    } catch (e) {
      const newData = DATA.splice(0, DATA.length);
      setData((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
      callback(newData);
    }
  };

  const handleLoadMore = () => {
    console.log('load more!');
    setLoading(true);
    getData((newData) => {
      if (newData) setLoading(false);
    });
  };

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
        {!loading && overlap && (
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
              onEndReachedThreshold={0.2}
              ListHeaderComponent={() => (
                <>
                  {tabIndex === 0 && (
                    <ImageContainer>
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
            <TouchableOpacity
              style={{
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
                navigation.navigate('MakePost', { position: position });
              }}
            >
              <Text style={{ alignSelf: 'center', fontSize: 30 }}>+</Text>
            </TouchableOpacity>
          </>
        )}
        {loading && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
