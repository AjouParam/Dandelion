import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  align-self: center;
`;
const StyledImage = styled.Image`
  background-color: #ffffff;
  width: 60px;
  height: 60px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;
const MailImage = ({ url, imageStyle, rounded }) => {
  return (
    <Container>
      <StyledImage source={url} style={imageStyle} rounded={rounded} />
    </Container>
  );
};

MailImage.defaultProps = {
  rounded: false,
  showButton: false,
};

MailImage.propTypes = {
  url: PropTypes.string,
  imageStyle: PropTypes.object,
  rounded: PropTypes.bool,
};

export default MailImage;
