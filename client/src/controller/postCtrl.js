import React from 'react';
// import HotSpot from '../screens/HotSpot';
import Post from '../screens/myPage/post';
import Mindle from '../screens/myPage/mindle';
import Detail from '../screens/detailPage/detail';

const PostModule = {
  //   hotSpot: <HotSpot />,
  detail: function () {
    return <Detail navigation={this.navigation} props={this.props} state={this.state} />;
  },
  post: function () {
    return <Post navigation={this.navigation} props={this.props} />;
  },
  mindle: function () {
    return <Mindle navigation={this.navigation} props={this.props} />;
  },
};

export default PostModule;
