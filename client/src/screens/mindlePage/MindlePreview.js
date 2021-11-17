import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BoardContent from '@components/MindlePostContent';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';
const blockedImage = require('../../assets/mindle/blocked_mindle.png');
const DEVICE_WIDTH = Dimensions.get('window').width;

const Container = styled.SafeAreaView`
  flex: 1;
  display: flex;
  padding: 15px 15px;
  height: 100%;
  background-color: #ffffff;
  justify-content: flex-start;
`;

const BlockedImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const InfoText = styled.Text`
  font-size: ${(props) => (props.size ? props.size : '12px')};
  color: #959595;
  font-weight: ${(props) => (props.bold ? props.bold : '600')};
`;
const Tab = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  padding: 0px 5px;
  justify-content: space-evenly;
`;

const ImageContainer = styled.View`
  flex-direction: row;
  flex-flow: row wrap;
  margin: 10px 0px;
  width: ${DEVICE_WIDTH}px;
`;

const RecentImage = styled.Image`
  height: ${DEVICE_WIDTH / 3.8}px;
  width: ${DEVICE_WIDTH / 3.8}px;
  border-radius: 10px;
  margin: 5px;
`;

const MindlePreview = ({ navigation, props, mindleKey }) => {
  const { name, overlap } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const jwtToken = useRecoilValue(userState.uidState);

  useEffect(() => {
    axios.defaults.baseURL = 'http://3.35.45.177:3000/';
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
        <Tab>
          <TouchableOpacity
            onPress={() => {
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
            disabled={true}
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
        {!loading && data && (
          <>
            <View style={{ flex: 1, height: '100%', justifyContent: 'flex-start' }}>
              <ScrollView>
                {data && props.recentImages.length > 0 && (
                  <ImageContainer>
                    {props.recentImages.map((item, idx) => (
                      <RecentImage key={idx} source={{ uri: item }} />
                    ))}
                  </ImageContainer>
                )}
                {/* {!loading && !data && (
                  <>
                    <View style={{}}>
                      <Text>게시글이 없습니다.</Text>
                    </View>
                  </>
                )}
                <BoardContent
                  mindleId={mindleKey}
                  postId={data._id}
                  userPhoto={data.userPhoto}
                  name={data._user.name}
                  date={data.createdAt}
                  title={data.title}
                  text={data.text}
                  images={data.images}
                  likes={data.likes}
                  comments={data.comments}
                /> */}
                <View style={{ marginTop: 20, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <BlockedImage source={blockedImage} />
                  <InfoText size="14px" bold="800">
                    내 주변 민들레 보러가기
                  </InfoText>
                  <InfoText>현재 내 위치의 민들레가 아닙니다!</InfoText>
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
