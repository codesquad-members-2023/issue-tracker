import { styled } from 'styled-components';
import Comment from '../Comment';
import CommentTextArea from '../CommentTextArea';

const CommentList = ({
  className,
  issue,
  comments,
  textAreaValue,
  handleTextAreaChange,
}) => {
  return (
    <CommentListBox className={className}>
      {issue.contents && (
        <Comment
          author={issue.user}
          createdDate={issue.createdDate}
          contents={issue.contents}
        />
      )}
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            createdDate={comment.createdData}
            contents={comment.contents}
          />
        );
      })}
      <CommentTextArea
        value={textAreaValue}
        onChange={handleTextAreaChange}
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
