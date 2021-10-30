import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Platform, View, Text, TouchableOpacity, Alert } from 'react-native';
import MenuModal from '@components/Modal';
import userState from '@contexts/userState';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

const BoardContainer = styled.View`
  width: 100%;
  min-height: 150px;
  padding: 5px 5px;
  justify-content: flex-start;
`;
const BoardUserInfo = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const BoardUserImageContainer = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  padding: 5px 5px;
  align-items: center;
  justify-content: center;
`;
const BoardUserImage = styled.Image`
  width: 40px;
  height: 40px;
`;
const BoardUserName = styled.Text`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 3px;
`;
const BoardContents = styled.View`
  margin-top: 5px;
  padding-left: 55px;
`;
const BoardContentTextContainer = styled.View`
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
  margin-top: 5px;
  margin-bottom: 5px;
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
  height: 30px;
  padding-top: 5px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  isInMindle = false,
  isInPost = false,
  setMenuOpen = () => {},
  onDeletePost = () => {},
  setRefresh = () => {},
  navigation = null,
}) => {
  const [menu, setMenu] = useState(false);
  const userName = useRecoilValue(userState.nameState);
  const jwtToken = useRecoilValue(userState.uidState);

  axios.defaults.baseURL = 'http://10.0.2.2:3000/';
  axios.defaults.headers.common['x-access-token'] = jwtToken;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
              setMenu(false);

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
  if (mindleId && postId)
    return (
      <>
        {userName === name && (
          <MenuModal width="300px" height="150px" modalVisible={menu} setModalVisible={setMenu}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 5,
                  width: 300,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  //TODO : 게시글 삭제 로직
                  Alert.alert(
                    '게시글 삭제',
                    `${mindleId}, ${postId}게시글을 삭제하시면 되돌릴 수 없습니다.\n그래도 삭제하시겠습니까?`,
                    [
                      { text: '취소', style: 'cancel' },
                      {
                        text: '확인',
                        onPress: () => deletePost(),
                      },
                    ],
                    {
                      cancelable: true,
                    },
                  );
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '500' }}>게시글 삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 5,
                  width: 300,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => modifyPost()}
              >
                <Text style={{ fontSize: 16, fontWeight: '500' }}>게시글 수정</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, padding: 5, width: 300, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                  setMenu(false);
                }}
              >
                <Text style={{ color: 'red', fontSize: 16, fontWeight: '500' }}>닫기</Text>
              </TouchableOpacity>
            </View>
          </MenuModal>
        )}
        <BoardContainer
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <BoardUserInfo>
            <BoardUserImageContainer
              onPress={() => {
                if (isInMindle) setMenuOpen(true);
              }}
            >
              <BoardUserImage
                source={{
                  uri:
                    userPhoto ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
                }}
              />
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
                <TouchableOpacity
                  onPress={() => {
                    setMenu(true);
                  }}
                >
                  <Text style={{ fontSize: 16 }}>...</Text>
                </TouchableOpacity>
              </View>
            )}
          </BoardUserInfo>
          <BoardContents>
            <BoardContentTextContainer>
              <Title
                onPress={() => {
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
                      likes: likes,
                      comments: comments,
                      isInPost: true,
                      onDeletePost: onDeletePost,
                      isInMindle: isInMindle,
                      setMenuOpen: setMenuOpen,
                      setRefresh: setRefresh,
                      navigation: navigation,
                    });
                }}
              >
                {title}
              </Title>
              <Text
                onPress={() => {
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
                      likes: likes,
                      comments: comments,
                      isInPost: true,
                      onDeletePost: onDeletePost,
                      isInMindle: isInMindle,
                      setMenuOpen: setMenuOpen,
                      setRefresh: setRefresh,
                      navigation: navigation,
                    });
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
                      <Text key={idx}>{item} </Text>
                    ))}
                  </BoardContentImageContainer>
                )
              : null}
            <BoardTipContainer>
              <TouchableOpacity>
                <Text>Like {likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Comments {comments}</Text>
              </TouchableOpacity>
            </BoardTipContainer>
          </BoardContents>
        </BoardContainer>
      </>
    );
};
export default MindlePostContent;
