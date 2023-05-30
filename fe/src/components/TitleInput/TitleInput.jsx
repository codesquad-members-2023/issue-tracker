import { css, styled } from 'styled-components';
import useInputFocus from '../../hooks/useInputFocus';

const TitleInput = ({
  name, value, onChange, placeholder,
}) => {
  const { isInputFocused, inputBoxRef, inputRef } = useInputFocus();

  return (
    <TitleBox ref={inputBoxRef} $isFocused={isInputFocused}>
      <LabelSpan $isBig={!(isInputFocused || value.length > 0)}>
        {placeholder}
      </LabelSpan>
      <Input
        ref={inputRef}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        $isHide={!(isInputFocused || value.length > 0)}
      />
    </TitleBox>
  );
};

export default TitleInput;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 16px;
  padding: 0 24px;
  height: 56px;
  ${({ $isFocused, theme }) => ($isFocused
    ? css`
          background-color: ${theme.color.neutralBackgroundStrong};
          border: 1px solid ${theme.color.neutralBorderActive};
        `
    : css`
          background-color: ${theme.color.neutralBackgroundBold};
        `)}
  cursor: text;
`;

const LabelSpan = styled.span`
  ${({ $isBig, theme }) => ($isBig
    ? css`
          color: ${theme.color.neutralTextWeak};
          font-size: ${theme.fontSize.M.size};
        `
    : css`
          color: ${theme.color.neutralText};
          font-size: ${theme.fontSize.S.size};
          font-weight: ${theme.fontWeight.regular};
        `)}
`;

const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSize.M.size};
  line-height: ${({ theme }) => theme.fontSize.M.lineHeight};
  color: ${({ theme }) => theme.color.neutralTextStrong};
  font-weight: 400;
  ${({ $isHide }) => ($isHide
    ? css`
          height: 0;
        `
    : css``)}
`;
