import { css, styled } from 'styled-components';
import useInputFocus from '../../hooks/useInputFocus';

const TitleEditInput = ({ value, onChange }) => {
  const { isInputFocused, inputBoxRef, inputRef } = useInputFocus();

  return (
    <TitleEditBox ref={inputBoxRef} $isFocused={isInputFocused}>
      <span>제목</span>
      <input ref={inputRef} type="text" value={value} onChange={onChange} />
    </TitleEditBox>
  );
};

export default TitleEditInput;

const TitleEditBox = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 0px 24px;
  gap: 8px;

  height: 40px;
  border-radius: 11px;
  ${({ $isFocused }) => ($isFocused
    ? css`
          background: ${({ theme }) => theme.color.neutralBackgroundStrong};
          border: 1px solid ${({ theme }) => theme.color.neutralBorderActive};
        `
    : css`
       background: ${({ theme }) => theme.color.neutralBackgroundBold};
    `)}

  > span {
    font-size: ${({ theme }) => theme.fontSize.S.size};
    color: ${({ theme }) => theme.color.neutralText};
  }

  > input {
    font-size: ${({ theme }) => theme.fontSize.M.size};
    color: ${({ theme }) => theme.color.neutralTextStrong};
  }
`;
