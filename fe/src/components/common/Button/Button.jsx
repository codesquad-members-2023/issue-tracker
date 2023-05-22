import styled from 'styled-components';

export const Button = ({
  children,
  buttonStatus,
  handleButton,
  buttonText,
  count,
  gap,
  width,
  fontWeight,
  fontSize,
  color,
  backgroundColor,
  border,
  borderRadius,
}) => {
  return (
    <ButtonBox
      type="button"
      onClick={handleButton}
      $buttonstatus={buttonStatus}
      gap={gap}
      width={width}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      backgroundcolor={backgroundColor}
      border={border}
      borderradius={borderRadius}
    >
      {children}
      {buttonText}
      {count >= 0 && `(${count})`}
    </ButtonBox>
  );
};

const ButtonBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ gap }) => `gap: ${gap || '10px'}`};

  ${({ width }) => `${width && `width: ${width}`}`};
  ${({ theme, fontWeight }) => `font-weight: ${theme.fontWeight[fontWeight] || theme.fontWeight.regular}`};
  ${({ theme, fontSize }) => `font-size: ${theme.fontSize[fontSize]?.size || theme.fontSize.M.size}`};
  ${({ theme, color }) => `color: ${theme.color[color] || theme.color.neutralText}`};
  ${({ theme, backgroundcolor }) => `${
    backgroundcolor && `background-color: ${theme.color[backgroundcolor]}`
  }`};
  ${({ border }) => `${border && `border: ${border}`}`};
  ${({ borderradius }) => `${borderradius && `border-radius: ${borderradius}`}`};
  cursor: pointer;
`;
