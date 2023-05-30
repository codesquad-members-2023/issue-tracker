// TODO: Lint 속성 점검 필요
/* eslint-disable no-use-before-define */
import styled, { css } from 'styled-components';

export const Button = ({
  type,
  size,
  gap,
  color,
  backgroundColor,
  hoverColor,
  onclick,
  children,
}) => {
  const buttonTypes = {
    containerButton,
    outlineButton,
    ghostButton,
  };

  const ButtonBox = buttonTypes[type];

  return (
    <ButtonBox
      type={type}
      gap={gap}
      size={size}
      color={color}
      backgroundcolor={backgroundColor}
      hovercolor={hoverColor}
      onClick={onclick}
    >
      {children}
    </ButtonBox>
  );
};

const ButtonBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ gap }) => `gap: ${gap || '10px'}`};

  ${({ type, size }) => {
    if (size === 'XL') {
      return css`
        ${type !== 'ghostButton' && 'width: 320px;'}
        height: 56px;
        font-size: 18px;
      `;
    }
    if (size === 'L') {
      return css`
        ${type !== 'ghostButton' && 'width: 240px;'}
        height: 56px;
        font-size: 18px;
      `;
    }
    if (size === 'M') {
      return css`
        ${type !== 'ghostButton' && 'width: 160px;' && 'height: 40px;'}
        font-size: 16px;
      `;
    }
    if (size === 'S') {
      return css`
        ${type !== 'ghostButton' && 'width: 120px;' && 'height: 40px;'}
        font-size: 12px;
      `;
    }

    return '';
  }}

  border-radius: 11px;
  font-weight: 700;
  ${({ theme, color }) => `color: ${theme.color[color] || theme.color.neutralText}`};
  cursor: pointer;

  &:hover {
    ${({ theme, hovercolor }) => `${hovercolor && `color: ${theme.color[hovercolor]}`}`};
    > svg {
      stroke: ${({ theme, hovercolor }) => theme.color[hovercolor] || theme.color.accentText};
    }
  }
`;

const containerButton = styled(ButtonBox)`
  padding: 0px 16px;
  border: none;
  border-radius: 11px;
  ${({ theme, backgroundcolor }) => `${
    backgroundcolor && `background-color: ${theme.color[backgroundcolor]}`
  }`};
`;

const outlineButton = styled(ButtonBox)`
  padding: 0px 16px;
  background-color: transparent;
  border-radius: 11px;
  border: 1px solid ${({ theme }) => theme.color.accentBorderWeak};
`;

const ghostButton = styled(ButtonBox)`
  ${({ theme, backgroundcolor }) => `${
    backgroundcolor && `background-color: ${theme.color[backgroundcolor]}`
  }`};

  &:active {
    background-color: ${({ theme }) => theme.color.neutralBackgroundBold};
  }
`;
