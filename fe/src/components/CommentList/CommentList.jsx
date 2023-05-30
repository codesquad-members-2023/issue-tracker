import { styled } from 'styled-components';
import { useState } from 'react';
import Comment from '../Comment/Comment';
import CommentTextArea from '../CommentTextArea/CommentTextArea';

const CommentList = ({ className }) => {
  const [value, setValue] = useState('');

  return (
    <CommentListBox className={className}>
      <Comment />
      <Comment />
      <CommentTextArea
        value={value}
        onChange={setValue}
        placeholder="코멘트를 입력하세요"
      />
    </CommentListBox>
  );
};

export default CommentList;

const CommentListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
