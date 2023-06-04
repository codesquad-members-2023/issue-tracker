import React, { useState, useRef } from 'react';
import { StyledInputContainer, StyledLabel, CountBox, UploadFileBox } from './style';
import Button from '@common/button';
import PaperClip from '@assets/icons/PaperClip.svg';

const TextInputArea = ({ issueFormInfoState: { description }, dispatch }) => {
  const [isFocus, setFocus] = useState(false);
  const selectFile = useRef(null);

  const inputTextCount = description.length;

  const fileUploadHandler = () => {
    selectFile.current.click();
  };

  const textAreaChangeHandler = ({ target: { value } }) => {
    dispatch({ type: 'SET_DESCRIPTION', payload: value });
  };

  const textAreaFocusHandler = () => {
    setFocus((prevState) => !prevState);
  };

  return (
    <StyledInputContainer
      onFocus={textAreaFocusHandler}
      onBlur={textAreaFocusHandler}
      focusState={isFocus}
    >
      <textarea id="textArea" value={description} onChange={textAreaChangeHandler} required />
      <StyledLabel htmlFor="textArea">코멘트를 입력하세요</StyledLabel>
      <CountBox>띄어쓰기 포함 {inputTextCount}자</CountBox>
      <UploadFileBox>
        <Button
          type="ghost"
          icon={PaperClip}
          title="파일 첨부하기"
          onClick={fileUploadHandler}
          size="small"
        />
        <input type="file" ref={selectFile} />
      </UploadFileBox>
    </StyledInputContainer>
  );
};

export default TextInputArea;
