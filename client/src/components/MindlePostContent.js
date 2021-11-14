import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Platform, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import DeleteModal from '@components/Modal';
import userState from '@contexts/userState';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
const DefaultProfile = require('../assets/profile/profile_default.png');
const Unlike = require('../assets/post/like_unclicked.png');
const Like = require('../assets/post/like_clicked.png');
const CommentImage = require('../assets/post/comment.png');
const MenuImage = require('../assets/post/post_menu.png');
const PostEditImage = require('../assets/post/post_menu_edit.png');
const PostDeleteImage = require('../assets/post/post_delete.png');

const DEVICE_WIDTH = Dimensions.get('window').width;

const BoardContainer = styled.View`
  background-color: #ffffff;
  max-width: ${DEVICE_WIDTH}px;
  padding: 5px 5px;
  elevation: 2;
  margin: 5px 5px;
`;
const BoardUserInfo = styled.View`
  width: 100%;
  padding: 0px 10px;
  display: flex;
  flex-direction: row;
`;
const BoardUserImageContainer = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;
const BoardUserImage = styled.Image`
  width: 60px;
  height: 60px;
`;
const BoardUserName = styled.Text`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 3px;
`;
const BoardContents = styled.View`
  margin-top: 5px;
  padding: 5px;
`;
const BoardContentTextContainer = styled.View`
  padding: 0px 15px;
  min-height: 60px;
  max-height: 100px;
  justify-content: flex-start;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;
const BoardContentImageContainer = styled.View`
  margin: 15px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const BoardContentImage = styled.Image`
  width: 70px;
  height: 55px;
  margin-right: 10px;
`;
const BoardTipContainer = styled.View`
  height: 35px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LikeButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 50px;
  height: 35px;
  align-items: center;
  justify-content: center;
`;
const LikeButtonImage = styled.Image`
  width: 35px;
  height: 55px;
`;
const LikeText = styled.Text``;

const CommentContainer = styled.TouchableOpacity`
  height: 35px;
  width: 50px;
  flex-direction: row;
  align-items: center;
`;
const CommentIcon = styled.Image`
  width: 35px;
  height: 55px;
`;
const CommentText = styled.Text``;
const DropdownButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  padding: 5px;
  width: 102px;
  height: 38px;
  align-items: center;
  justify-content: center;
`;

const DeleteContainer = styled.View`
  padding: 24px;
  height: 160px;
  width: 290px;
`;
const DeleteAlertTitle = styled.Text`
  font-weight: 600;
  font-size: 19px;
  color: #424242;
`;
const AlertMessageContainer = styled.View`
  margin-top: 15px;
`;
const DeleteAlertMessage = styled.Text`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
  color: #424242;
`;
const DeleteBtnContainer = styled.View`
  height: 30px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-self: flex-end;
  margin-top: 10px;
`;
const ModalButton = styled.TouchableOpacity`
  height: 20px;
  width: 40px;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const DeleteCancelText = styled.Text`
  font-size: 13px;
  color: #bdbdbd;
`;
const DeleteConfirmText = styled.Text`
  font-size: 13px;
  color: #efb233;
`;

const MindlePostContent = ({
  mindleId,
  postId,
  userPhoto,
  name,
  date,
  updatedAt,
  title,
  text,
  images,
  likes,
  comments,
  userLike,
  isInMindle = false,
  isInPost = false,
  setMenuOpen = () => {},
  onDeletePost = () => {},
  setRefresh = () => {},
  setLikesList = () => {},
  navigation = null,
}) => {
  const [likesNum, setLikesNum] = useState(likes);
  const [like, setLike] = useState(userLike);
  const [deleteModal, setDeleteModal] = useState(false);
  const userName = useRecoilValue(userState.nameState);
  const jwtToken = useRecoilValue(userState.uidState);

  axios.defaults.baseURL = 'http://3.35.45.177:3000/';
  axios.defaults.headers.common['x-access-token'] = jwtToken;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  const toggleLike = async () => {
    // /:dandelionId/:postId/like
    await axios.post(`${mindleId}/${postId}/like`).then((res) => {
      if (res.data.status === 'SUCCESS') {
        console.log(res.data.message, res.data.data.currentLikeStatus);
        setLike(res.data.data.currentLikeStatus);
        setLikesNum((prev) => (res.data.data.currentLikeStatus ? prev + 1 : prev - 1));
        setLikesList(res.data.data.currentLikeStatus, likesNum, postId);
      }
    });
  };

  const checkUpdate = () => {
    const created = new Date(date).getTime();
    const updated = new Date(updatedAt).getTime();
    if (Math.abs(updated - created) <= 20000) {
      return false;
    } else {
      return true;
    }
  };

  const modifyPost = () => {
    navigation.navigate('MakePost', {
      mindleId: mindleId,
      modifyMode: true,
      postContent: { postId: postId, title: title, bodyText: text, images: images },
      setRefresh: setRefresh,
    });
  };

  const deletePost = () => {
    axios.delete(`/${mindleId}/post/delete/${postId}`).then((res) => {
      if (res.data.status === 'SUCCESS') {
        Alert.alert('완료', '게시글이 삭제되었습니다', [
          {
            text: '닫기',
            onPress: () => {
              setMenuOpen(false);

              if (isInPost) {
                setRefresh(true);
                navigation.navigate('Main');
              } else {
                onDeletePost(postId);
              }
            },
          },
        ]);
      } else if (res.data.status === 'FAILED') {
        Alert.alert('실패', '게시글 삭제를 실패하였습니다.\n다시 시도해주세요', [
          {
            text: '닫기',
          },
        ]);
      }
    });
  };

  const RowComponentDeletePost = () => (
    <DropdownButton
      onPress={() => {
        setDeleteModal(true);
      }}
    >
      <Image source={PostDeleteImage} style={{ color: '#EFB233', width: 32, height: 32 }} />
      <Text style={{ fontWeight: '400', color: '#EFB233' }}>게시글 삭제</Text>
    </DropdownButton>
  );
  const RowComponentModifyPost = () => {
    return (
      <DropdownButton onPress={() => modifyPost()}>
        <Image source={PostEditImage} style={{ color: '#EFB233', width: 32, height: 32 }} />
        <Text style={{ fontWeight: '400' }}>게시글 수정</Text>
      </DropdownButton>
    );
  };

  const goMindlePost = () => {
    if (isInMindle && !isInPost)
      navigation.navigate('MindlePost', {
        mindleId: mindleId,
        postId: postId,
        userPhoto: userPhoto,
        name: name,
        date: date,
        updatedAt: updatedAt,
        title: title,
        text: text,
        images: images,
        likes: likesNum,
        comments: comments,
        userLike: like,
        isInPost: true,
        onDeletePost: onDeletePost,
        isInMindle: isInMindle,
        setMenuOpen: setMenuOpen,
        setRefresh: setRefresh,
        setLikesList: setLikesList,
        navigation: navigation,
      });
  };

  if (mindleId && postId)
    return (
      <>
        <BoardContainer>
          <BoardUserInfo>
            <BoardUserImageContainer
              onPress={() => {
                if (isInMindle) setMenuOpen(true);
              }}
            >
              {userPhoto ? (
                <BoardUserImage
                  source={{
                    uri: userPhoto,
                  }}
                />
              ) : (
                <BoardUserImage source={DefaultProfile} />
              )}
            </BoardUserImageContainer>
            <View style={{ flex: 1, padding: 5 }}>
              <BoardUserName
                onPress={() => {
                  if (isInMindle) setMenuOpen(true);
                }}
              >
                {name}
              </BoardUserName>
              {checkUpdate() ? <Text>{date}</Text> : <Text>{updatedAt} (수정됨)</Text>}
            </View>
            {userName === name && (
              <View
                style={{
                  alignSelf: 'center',
                  justifySelf: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 30,
                  height: 30,
                }}
              >
                <ModalDropdown
                  options={['수정', '삭제']}
                  dropdownStyle={{ height: 78 }}
                  dropdownTextStyle={{ fontWeight: '600' }}
                  renderRow={(item, idx, isSelected) => {
                    if (item === '수정') return <RowComponentModifyPost />;
                    else if (item === '삭제') return <RowComponentDeletePost />;
                    console.log(isSelected);
                  }}
                  onSelect={(index, value) => {
                    ModalDropdown.hide();
                  }}
                  saveScrollPosition={false}
                >
                  <View>
                    <Image source={MenuImage} style={{ width: 40, height: 70, marginBottom: -25, marginTop: -20 }} />
                  </View>
                </ModalDropdown>
              </View>
            )}
          </BoardUserInfo>
          <BoardContents>
            <BoardContentTextContainer>
              <Title
                onPress={() => {
                  goMindlePost();
                }}
              >
                {title}
              </Title>
              <Text
                onPress={() => {
                  goMindlePost();
                }}
              >
                {text}
              </Text>
            </BoardContentTextContainer>
            {images
              ? images.length > 0 && (
                  <BoardContentImageContainer>
                    {images.map((item, idx) => (
                      //<BoardContentImage source={{ uri: item }} />
                      <Image key={idx} source={{ uri: item.uri }} style={{ width: 90, height: 90 }} />
                    ))}
                  </BoardContentImageContainer>
                )
              : null}
            <BoardTipContainer>
              <LikeButton
                onPress={() => {
                  toggleLike();
                }}
              >
                <LikeButtonImage source={like ? Like : Unlike} />
                <LikeText>{likes}</LikeText>
              </LikeButton>

              <CommentContainer
                onPress={() => {
                  goMindlePost();
                }}
              >
                <CommentIcon source={CommentImage} />
                <CommentText>{comments}</CommentText>
              </CommentContainer>
            </BoardTipContainer>
          </BoardContents>
        </BoardContainer>
        {deleteModal && (
          <DeleteModal width="300px" height="160px" modalVisible={deleteModal} setModalVisible={setDeleteModal}>
            <DeleteContainer>
              <DeleteAlertTitle>게시글 삭제</DeleteAlertTitle>
              <AlertMessageContainer>
                <DeleteAlertMessage>게시글을 삭제하시면 되돌릴 수 없습니다.</DeleteAlertMessage>
                <DeleteAlertMessage>그래도 삭제하시겠습니까?</DeleteAlertMessage>
              </AlertMessageContainer>
              <DeleteBtnContainer>
                <ModalButton onPress={() => setDeleteModal(false)}>
                  <DeleteCancelText>취소</DeleteCancelText>
                </ModalButton>
                <ModalButton onPress={() => deletePost()}>
                  <DeleteConfirmText>삭제</DeleteConfirmText>
                </ModalButton>
              </DeleteBtnContainer>
            </DeleteContainer>
          </DeleteModal>
        )}
      </>
    );
};
export default MindlePostContent;
