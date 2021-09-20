import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const Container = styled.View`
  flex: 1;
  display: flex;
  padding: 15px 15px;
  height: 100%;
  background-color: #ffffff;
  justify-content: center;
`;

const Divider = styled.View`
  margin-top: 10px;
  height: 1px;
  border: 0.5px solid #000000;
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

const BoardContainer = styled.View`
  flex: 1;
  height: 220px;
  padding: 10px 10px;
`;
const BoardUserInfo = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const BoardUserImageContainer = styled.View`
  width: 50px;
  height: 50px;
  padding: 5px 5px;
  align-items: center;
  justify-content: center;
`;
const BoardUserImage = styled.Image`
  width: 40px;
  height: 40px;
`;
const BoardUserName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 3px;
`;
const BoardContents = styled.View`
  flex: 1;
  padding-top: 10px;
  padding-left: 55px;
`;
const BoardContentTextContainer = styled.View`
  height: 50px;
  justify-content: flex-start;
`;
const BoardContentImageContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const BoardContentImage = styled.View`
  border: 1px solid black;
  width: 70px;
  height: 55px;
  margin-right: 10px;
`;
const BoardTipContainer = styled.View`
  height: 30px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Tab = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  padding: 5px;
  justify-content: space-evenly;
`;
const BoardContent = ({ userPhoto, userName, date, content, photoContents, likes, commentsNum }) => {
  return (
    <>
      <BoardContainer>
        <BoardUserInfo>
          <BoardUserImageContainer>
            <BoardUserImage source={{ uri: userPhoto }} />
          </BoardUserImageContainer>
          <View style={{ flex: 1, padding: 5 }}>
            <BoardUserName>{userName}</BoardUserName>
            <Text>{date}</Text>
          </View>
        </BoardUserInfo>
        <BoardContents>
          <BoardContentTextContainer>
            <Text>{content}</Text>
          </BoardContentTextContainer>
          <BoardContentImageContainer>
            <BoardContentImage />
            <BoardContentImage />
            <BoardContentImage />
          </BoardContentImageContainer>
          <BoardTipContainer>
            <Text>Like {likes}</Text>
            <Text>Cormments {commentsNum}</Text>
          </BoardTipContainer>
        </BoardContents>
      </BoardContainer>
    </>
  );
};
const MindleInfo = (props) => {
  const [page, setPage] = useState(0);
  const [mindleInfo, setMindleInfo] = useState({ name: '', madeby: '', hashtag: [], visitCount: '', current: '' });
  let DATA = [
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
  ];

  const [tabIndex, setTabIndex] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inMindle, setInMindle] = useState();

  useEffect(() => {
    setLoading(true);
    setInMindle(true);
    setMindleInfo(props.mindleInfo);
    setTabIndex(0);
    setData(DATA);
    setTimeout(() => {
      if (mindleInfo) console.log(mindleInfo);
      setLoading(false);
    }, 2000);
    //setLoading(true);
    //getData();
  }, []);

  useEffect(() => {
    //TODO : data 불러왔는지 확인 후 안불러왔으면 로딩, 데이터 불러오기
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [tabIndex]);
  const renderItem = ({ item }) => {
    return (
      <>
        <BoardContent
          userPhoto={item.userPhoto}
          userName={item.userName}
          date={item.date}
          content={item.content}
          photoContents={item.photoContents}
          likes={item.likes}
          commentsNum={item.commentsNum}
        />
      </>
    );
  };

  const getData = () => {
    //TODO : get contents API
    if (page < DATA.length) {
      console.log('get data');
      let newData = DATA[page];
      setData((prev) => [...prev, ...newData]);
      setPage(page + 1);
    } else {
      console.log('No more data');
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    console.log('load more!');
    setLoading(true);
    getData();
  };

  return (
    <>
      <Container>
        {/* <Header /> */}
        {!loading && (
          <FlatList
            style={{ zIndex: 1 }}
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
            //onEndReached={handleLoadMore}
            //onEndReachedThreshold={0.4}
            ListHeaderComponent={() => (
              <>
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
                <Divider />
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
              </>
            )}
          />
        )}
        {loading && <ActivityIndicator size="large" color="0000ff" />}
      </Container>
    </>
  );
};
export default MindleInfo;
