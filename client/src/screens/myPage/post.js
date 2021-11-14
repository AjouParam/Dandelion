import React, { useEffect, useState } from 'react';
import { View, Text, Header } from 'react-native';
import Post from '../../components/post/Post';
import postService from '../../service/post';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';
import axios from 'axios';

const PostSubPage = ({ navigation, click = true }) => {
  const [mypost, setMypost] = useState();
  const jwtToken = useRecoilValue(userState.uidState);

  useEffect(() => {
    setMypost(postService.getData());
  }, []);
  return (
    <>
      <Post //type setting
        click={click}
        navigation={navigation}
        props={{
          name: '아무개',
          date: '2021.07.19',
          text: '많아요~',
          like: 6,
          message: 23,
        }}
      />

      <Post //type setting
        click={click}
        navigation={navigation}
        props={{
          name: '드라큘라',
          date: '2021.10.26',
          text: '할로윈데이 까지 5일 남았습니다',
          like: 999,
          message: 60,
        }}
      />
      {/* <Post />
      <Post /> */}
    </>
  );
};

export default PostSubPage;
