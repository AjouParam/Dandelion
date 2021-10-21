import React from 'react';
import { View, Text, Header } from 'react-native';
import Post from '../../screens/detailPage/post';
import Mindle from '../../screens/detailPage/mindle';

const DetailSubPage = ({ navigation, props, state }) => {
  console.log(props, state);
  return (
    <>
      {state === 'mindle' ? (
        <Mindle navigation={navigation} props={props} />
      ) : (
        <Post navigation={navigation} props={props} />
      )}
    </>
  );
};

export default DetailSubPage;
