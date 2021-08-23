import React, { useState, useRef, useEffect, useContext } from 'react';
// import { ProgressContext, UserContext } from '@contexts';
import userState from '@contexts/userState';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { Image, Input, Button } from '@components/index';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '@utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Alert } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

// const Login = ({ navigation }) => {
//   // const { dispatch } = useContext(UserContext);
//   const { spinner } = useContext(ProgressContext);
//   const insets = useSafeAreaInsets();

//   const [emailInput, setEmailInput] = useState('');
//   const [password, setPassword] = useState('');
//   const passwordRef = useRef();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [disabled, setDisabled] = useState(true);
//   const [email, setEmail] = useRecoilState(userState.emailState);
//   const [uid, setUid] = useRecoilState(userState.uidState);

//   useEffect(() => {
//     setDisabled(!(emailInput && password && !errorMessage));
//   }, [emailInput, password, errorMessage]);

//   const _handleEmailChange = (email) => {
//     const changedEmail = removeWhitespace(email);
//     setEmailInput(changedEmail);
//     setErrorMessage(validateEmail(changedEmail) ? '' : '이메일을 확인해주세요');
//   };

//   const _handlePasswordChange = (password) => {
//     setPassword(removeWhitespace(password));
//   };

//   const _handleLoginButtonPress = async () => {
//     try {
//       spinner.start();
//       // const user = { emailInput, password };
//       setEmail(emailInput);
//       setUid(1);
//       // dispatch(user);
//     } catch (e) {
//       Alert.alert('로그인 에러', e.message);
//     } finally {
//       spinner.stop();
//     }
//   };

//   return (
//     <Container insets={insets}>
//       <Input
//         label="이메일"
//         value={emailInput}
//         onChangeText={_handleEmailChange}
//         onSubmitEditing={() => passwordRef.current.focus()}
//         placeholder="이메일"
//         returnKeyType="next"
//       />
//       <Input
//         ref={passwordRef}
//         label="비밀번호"
//         value={password}
//         onChangeText={_handlePasswordChange}
//         onSubmitEditing={_handleLoginButtonPress}
//         placeholder="비밀번호"
//         returnKeyType="done"
//         isPassword
//       />
//       <ErrorText>{errorMessage}</ErrorText>
//       <Button title="로그인" onPress={_handleLoginButtonPress} disabled={disabled} />
//       <Button title="이메일로 회원가입" onPress={() => navigation.navigate('Signup')} isFilled={false} />
//     </Container>
//   );
// };

// export default Login;

const Login = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useRecoilState(userState.emailState);
  const [uid, setUid] = useRecoilState(userState.uidState);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setDisabled(!(emailInput && password && !errorMessage));
  }, [emailInput, password, errorMessage]);

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmailInput(changedEmail);
    setErrorMessage(validateEmail(changedEmail) ? '' : '이메일을 확인해주세요');
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const _handleLoginButtonPress = async () => {
    try {
      // const user = { emailInput, password };
      setEmail(emailInput);
      setUid(1);
      // dispatch(user);
    } catch (e) {
      Alert.alert('로그인 에러', e.message);
    } finally {
    }
  };
  return (
    <Container insets={insets}>
      <Input
        label="이메일"
        value={emailInput}
        onChangeText={_handleEmailChange}
        onSubmitEditing={() => passwordRef.current.focus()}
        placeholder="이메일"
        returnKeyType="next"
      />
      <Input
        ref={passwordRef}
        label="비밀번호"
        value={password}
        onChangeText={_handlePasswordChange}
        onSubmitEditing={_handleLoginButtonPress}
        placeholder="비밀번호"
        returnKeyType="done"
        isPassword
      />
      <ErrorText>{errorMessage}</ErrorText>
      <Button title="로그인" onPress={_handleLoginButtonPress} disabled={disabled} />
      <Button title="이메일로 회원가입" onPress={() => navigation.navigate('Signup')} isFilled={false} />
      {/* <Button title="이메일로 회원가입" onPress={() => Alert.alert('sign up')} isFilled={false} /> */}
    </Container>
  );
};
export default Login;
