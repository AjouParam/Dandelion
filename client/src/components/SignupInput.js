import React, { useState, forwardRef } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: column;
  margin: 16px 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text};
`;
// color: ${({ theme, isFocused }) => (isFocused ? theme.text : theme.label)};
const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  background-color: ${({ theme, editable }) => (editable ? theme.background : theme.inputDisabledBackground)};
  color: ${({ theme }) => theme.text};
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 2px;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.inputBorder};
`;

// border-color: ${({ theme, isFocused, isRight }) => {
//     if (isFocused) {
//       return theme.text;
//     } else {
//       return isRight ? theme.rightText : theme.errorText;
//     }
//   }};
//기존 TextInput props
// border: 1px solid ${({ theme, isFocused }) => (isFocused ? theme.text : theme.inputBorder)};
// border-radius: 4px;
// border-color: ${({ theme, isFocused, isRight }) => (isFocused ? theme.text : theme.errorText)};

const SignupInput = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      isPassword,
      returnKeyType,
      maxLength,
      disabled,
      width,
      height,
      isRight,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Container width={width ? width : '100%'} height={height ? height : '50px'}>
        <Label isFocused={isFocused} isRight={isRight}>
          {label}
        </Label>
        <StyledTextInput
          ref={ref}
          isFocused={isFocused}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none" // iOS only
          underlineColorAndroid="transparent" // Android only
          editable={!disabled}
          isRight={isRight}
        />
      </Container>
    );
  },
);

SignupInput.defaultProps = {
  onBlur: () => {},
  onChangeText: () => {},
  onSubmitEditing: () => {},
};

SignupInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(['done', 'next']),
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
};

export default SignupInput;
