import React, { useState, useRef } from 'react';
import { StyledInputContainer, StyledLabel, CountBox, UploadFileBox } from './style';
import Button from '@common/button';
import PaperClip from '@assets/icons/PaperClip.svg';

const TextArea = () => {
  const [inputCount, setInputCount] = useState(0);
  const [isFocus, setFocus] = useState(false);
  const selectFile = useRef(null);

  const onInputHandler = (e) => {
    setInputCount(e.target.value.length);
  };

  const handleUpload = () => {
    selectFile.current.click();
  };

  const handleFocus = () => {
    setFocus((prevState) => !prevState);
  };

  return (
    <StyledInputContainer onFocus={handleFocus} onBlur={handleFocus} focusState={isFocus}>
      <textarea required onChange={onInputHandler} />
      <StyledLabel>코멘트를 입력하세요</StyledLabel>
      <CountBox>띄어쓰기 포함 {inputCount}자</CountBox>
      <UploadFileBox>
        <Button
          type="ghost"
          icon={PaperClip}
          title="파일 첨부하기"
          onClick={handleUpload}
          size="small"
        />
        <input type="file" ref={selectFile} />
      </UploadFileBox>
    </StyledInputContainer>
  );
};

export default TextArea;
