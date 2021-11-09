import React, { useState, useEffect } from 'react';
import { Alert, Text, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Button } from 'react-native';
import { level1, level2, level3, level4 } from '../../assets/index';
import styled from 'styled-components/native';
import SubComment from '@components/post/subcomment';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { useRecoilValue, useRecoilState } from 'recoil';
import userState from '@contexts/userState';
import utilConstant from '../../utils/utilConstant';
import CreateSubComment from '@components/post/CreateSubComments';
const Container = styled.View`
  display: flex;
  flex-direction: column;
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
const BottomContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const SubContainer = styled.View``;
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
  const { name, state, text, createdAt, updatedAt, _id, _user, _post, __v, isDeleted, deleteComment } = props;
  const jwtToken = useRecoilValue(userState.uidState);
  const [page, setPage] = useState(1);
  const [subcomments, setSubComments] = useState([]);
  const [subcommentLoaded, setSubCommentLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  axios.defaults.baseURL = 'http://10.0.2.2:3000/';
  axios.defaults.headers.common['x-access-token'] = jwtToken;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  useEffect(() => {
    getSubComment(page);
  }, []);

  useEffect(() => {
    if (subcommentLoaded) {
      setLoaded(true);
    }
  }, [subcommentLoaded]);

  useEffect(() => {
    setSubCommentLoaded(true);
    console.log('subcomments loaded!');
  }, [subcomments]);

  const getSubComment = async (page) => {
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
          console.log('답글 불러오기');
          setSubComments((prev) => [...prev, ...res.data.data]);
          setPage((prev) => prev + 1);
        } else {
          console.log('답글 불러오기 실패');
        }
      })
      .then((res) => {
        setSubCommentLoaded(true);
      })
      .catch((err) => console.log(err.message));
  };
  const handleLoadMore = () => {
    getSubComment(page);
  };
  const deleteSubComment = async (postId, commentId) => {
    //:postId/comment/delete/:commentId
    await axios
      .delete(`${postId}/nestedComment/delete/${commentId}`)
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          console.log(res.data.message);
          const filtered = comments.filter((item) => item._id !== subcommentId);
          setSubComments(filtered);
          setSubCommentState(true);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const renderItem = ({ item }) => (
    <SubComment
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
        deleteComment: deleteSubComment,
      }}
    />
  );
  return (
    <>
      <CreateSubComment
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setSubComments={setSubComments}
        commentID={_id}
      />
      <Container style={{ marginLeft: (depth - 1) * 50 }}>
        <CommentContainer>
          <TopContainer>
            <ProfileImg source={level1} />
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
                        addSubComment();
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
            <TouchableOpacity>
              <ChoiceButton
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text>답글</Text>
              </ChoiceButton>
            </TouchableOpacity>
          </BottomContainer>
        </CommentContainer>
        <FlatList
          style={{
            maxHeight: Dimensions.get('window').height - 180,
            paddingTop: 10,
            backgroundColor: '#ffffff',
          }}
          data={subcomments}
          renderItem={renderItem}
          keyExtractor={(item) => String(item._id)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
        />
      </Container>
    </>
  );
};

export default Comment;
