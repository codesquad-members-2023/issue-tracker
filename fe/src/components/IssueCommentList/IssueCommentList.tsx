import React from 'react';

import { CommentList } from '@customTypes/IssueDetailPage';
import IssueCommentItem from '@components/IssueCommentItem/IssueCommentItem';

interface CommentListProps {
  comments: CommentList;
}

const IssueCommentList = (props: CommentListProps) => {
  const { comments } = props;
  return (
    <ul className="flex h-full flex-col justify-between gap-6">
      {comments.map(comment => (
        <IssueCommentItem key={comment.commentId} comment={comment} />
      ))}
    </ul>
  );
};

export default IssueCommentList;
