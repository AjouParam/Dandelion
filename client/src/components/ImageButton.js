import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const TRANSPARENT = 'transparent';

const Container = styled.TouchableOpacity`
  background-color: ${TRANSPARENT};
  align-items: center;
  justify-content:center;
  border-radius: px;
  width: ${(props) => props.width}
  height:${(props) => props.height}
  padding: 10px;
  borderRadius:50px;
`;
//흰색 바탕 이미지
const StyledImage = styled.Image`
  background-color: #ffffff;
  width: 60px;
  height: 60px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;

const ImageButton = ({ containerStyle, src, onPress, isFilled, disabled, width, height, rounded }) => {
  return (
    <Container
      style={containerStyle}
      onPress={onPress}
      isFilled={isFilled}
      disabled={disabled}
      width={width ? width : '100%'}
      height={height ? height : '50px'}
    >
      <StyledImage source={src} rounded={rounded} />
    </Container>
  );
};

ImageButton.defaultProps = {
  isFilled: true,
};

ImageButton.propTypes = {
  containerStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ImageButton;
