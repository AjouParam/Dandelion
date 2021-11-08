import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';

import utilConstant from '../../utils/utilConstant';

import { FlatList } from 'react-native-gesture-handler';
import Post from '@components/MindlePostContent';
import ProfileModal from '@components/Modal';
import Comment from '@components/post/comment';
import CommentInput from '@components/post/commentInput';

const Container = styled.View`
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: ${Dimensions.get('window').height - utilConstant.postMarginHeight}px;
`;

const PostLoadingContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
`;

const Divider = styled.View`
  margin-top: 10px;
  height: 1px;
  border: 0.3px solid #000000;
`;

// const MessageContainer = styled.ScrollView`
//   height: 400px;
//   padding-top: 10px;
//   background-color: #ffffff;
//   padding-bottom: ${utilConstant.postMarginHeight}px;
// `;

const MindlePost = ({ route, navigation }) => {
  const { mindleId, postId } = route.params;
  const userName = useRecoilValue(userState.nameState);
  const jwtToken = useRecoilValue(userState.uidState);
  const [loaded, setLoaded] = useState(false);
  const [commentLoaded, setCommentLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);

  axios.defaults.baseURL = 'http://10.0.2.2:3000/';
  axios.defaults.headers.common['x-access-token'] = jwtToken;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  useEffect(() => {
    setData({
      userPhoto: route.params.userPhoto,
      name: route.params.name,
      date: route.params.date,
      updatedAt: route.params.updatedAt,
      title: route.params.title,
      text: route.params.text,
      images: route.params.images,
      likes: route.params.likes,
      comments: route.params.comments,
    });
    getComment(page);
  }, []);

  useEffect(() => {
    if (data && commentLoaded) {
      setLoaded(true);
    }
  }, [data, commentLoaded]);

  useEffect(() => {
    setCommentLoaded(true);
    console.log(comments);
  }, [comments]);

  const getComment = async (page) => {
    const maxPost = 10;
    await axios
      .get(`/${postId}/comment`, {
        params: {
          page: page,
          maxPost: maxPost,
        },
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log('댓글 불러오기');
          setComments((prev) => [...prev, ...res.data.data]);
          setPage((prev) => prev + 1);
        } else {
          console.log('댓글 불러오기 실패');
        }
      })
      .then((res) => {
        setCommentLoaded(true);
      })
      .catch((err) => console.log(err.message));
  };

  const handleLoadMore = () => {
    getComment(page);
  };

  const addComment = async (text) => {
    return await axios
      .post(`/${postId}/comment/create`, {
        text: text,
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log(res.data.message);
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
          setComments((prev) => [...prev, res.data.data]);
          return true;
        } else {
          console.log(res.data.message);
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
    setCommentLoaded(false);
    await axios
      .delete(`${postId}/comment/delete/${commentId}`)
      .then((res) => {
        if (res.data.message === 'SUCCESS' && res.data.message === '댓글을 삭제하였습니다.') {
          console.log(res.data.message);
          const filtered = comments.filter((item) => item._id !== commentId);
          console.log(filtered);
          setComments(filtered);
        } else {
          console.log(res.data.message);
        }
      })

      .catch((err) => {
        console.log(err.message);
      });
  };
  const renderItem = ({ item }) => (
    <Comment
      key={item._id}
      depth={item.depth}
      props={{
        name: item.name,
        state: item.state,
        text: item.text,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        _id: item._id,
        _user: item._user,
        _post: item._post,
        __v: item.__v,
        isDeleted: item.isDeleted,
        deleteComment: deleteComment,
      }}
    />
  );

  return (
    <Container>
      {loaded && (
        <>
          <Post
            mindleId={mindleId}
            postId={postId}
            userPhoto={
              data.userPhoto ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png'
            }
            name={data.name}
            date={data.date}
            updatedAt={data.updatedAt}
            title={data.title}
            text={data.text}
            images={data.images}
            likes={data.likes}
            comments={data.comments}
            isInMindle={true}
            isInPost={true}
            setMenuOpen={setMenuOpen}
            setRefresh={route.params.setRefresh}
            navigation={navigation}
          />
          {!commentLoaded && (
            <View style={{ flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="0000ff" />
            </View>
          )}
          {commentLoaded && (
            <FlatList
              style={{
                maxHeight: Dimensions.get('window').height - 180,
                paddingTop: 10,
                marginBottom: utilConstant.postMarginHeight + 40,
                backgroundColor: '#ffffff',
              }}
              data={comments}
              renderItem={renderItem}
              keyExtractor={(item) => String(item._id)}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.8}
            />
          )}
          <CommentInput functionCall={{ addComment }} />
        </>
      )}
      {!loaded && (
        <PostLoadingContainer>
          <ActivityIndicator size="large" color="0000ff" />
        </PostLoadingContainer>
      )}
      <ProfileModal width="180px" height="100px" modalVisible={menuOpen} setModalVisible={setMenuOpen}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'space-evenly',
            padding: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
              onPress={() => {
                Alert.alert('쪽지 보내기', '쪽지 보내기 화면으로 이동');
              }}
            >
              <Text style={{ fontSize: 16 }}>쪽지 보내기</Text>
            </TouchableOpacity>
          </View>
          <Divider />
          <View
            style={{
              flex: 1,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              width: '100%',
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setMenuOpen(false);
              }}
              style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
            >
              <Text style={{ fontSize: 16, color: 'red' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ProfileModal>
    </Container>
  );
};
export default MindlePost;