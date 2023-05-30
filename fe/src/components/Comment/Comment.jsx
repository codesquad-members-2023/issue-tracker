import { styled } from 'styled-components';

const Comment = () => {
  return (
    <CommentBox>
      <CommentHeader>dd</CommentHeader>
      <CommentBody>dddd</CommentBody>
    </CommentBox>
  );
};

export default Comment;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;

  background: ${({ theme }) => theme.color.neutralBorder};
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-radius: 16px;
`;

const CommentHeader = styled.div`
  display: flex;
  
  padding: 16px 24px;
  border-radius: 16px 16px 0 0;
  background: ${({ theme }) => theme.color.neutralBackground};
`;

const CommentBody = styled.div`
  padding: 16px 24px;
  border-radius: 0 0 16px 16px;
  background: ${({ theme }) => theme.color.neutralBackgroundStrong};
`;
