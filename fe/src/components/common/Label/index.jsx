import styled, { css } from 'styled-components';

export const Label = ({ name, textColor, backgroundColor }) => {
  return (
    <LableBox
      name={name}
      textcolor={textColor}
      backgroundcolor={backgroundColor}
    >
      {name}
    </LableBox>
  );
};

const LableBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 24px;
  font-weight: 500;
  font-size: 12px;
  color: ${(p) => p.textcolor};
  background-color: ${(p) => p.backgroundcolor};
  border-radius: 50px;

  ${({ name }) => {
    const nameLength = name.length;
    const minWidth = 32;

    if (nameLength <= 4) {
      return css`
        width: ${minWidth}px;
        padding-left: 16px;
        padding-right: 16px;
      `;
    }
    const dynamicWidth = nameLength * 8 + 16;
    return css`
      width: ${dynamicWidth}px;
      padding-left: 16px;
      padding-right: 16px;
    `;
  }}
`;
