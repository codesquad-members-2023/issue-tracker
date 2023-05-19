import styled, { css } from 'styled-components';
import React from 'react';

const sizes = {
  large: {
    width: '240px',
    height: '56px',
    borderRadius: '16px',
  },

  medium: {
    width: '120px',
    height: '40px',
    borderRadius: '11px',
  },
};

// const sizeStyles = css`
//   ${({ size }) => css`
//     width: ${sizes[size].width};
//     height: ${sizes[size].height};
//     border-radius: ${sizes[size].borderRadius};
//   `}
// `;

const types = {
  container: {
    backgroundColor: '#007AFF',
    color: 'white',
  },
  outline: {
    outline: 'solid 1px #007AFF',
    backgroundColor: 'transparent;',
    color: '#007AFF',
  },
  ghost: {
    border: 'none',
    backgroundColor: 'transparent;',
    color: 'black',
  },
};

// const typeStyles = css`
//   ${({ type }) => css`
//     color: ${types[type].color};
//     background-color: ${types[type].backgroundColor};
//     outline: ${types[type].outline};
//   `}
// `;

const states = {
  default: {
    opacity: '1',
  },

  hover: {
    opacity: '0.8',
  },
  press: {
    opacity: '0.64',
  },
  disabled: {
    opacity: '0.32',
  },
};

// const stateStyles = css`
//   ${({ state }) => css`
//     opacity: ${states[state].opacity};
//   `}
// `;

const sizeStyles = css`
  ${({ size }) =>
    size &&
    sizes[size] &&
    css`
      width: ${sizes[size].width};
      height: ${sizes[size].height};
      border-radius: ${sizes[size].borderRadius};
    `}
`;

const typeStyles = css`
  ${({ type }) =>
    type &&
    types[type] &&
    css`
      color: ${types[type].color};
      background-color: ${types[type].backgroundColor};
      outline: ${types[type].outline};
    `}
`;

const stateStyles = css`
  ${({ state }) =>
    state &&
    states[state] &&
    css`
      opacity: ${states[state].opacity};
    `}
`;

const StyledButton = styled.button`
  ${sizeStyles}
  ${typeStyles}
  ${stateStyles}
`;

const Button = ({ children, flexible, type, elementPattern, state, size, ...rest }) => {
  return (
    <StyledButton
      flexible={flexible}
      type={type}
      elementPattern={elementPattern}
      state={state}
      size={size}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
