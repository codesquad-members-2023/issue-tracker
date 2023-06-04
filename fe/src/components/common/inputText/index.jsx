import { react, useState, useEffect } from 'react';
import { InputBox } from './style';

const InputText = ({ title, setTitle }) => {
  const [isEdit, setEdit] = useState(false); // input 박스 클릭시 컴포넌트 스타일 변경

  const handleClick = () => {
    setEdit((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <InputBox editState={isEdit} onFocus={handleClick} onBlur={handleClick}>
      <label htmlFor="titleInput">제목</label>
      <input type="text" id="titleInput" value={title} onChange={handleInputChange} />
    </InputBox>
  );
};

export default InputText;
