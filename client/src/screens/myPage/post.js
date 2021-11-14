import React, { useEffect, useState } from 'react';
import { View, Text, Header, FlatList, ScrollView } from 'react-native';
import Post from '../../components/post/Post';
import postService from '../../service/post';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';
import axios from 'axios';

const PostSubPage = ({ navigation, click = true }) => {
  const [mypost, setMypost] = useState();
  const jwtToken = useRecoilValue(userState.uidState);

  useEffect(() => {
    postService.getData(setMypost);
    // console.log('mypost', mypost);
  }, []);

  return (
    <ScrollView>
      {mypost?.map((item) => (
        <Post //type setting
          click={click}
          navigation={navigation}
          props={{
            // name: item._user.name,
            // date: item.createdAt,
            // text: item.text,
            // like: item.likes,
            // title: item.title,
            // message: item.comments,
            // images: item.images,
            ...item,
          }}
        />
      ))}
    </ScrollView>
  );
};

export default PostSubPage;
