import React, { Dispatch } from 'react';

import {
  CommentList,
  Issue,
  IssueDetailData,
} from '@customTypes/IssueDetailPage';
import IssueCommentItem from '@components/IssueCommentItem/IssueCommentItem';

interface CommentListProps {
  comments: CommentList;
  issue: Issue;
  setIssueDetailData: Dispatch<IssueDetailData>;
}

const IssueCommentList = (props: CommentListProps) => {
  const { comments, issue, setIssueDetailData } = props;

  // FIXME(Jayden): 추후 작성자 content(첫번째 comment)에 관한 로직 수정하기
  const writerComment = {
    commentId: issue.issueId,
    userName: issue.userName,
    content: issue.content,
    createdAt: issue.createdAt,
    profileUrl: issue.profileUrl,
    updateAt: '',
    userId: 0,
  };
  const totalComments = [writerComment, ...comments];
  return (
    <ul className="flex h-full flex-col justify-between gap-6">
      {totalComments.map(comment => (
        <IssueCommentItem
          key={comment.commentId}
          comment={comment}
          isWriterComment={comment.userName === issue.userName}
          setIssueDetailData={setIssueDetailData}
        />
      ))}
    </ul>
  );
};

export default IssueCommentList;
