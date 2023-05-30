import React from 'react';

import Profile from '@common/Profile';
import Tag from '@common/Tag';
import { Comment } from '@customTypes/IssueDetailPage';
import { getTimeElapsed } from '@utils/getTimeElapsed';
import Button from '@common/Button';

interface IssueCommentItemProps {
  comment: Comment;
  isWriterComment: boolean;
}

const IssueCommentItem = (props: IssueCommentItemProps) => {
  const { comment, isWriterComment } = props;
  const { days, hours, minutes, seconds } = getTimeElapsed(comment.createdAt);
  return (
    <li key={comment.commentId}>
      <section className="flex items-center justify-between rounded-t-2xl border border-gray-300 bg-gray-100 px-6 py-4">
        <section className="flex gap-x-2">
          <Profile url={comment.profileUrl} />
          <span className="text-md text-gray-900">{comment.userName}</span>
          <span className="text-md text-gray-600">
            {days ? `${days}일 ` : ''}
            {hours ? `${hours}시간 ` : ''}
            {minutes ? `${minutes}분 ` : ''}
            {seconds}초 전
          </span>
        </section>
        <section className="flex items-center gap-x-4">
          {isWriterComment && (
            <>
              <Tag tagType="writer" writerName={comment.userName} />
              <Button
                title="편집"
                onClick={() => {
                  console.log('편집');
                }}
                isFlexible={true}
                size="Small"
                color="Gray"
                type="Ghost"
                condition="Press"
                iconName="edit"
                fontSize={'text-sm'}
              />
            </>
          )}
          <Button
            title="반응"
            onClick={() => {
              console.log('반응');
            }}
            isFlexible={true}
            size="Small"
            color="Gray"
            type="Ghost"
            condition="Press"
            iconName="smile"
            fontSize={'text-sm'}
          />
        </section>
      </section>
      <section className="rounded-b-2xl border-x border-b border-gray-300 bg-white px-6 py-4">
        {comment.content}
      </section>
    </li>
  );
};

export default IssueCommentItem;
