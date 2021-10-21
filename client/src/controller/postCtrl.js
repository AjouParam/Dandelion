import React from 'react';
// import HotSpot from '../screens/HotSpot';
import Post from '../screens/myPage/post';
import Mindle from '../screens/myPage/mindle';

const PostModule = {
  //   hotSpot: <HotSpot />,
  post: function () {
    return <Post navigation={this} />;
  },
  mindle: function () {
    return <Mindle navigation={this} />;
  },
};

export default PostModule;
