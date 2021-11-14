import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import userState from '@contexts/userState';
import commentState from '../../contexts/commentState';
import utilConstant from '../../utils/utilConstant';
import decode from 'jwt-decode';
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
  const [rerender, setRerender] = useState(false);
  const { mindleId, postId } = route.params;
  const userName = useRecoilValue(userState.nameState);
  const token = useRecoilValue(userState.uidState);
  const userId = decode(token)._id;
  console.log('안녕', userName);
  const jwtToken = useRecoilValue(userState.uidState);
  const [loaded, setLoaded] = useState(false);
  const [commentLoaded, setCommentLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [commentsState, setCommentState] = useRecoilState(commentState);
  axios.defaults.baseURL = 'http://3.35.45.177:3000/';
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
      userLike: route.params.userLike,
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
    console.log('comments loaded!');
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

  const addComment = async (text, setInputText) => {
    return await axios
      .post(`/${postId}/comment/create`, {
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
              userName: userName,
            },
          };
          console.log(newComment);
          setComments((prev) => [res.data.data, ...prev]);
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

  const renderItem = ({ item }) => (
    console.log(item),
    (
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
          state: userName === item._user.name ? 'administrator' : 'visitor',
        }}
      />
    )
  );

  return (
    <Container>
      {loaded && (
        <>
          <Post
            mindleId={mindleId}
            postId={postId}
            userPhoto={data.userPhoto}
            name={data.name}
            date={data.date}
            updatedAt={data.updatedAt}
            title={data.title}
            text={data.text}
            images={data.images}
            likes={data.likes}
            comments={data.comments}
            userLike={data.userLike}
            setLikeList={route.params.setLikesList}
            isInMindle={true}
            isInPost={true}
            setMenuOpen={setMenuOpen}
            setRefresh={route.params.setRefresh}
            navigation={navigation}
          />

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

          {!commentLoaded && (
            <View style={{ flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="0000ff" />
            </View>
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
                /**
                 * {
                    name: item.name,
                    date: item.date,
                    text: item.text,
                    src: test_image[item.src],
                    id: item.id,
                  }
                 */
                console.log(decode(token));
                console.log(userId);
                const messageProps = {
                  id: userId,
                  name: data.name,
                  date: new Date().toISOString(),
                  src: 11,
                  text: '테스트',
                };
                console.log(messageProps);
                navigation.navigate('Channel', {
                  title: data.name,
                  props: messageProps,
                  type: 'channel',
                  state: 'mindle',
                });
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
