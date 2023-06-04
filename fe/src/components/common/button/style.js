import styled, { css } from 'styled-components';

const sizes = {
  large: {
    width: '240px',
    height: '56px',
    borderRadius: '16px',
    fontSize: '18px',
  },

  medium: {
    width: '120px',
    height: '40px',
    borderRadius: '11px',
    fontSize: '16px',
  },

  small: {
    height: '20px',
    fontSize: '12px',
  },
};

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
    'pointer-events': 'none',
  },
};

const sizeStyles = css`
  ${({ size }) =>
    size &&
    sizes[size] &&
    css`
      width: ${sizes[size].width};
      height: ${sizes[size].height};
      border-radius: ${sizes[size].borderRadius};
      font-size: ${sizes[size].fontSize};
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
      ${states[state]};
    `}
`;

const ButtonBox = styled.button`
  ${sizeStyles}
  ${typeStyles}
  ${stateStyles}
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export default ButtonBox;
