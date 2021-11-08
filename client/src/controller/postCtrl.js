import React from 'react';

// import HotSpot from '../screens/HotSpot';
import HotSpot from '../screens/HotSpot';
import Post from '../screens/myPage/post';
import Mindle from '../screens/myPage/mindle';
import Mail from '../screens/myPage/mail';
import Detail from '../screens/detailPage/detail';
import Comment from '../components/post/comment';
import Channel from '../screens/myPage/channel';
export const PostModule = {
  //   hotSpot: <HotSpot />,
  detail: function () {
    return <Detail navigation={this.navigation} props={this.props} state={this.state} />;
  },
  mail: function () {
    return <Mail navigation={this.navigation} props={this.props} />;
  },
  post: function () {
    return <Post navigation={this.navigation} props={this.props} />;
  },
  mindle: function () {
    return <Mindle navigation={this.navigation} props={this.props} />;
  },
  hotSpot: function () {
    return <HotSpot navigation={this.navigation} props={this.props} />;
  },
  channel: function () {
    return <Channel navigation={this.navigation} props={this.props} />;
  },
};

export const setComment = (text, list) => [
  ...list,
  <Comment depth={0} props={{ name: '라이언', date: '07 09 01:55', state: 'visitor', text }} />,
];

// addchildCOmment;
// deleteComment;
