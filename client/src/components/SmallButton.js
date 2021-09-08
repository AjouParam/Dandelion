import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const TRANSPARENT = 'transparent';

const Container = styled.TouchableOpacity`
  background-color: ${TRANSPARENT};
  align-items: center;
  justify-content:center;
  border-radius: 4px;
  width: ${(props) => props.width}
  height:${(props) => props.height}
  padding: 10px;
  borderRadius:20px;
  border:1px solid ${({ theme, disabled, isFilled }) =>
    disabled ? theme.disabledBorder : isFilled ? theme.abledBorder : theme.disabledBorder};
`;
const Title = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ theme, disabled, isFilled }) =>
    disabled ? theme.disabledText : isFilled ? theme.abledText : theme.disabledText};
`;

const SmallButton = ({ containerStyle, title, onPress, isFilled, disabled, width, height, fontColor = null }) => {
  return (
    <Container
      style={containerStyle}
      onPress={onPress}
      isFilled={isFilled}
      disabled={disabled}
      width={width ? width : '100%'}
      height={height ? height : '50px'}
    >
      <Title isFilled={isFilled} disabled={disabled} fontColor={fontColor}>
        {title}
      </Title>
    </Container>
  );
};

SmallButton.defaultProps = {
  isFilled: true,
};

SmallButton.propTypes = {
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SmallButton;
