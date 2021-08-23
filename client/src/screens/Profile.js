import React, { useContext, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { ThemeContext } from 'styled-components/native';
import { Button, Image, Input } from '@components';
import { ProgressContext } from '@contexts/progress';
import userState from '@contexts/userState';
import { Alert, View, Text } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

// const Profile = () => {
//   // const { dispatch } = useContext(UserContext);
// const { spinner } = useContext(ProgressContext);
// const theme = useContext(ThemeContext);

// const [email, setEmail] = useRecoilState(userState.emailState);
// const [uid, setUid] = useRecoilState(userState.uidState);

// const name = '테스터';

// const _handleLogoutButtonPress = async () => {
//   try {
//     spinner.start();
//     await logout();
//   } catch (e) {
//     console.log('[Profile] logout: ', e.message);
//   } finally {
//     dispatch({});
//     spinner.stop();
//   }
// };

//   const _handlePhotoChange = async (url) => {
//     try {
//       spinner.start();
//       const updatedUser = await updateUserPhoto(url);
//       setPhotoUrl(updatedUser.photoUrl);
//     } catch (e) {
//       Alert.alert('Photo Error', e.message);
//     } finally {
//       spinner.stop();
//     }
//   };

//   return (
//     <Container>
//       <Image showButton rounded />
// <Text label="이름" value={name} disabled />
// <Text label="이메일" value={email} disabled />
// <Button
//   title="로그아웃"
//   onPress={() => {
//     Alert.alert('로그아웃', '로그아웃을 하시려면 확인 버튼을 누르세요.', [
//       {
//         text: '취소',
//         style: 'cancel',
//       },
//       {
//         text: '확인',
//         onPress: () => {
//           setUid('');
//           setEmail('');
//         },
//       },
//     ]);
//   }}
//   containerStyle={{ marginTop: 30, backgroundColor: theme.buttonLogout }}
// />
//     </Container>
//   );
// };
// const Profile = () => {
//   <Container>
//     <Text>프로필</Text>
//   </Container>;
// };

const Profile = () => {
  const { spinner } = useContext(ProgressContext);
  const theme = useContext(ThemeContext);

  const [email, setEmail] = useRecoilState(userState.emailState);
  const [uid, setUid] = useRecoilState(userState.uidState);

  const name = '테스터';

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      // await logout();
      setUid('');
      setEmail('');
    } catch (e) {
      console.log('[Profile] logout: ', e.message);
    } finally {
      // dispatch({});
      spinner.stop();
    }
  };

  return (
    <Container>
      <Text>프로필 구현할 페이지</Text>
      {/* <Image showButton rounded /> */}
      <Input label="이름" value={name} disabled />
      <Input label="이메일" value={email} disabled />
      <Button
        title="로그아웃"
        onPress={() => {
          Alert.alert('로그아웃', '로그아웃을 하시려면 확인 버튼을 누르세요.', [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '확인',
              onPress: _handleLogoutButtonPress,
            },
          ]);
        }}
        containerStyle={{ marginTop: 30, backgroundColor: theme.buttonLogout }}
      />
    </Container>
  );
};

export default Profile;
