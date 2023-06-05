import styled from 'styled-components';

const GhostButton = ({
  size = 'M',
  gap = '10px',
  color,
  backgroundColor,
  hoverColor,
  onclick,
  children,
}) => {
  return (
    <GhostButtonBox
      gap={gap}
      size={size}
      color={color}
      backgroundcolor={backgroundColor}
      hovercolor={hoverColor}
      onClick={onclick}
    >
      {children}
    </GhostButtonBox>
  );
};

export default GhostButton;

const GhostButtonBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ gap }) => gap};
  border-radius: 11px;
  font-weight: 700;
  font-size: ${({ size }) => (size === 'M' ? '16px' : '12px')};
  color: ${({ theme, color }) => theme.color[color] || theme.color.neutralText};
  background-color: ${({ theme, backgroundColor }) => (backgroundColor ? theme.color[backgroundColor] : 'transparent')};
  cursor: pointer;

  &:hover {
    ${({ theme, hovercolor }) => `${hovercolor && `color: ${theme.color[hovercolor]}`}`};
    > svg {
      stroke: ${({ theme, hovercolor }) => theme.color[hovercolor] || theme.color.accentText};
    }
  }
  &:active {
    background-color: ${({ theme }) => theme.color.neutralBackgroundBold};
  }
`;
