import React, { useState } from 'react';
import { Alert, Text, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from 'react-native';
import { level1, level2, level3, level4 } from '../../assets/index';
import styled from 'styled-components/native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const CommentContainer = styled.View`
  margin: 0px 20px;
`;
const TopContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: ${Dimensions.get('window').width / 2}px;
  justify-content: space-between;
`;
const BottomContainer = styled.View``;
const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  border: 1px solid black;
`;
const User = styled.Text``;
const Date = styled.Text``;
const ChoiceButton = styled.TouchableOpacity`
  margin: 0px 5px;
`;
const CommentText = styled.Text``;

const Comment = ({ navigation, props, depth }) => {
  const [subcomments, setSubComments] = useState([]);
  const [data, setData] = useState({});
  const [subcommentLoaded, setSubCommentLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const { name, state, text, createdAt, updatedAt, _id, _user, _post, __v, isDeleted, deleteComment } = props;
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
    if (data && subcommentLoaded) {
      setLoaded(true);
    }
  }, [data, subcommentLoaded]);

  useEffect(() => {
    setSubCommentLoaded(true);
    console.log('Subcomments loaded!');
  }, [subcomments]);

  const getSubcomment = async (page) => {
    const maxPost = 10;
    await axios
      .get(`/${_id}/nestedComment/`, {
        params: {
          page: page,
          maxPost: maxPost,
        },
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log('덧글 불러오기');
          setSubComments((prev) => [...prev, ...res.data.data]);
          setPage((prev) => prev + 1);
        } else {
          console.log('덧글 불러오기 실패');
        }
      })
      .then((res) => {
        setSubCommentLoaded(true);
      })
      .catch((err) => console.log(err.message));
  };
  const addSubComment = async (text, setInputText) => {
    return await axios
      .post(`/${_id}/nestedComment/create`, {
        text: text,
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log(res.data.message);
          setSubComments((prev) => [...prev, res.data.data]);
          setInputText('');
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

  const handleLoadMore = () => {
    getSubcomment(page);
  };
  const deleteSubComment = async (subcommentId) => {
    //:postId/comment/delete/:commentId
    await axios
      .delete(`/${_id}/nestedComment/delete/:commentId${subcommentId}`)
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log(res.data.message);
          const filtered = subcomments.filter((item) => item._id !== subcommentId);
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
    <Container style={{ marginLeft: (depth - 1) * 50 }}>
      <ProfileImg source={level1} />
      <CommentContainer>
        <TopContainer>
          <User>{name}</User>
          <Date>{createdAt !== updatedAt ? createdAt : `${updatedAt} (수정됨)`}</Date>
          <TouchableOpacity>
            <ChoiceButton
              onPress={() => {
                Alert.alert('댓글 삭제', '댓글을 삭제하시겠습니까?', [
                  { text: '취소', style: 'cancel' },
                  {
                    text: '확인',
                    onPress: () => {
                      deleteComment(_post, _id);
                    },
                  },
                ]);
              }}
            >
              <Text>{state === 'visitor' ? '답글' : '삭제'}</Text>
            </ChoiceButton>
          </TouchableOpacity>
        </TopContainer>
        <BottomContainer>
          <CommentText>{isDeleted ? '삭제된 댓글입니다.' : text}</CommentText>
        </BottomContainer>
      </CommentContainer>
    </Container>
  );
};

export default Comment;
