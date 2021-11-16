import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Platform, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import DeleteModal from '@components/Modal';
import ProfileModal from '@components/Modal';
import userState from '@contexts/userState';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import decode from 'jwt-decode';
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
  width: 45px;
  height: 45px;
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

const EventInfoContainer = styled.View`
  flex-direction: row;
  width: 100%;
  min-height: 100px;
  padding: 0px 10px;
  margin-bottom: 10px;
`;
const EventImage = styled.Image`
  width: 105px;
  height: 105px;
  padding: 5px 5px;
`;
const FlexRowContainer = styled.View`
  flex-direction: row;
  padding: 5px 0px;
`;
const EventInfo = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 5px 5px;
`;

const EventTitle = styled.Text`
  color: #424242;
  width: 175px;
  flex-shrink: 1;
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;
`;
const EventInfoText = styled.Text`
  color: ${(props) => (props.color ? props.color : '#959595')};
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
`;
const EventButton = styled.TouchableOpacity`
  width: 303px;
  height: 38px;
  background-color: ${(props) => (props.status == 0 ? '#f3d737' : '#F6F6F6')};
  border-radius: 26px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;
const ButtonText = styled.Text`
  font-size: 16px;
  color: ${(props) => (props.status == 0 ? '#FFFFFF' : '#CCCCCC')};
`;
const EventPost = ({ title, status, firstComeNum, rewards, image }) => {
  return (
    <BoardContents>
      <EventInfoContainer>
        {image ? <EventImage source={{ uri: image }} /> : null}
        <EventInfo>
          <EventInfoText color="#87C548">{status == 0 ? '진행중' : '종료'}</EventInfoText>
          <EventTitle>{title}</EventTitle>
          <FlexRowContainer>
            <EventInfoText>남음</EventInfoText>
            <EventInfoText color="#EFB233">{firstComeNum}</EventInfoText>
            <EventInfoText>씨앗</EventInfoText>
            <EventInfoText color="#EFB233">{rewards}</EventInfoText>
          </FlexRowContainer>
        </EventInfo>
      </EventInfoContainer>
      <EventButton
        status={status}
        onPress={() => {
          Alert.alert('이벤트', '이벤트 참여가 완료되었습니다.');
        }}
      >
        <ButtonText status={status}>이벤트 참가</ButtonText>
      </EventButton>
    </BoardContents>
  );
};
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
  isEvent = false,
  status = 0,
  firstComeNum = 0,
  rewards = 0,
  isInMindle = false,
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
  const userId = decode(jwtToken)._id;
  const [menuOpen, setMenuOpen] = useState(false);

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
              if (!isInMindle) {
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
        <Image source={PostEditImage} style={{ width: 32, height: 32 }} />
        <Text style={{ fontWeight: '400' }}>게시글 수정</Text>
      </DropdownButton>
    );
  };

  const goMindlePost = () => {
    if (isInMindle)
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
        onDeletePost: onDeletePost,
        isInMindle: isInMindle,
        isEvent: isEvent,
        status: status,
        firstComeNum: firstComeNum,
        rewards: rewards,
        isInMindle: false,
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
                if (userName !== name) setMenuOpen(true);
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
                  if (userName !== name) setMenuOpen(true);
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
          {!isEvent && (
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
                        <Image key={idx} source={{ uri: item }} style={{ width: 90, height: 90 }} />
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
          )}
          {isEvent && (
            <EventPost title={title} status={status} firstComeNum={firstComeNum} rewards={rewards} image={images[0]} />
          )}
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
        {menuOpen && (
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
                    // Alert.alert('쪽지 보내기', '쪽지 보내기 화면으로 이동');
                    const messageProps = {
                      id: userId,
                      name: name,
                      date: new Date().toISOString(),
                      src: 11,
                      text: '테스트',
                    };
                    console.log(messageProps);
                    setMenuOpen(false);
                    navigation.navigate('Channel', {
                      title: name,
                      props: messageProps,
                      type: 'channel',
                      state: 'mindle',
                    });
                  }}
                >
                  <Text style={{ fontSize: 16 }}>쪽지 보내기</Text>
                </TouchableOpacity>
              </View>

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
        )}
      </>
    );
};
export default MindlePostContent;
