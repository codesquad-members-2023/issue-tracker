import React from 'react';

import { CommentList, Issue } from '@customTypes/IssueDetailPage';
import IssueCommentItem from '@components/IssueCommentItem/IssueCommentItem';

interface CommentListProps {
  comments: CommentList;
  issue: Issue;
}

const IssueCommentList = (props: CommentListProps) => {
  const { comments, issue } = props;
  const { userName, profileUrl } = issue;
  return (
    <ul className="flex h-full flex-col justify-between gap-6">
      {comments.map(comment => (
        <IssueCommentItem
          key={comment.commentId}
          comment={comment}
          isWriterComment={comment.userName === userName}
        />
      ))}
    </ul>
  );
};

export default IssueCommentList;
