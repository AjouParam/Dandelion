import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

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
  height: 0.5px;
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
  height: 220px;

  width: 100%;
  padding: 10px 10px;
  border-bottom-width: 1px;
  border-bottom-color: black;
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
            <TouchableOpacity>
              <Text>Like {likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Comments {commentsNum}</Text>
            </TouchableOpacity>
          </BoardTipContainer>
        </BoardContents>
      </BoardContainer>
    </>
  );
};

const MindlePreview = ({ key, name, overlap }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setData({
      userPhoto:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
      userName: '살찐 황소',
      date: '2021-09-19',
      content: '살찐 황소님이 작성한 글이에요~ 이건 예시 글이랍니다. 어떻게 나올지 궁금하네요~',
      photoContents: ['', ''],
      likes: 11,
      commentsNum: 9,
    });
    return () => {
      setData(null);
    };
  }, [key]);

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  return (
    <>
      <Container>
        {/* <Header /> */}
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
            disabled={true}
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
        {!loading && (
          <>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <BoardContent
                userPhoto={data.userPhoto}
                userName={data.userName}
                date={data.date}
                content={data.content}
                photoContents={data.photoContents}
                likes={data.likes}
                commentsNum={data.commentsNum}
              />
              <View style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Locked</Text>
              </View>
            </View>
          </>
        )}
        {loading && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="0000ff" />
          </View>
        )}
      </Container>
    </>
  );
};
export default MindlePreview;
