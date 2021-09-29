import React from 'react';
import styled from 'styled-components/native';
import { Modal, Button, Text } from 'react-native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BlackSpace = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  background-color: #ffffff;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const CustomModal = ({ width, height, modalVisible, setModalVisible, children }) => {
  return modalVisible ? (
    <Modal animationType={'fade'} transparent={true} visible={modalVisible}>
      <Container>
        <BlackSpace
          onTouchEnd={() => {
            setModalVisible(false);
          }}
        ></BlackSpace>
        <Content width={width ? width : '300px'} height={height ? height : '250px'}>
          {children}
        </Content>
      </Container>
    </Modal>
  ) : null;
};

export default CustomModal;
