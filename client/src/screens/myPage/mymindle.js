import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import styled from 'styled-components/native';
import Mindle from '../../components/post/Mindle';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';
import axios from 'axios';
import mapCtrl from '../../controller/mapCtrl';

const Container = styled.View`
  height: ${Dimensions.get('window').height - 60}px;
  background-color: #ffffff;
`;

const MyMindleSubPage = ({ navigation, props }) => {
  const jwtToken = useRecoilValue(userState.uidState);
  const userlocation = useRecoilValue(userState.userlocation);
  const [Mymindle, setMymindle] = useState();
  const [page, setPage] = useState(1);
  axios.defaults.baseURL = 'http://3.35.45.177:3000/';
  axios.defaults.headers.common['x-access-token'] = jwtToken;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  useEffect(() => {
    getMindle(page);
    setPage(page + 1);
  }, []);
  const getMindle = async (page) => {
    const maxpost = 10;
    await axios
      .post(
        `/dandelion/get/mine`,
        {
          currentPosition: {
            latitude: userlocation.latitude,
            longitude: userlocation.longitude,
          },
        },
        { params: { page: page, maxPost: maxpost } },
      )
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log('민들레 가져오기 성공', res.data.data);
          setMymindle(res.data.data);
        } else {
          console.log('민들레 가져오기 실패', res);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const renderItem = ({ item }) => {
    console.log(item.location);
    return (
      <Mindle //type setting
        click={true}
        navigation={navigation}
        props={{
          name: item.name,
          distance: mapCtrl.getDistance(userlocation, item.location),
          location: item.location,
          countVisitor: item.cumulativeVisitors,
          countEvent: item.events,
          tag: item.description,
          _creator: item._creator,
        }}
      />
    );
  };
  return (
    <Container>
      <FlatList data={Mymindle} renderItem={renderItem} keyExtractor={(item) => item.toString()} />
    </Container>
  );
};

export default MyMindleSubPage;
