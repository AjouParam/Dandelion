import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
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

const Tab = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  padding: 5px;
  justify-content: space-evenly;
`;

const MindlePreview = ({ key, name, overlap }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setData({
      userPhoto:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
      name: '살찐 황소',
      date: '2021-09-19',
      title: '이거 되냐?',
      text: '살찐 황소님이 작성한 글이에요~ 이건 예시 글이랍니다. 어떻게 나올지 궁금하네요~',
      images: ['', ''],
      likes: 11,
      comments: 9,
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
                name={data.name}
                date={data.date}
                title={data.title}
                text={data.text}
                images={data.images}
                likes={data.likes}
                comments={data.comments}
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
