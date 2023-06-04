import React, { useState } from 'react';
import { TitleInputBox, TitleInputLabel } from './style';

const TitleInputArea = ({ issueFormInfoState: { title }, dispatch }) => {
  const [isFocus, setFocus] = useState(false);

  const textAreaChangeHandler = ({ target: { value } }) => {
    dispatch({ type: 'SET_TITLE', payload: value });
  };
  const titleInputFocusHandler = () => {
    setFocus((prevState) => !prevState);
  };
  return (
    <TitleInputBox
      onFocus={titleInputFocusHandler}
      onBlur={titleInputFocusHandler}
      focusState={isFocus}
    >
      <input value={title} onChange={textAreaChangeHandler} required />
      <TitleInputLabel>제목</TitleInputLabel>
    </TitleInputBox>
  );
};

export default TitleInputArea;
