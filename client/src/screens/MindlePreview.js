import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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

const MindlePreview = ({ navigation, props, mindleKey }) => {
  const { name, overlap } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const jwtToken = useRecoilValue(userState.uidState);

  useEffect(() => {
    axios.defaults.baseURL = 'http://10.0.2.2:3000/';
    axios.defaults.headers.common['x-access-token'] = jwtToken;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    setLoading(true);

    const fetchData = async (mindleId) => {
      const dataList = await axios
        .get(`/${mindleId}/post/`, { params: { page: 1, maxPost: 1 } })
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            console.log('게시글 불러오기 성공');

            return res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          } else if (res.data.status === 'FAILED') {
            console.log('게시글 불러오기 실패');
            return 'FAILED';
          }
        })
        .catch((err) => console.log(err));

      if (dataList !== 'FAILED') {
        setData(dataList[0]);
        if (dataList.length === 0) setLoading(false);
      }
    };

    fetchData(mindleKey);

    return () => {
      setData(null);
    };
  }, [mindleKey]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <Container>
        {/* <Header /> */}
        {data && (
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
        {!loading && !data && (
          <>
            <View style={{}}>
              <Text>게시글이 없습니다.</Text>
            </View>
          </>
        )}
        {!loading && data && (
          <>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <ScrollView>
                <BoardContent
                  userPhoto={data.userPhoto}
                  name={data._user.name}
                  date={data.createdAt}
                  title={data.title}
                  text={data.text}
                  images={data.images}
                  likes={data.likes}
                  comments={data.comments}
                />
                <View style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Locked</Text>
                </View>
              </ScrollView>
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
