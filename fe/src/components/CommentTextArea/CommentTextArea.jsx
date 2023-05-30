import { useEffect, useState } from 'react';
import { styled, css } from 'styled-components';
import gripImage from '../../assets/grip.svg';
import fileIcon from '../../assets/fileIcon.svg';
import useInputFocus from '../../hooks/useInputFocus';

const CommentTextArea = ({
  name, value, onChange, placeholder, className,
}) => {
  const { isInputFocused, inputBoxRef, inputRef } = useInputFocus();
  const [isCountShow, setIsCountShow] = useState(false);

  useEffect(() => {
    setIsCountShow(false);
    let timerId;
    if (value.length > 0) timerId = setTimeout(() => setIsCountShow(true), 2000);

    return () => clearTimeout(timerId);
  }, [value]);

  return (
    <CommentBox
      ref={inputBoxRef}
      className={className}
      $isFocused={isInputFocused}
    >
      <PlaceHolderSpan $isBig={!(isInputFocused || value.length > 0)}>
        {placeholder}
      </PlaceHolderSpan>
      <TextArea ref={inputRef} name={name} value={value} onChange={onChange} />
      <BottomBox>
        <BottomBoxRow>
          {isCountShow && (
            <CountSpan>{`띄어쓰기 포함 ${value.length}자`}</CountSpan>
          )}
          <img
            src={gripImage}
            alt="grip"
            style={{ height: '16px', width: '16px' }}
          />
        </BottomBoxRow>
        <BottomBoxRow>
          <img src={fileIcon} alt="addFileButton" />
          <FileAttachInput type="file" />
        </BottomBoxRow>
      </BottomBox>
    </CommentBox>
  );
};

export default CommentTextArea;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 16px;
  padding: 16px;
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

const PlaceHolderSpan = styled.span`
  margin-bottom: 8px;

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

const TextArea = styled.textarea`
  flex-grow: 1;

  font-size: ${({ theme }) => theme.fontSize.M.size};
  line-height: ${({ theme }) => theme.fontSize.M.lineHeight};
  color: ${({ theme }) => theme.color.neutralTextStrong};
  font-weight: 400;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;

  height: 104px;
`;

const BottomBoxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;

  &:first-child {
    justify-content: end;
    border-bottom: 1px dashed ${({ theme }) => theme.color.neutralBorder};
  }

  &:last-child {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const CountSpan = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.S.size};
  line-height: ${({ theme }) => theme.fontSize.S.lineHeight};

  color: ${({ theme }) => theme.color.neutralTextWeak};
`;

// TODO: 스타일 바꾸기
const FileAttachInput = styled.input`
  > span {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.S.size};
    line-height: ${({ theme }) => theme.fontSize.S.lineHeight};
    color: ${({ theme }) => theme.color.neutralText};
  }
`;
