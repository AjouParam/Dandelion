import React from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;
const StyledText = styled.Text`
  font-size: 16px;
`;
const PasswordReset = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <Container insets={insets}>
      <StyledText>비밀번호 재설정 페이지</StyledText>
    </Container>
  );
};
export default PasswordReset;
