import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { View, Dimensions, FlatList } from 'react-native';

import Post from '../../components/post/Post';
import Comment from '../../components/post/comment';
import CommentInput from '../../components/post/commentInput';

import utilConstant from '../../utils/utilConstant';
import { setComment } from '../../controller/postCtrl';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';
import axios from 'axios';
//background-color: rgba(158, 150, 150, .5);
const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: ${Dimensions.get('window').height - utilConstant.postMarginHeight}px;
`;

const MessageContainer = styled.View`
  height: 400px;
  padding-top: 10px;
  background-color: #ffffff;
`;

const PostSubPage = ({ navigation, props }) => {
  const [inputText, setInputText] = useState('');
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [commentLoaded, setCommentLoaded] = useState(false);
  const jwtToken = useRecoilValue(userState.uidState);
  const userName = useRecoilValue(userState.nameState);
  const [commentscount, setCommentsCount] = useState(props.comments);
  axios.defaults.baseURL = 'http://3.35.45.177:3000/';
  axios.defaults.headers.common['x-access-token'] = jwtToken;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  useEffect(() => {
    getComment(page);
    console.log('PostSubPage act getComment', props);
  }, []);
  const handleLoadMore = () => {
    getComment(page);
  };
  const getComment = async (page) => {
    const maxPost = 10;
    await axios
      .get(`/${props._id}/comment`, {
        params: {
          page: page,
          maxPost: maxPost,
        },
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log('댓글 불러오기', res);
          setComments((prev) => [...prev, ...res.data.data]);
          console.log('comments', comments);
          setPage((prev) => prev + 1);
        } else {
          console.log('댓글 불러오기 실패', res);
        }
      })
      .then((res) => {
        setCommentLoaded(true);
      })
      .catch((err) => console.log(err.message));
  };

  const addComment = async (text, setInputText) => {
    return await axios
      .post(`/${props._id}/comment/create`, {
        text: text,
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log('조준', res.data.message);
          /**{
              "status": "SUCCESS",
              "message": "댓글을 작성하였습니다.",
              "data": {
                  "depth": 1,
                  "isDeleted": false,
                  "createdAt": "2021-10-22T00:12:00.443Z",
                  "updatedAt": "2021-10-22T00:09:38.639Z",
                  "_id": "6171834068bce21c44dd0d7b",
                  "_user": "61365d8cd4e22a2dd4df2a6f",
                  "_post": "616c58c6e31deb2e741afe65",
                  "text": "달고나 댓글 1022",
                  "__v": 0
              }
          } */
          const resData = res.data.data._user;
          const newComment = {
            ...res.data.data,
            _user: {
              _id: resData,
              name: userName,
            },
          };

          setComments((prev) => [newComment, ...prev]);
          setCommentsCount(commentscount + 1);
          setInputText('');
          setData((prev) => ({ ...prev, comments: prev.comments + 1 }));
          return true;
        } else {
          console.log('일단', res.data.message);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };
  const deleteComment = async (postId, commentId) => {
    //:postId/comment/delete/:commentId
    await axios
      .delete(`${postId}/comment/delete/${commentId}`)
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log(res.data.message);
          const filtered = comments.filter((item) => item._id !== commentId);
          setComments(filtered);
          setCommentsCount(commentscount - 1);
          setData((prev) => ({ ...prev, comments: filtered.length }));
          setCommentState(true);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <Comment
        key={item._id}
        depth={item.depth}
        props={{
          name: item.name,
          text: item.text,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          _id: item._id,
          _user: item._user,
          _post: item._post,
          __v: item.__v,
          isDeleted: item.isDeleted,
          deleteComment: deleteComment,
          state: userName === item._user.name ? 'administrator' : 'visitor',
        }}
      />
    );
  };
  return (
    <Container>
      <Post //type setting
        click={false}
        navigation={navigation}
        props={props}
        commentscount={commentscount}
      />
      <MessageContainer>
        {/* {messages.map((element) => element)} */}
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => String(item._id)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
        />
      </MessageContainer>
      <CommentInput functionCall={{ addComment }} />
    </Container>
  );
};

export default PostSubPage;
