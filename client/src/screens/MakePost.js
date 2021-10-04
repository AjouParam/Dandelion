import React from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 5px;
`;
const Header = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #000;
  background
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

const MakePost = ({ navigation }) => {
  return (
    <Container>
      {/* <Header>
        <Title>게시글 작성</Title>
      </Header> */}
    </Container>
  );
};
export default MakePost;
