import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const TRANSPARENT = 'transparent';

const Container = styled.TouchableOpacity`
  background-color: ${({ theme, isFilled }) => (isFilled ? theme.buttonBackground : TRANSPARENT)};
  align-items: center;
  justify-content:center;
  border-radius: 4px;
  width: ${(props) => props.width}
  height:${(props) => props.height}
  padding: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  borderRadius:20px;
`;
const Title = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ theme, isFilled }) => (isFilled ? theme.buttonTitle : theme.buttonUnfilledTitle)};
`;

const Button = ({ containerStyle, title, onPress, isFilled, disabled, width, height }) => {
  return (
    <Container
      style={containerStyle}
      onPress={onPress}
      isFilled={isFilled}
      disabled={disabled}
      width={width ? width : '100%'}
      height={height ? height : '50px'}
    >
      <Title isFilled={isFilled}>{title}</Title>
    </Container>
  );
};

Button.defaultProps = {
  isFilled: true,
};

Button.propTypes = {
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
