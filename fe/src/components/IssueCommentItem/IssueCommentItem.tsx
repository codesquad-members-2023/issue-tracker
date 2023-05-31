import React, {
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import Profile from '@common/Profile';
import Tag from '@common/Tag';
import { Comment, IssueDetailData } from '@customTypes/IssueDetailPage';
import { getTimeElapsed } from '@utils/getTimeElapsed';
import Button from '@common/Button';
import { BASE_API } from '../../api';
import { issueDetailDataContext } from '../../pages/IssueDetailPage';
import fetchSetData from '@utils/fetchSetData';

interface IssueCommentItemProps {
  comment: Comment;
  isWriterComment: boolean;
  setIssueDetailData: Dispatch<IssueDetailData>;
}

const IssueCommentItem = (props: IssueCommentItemProps) => {
  const { comment, isWriterComment, setIssueDetailData } = props;
  const { days, hours, minutes, seconds } = getTimeElapsed(comment.createdAt);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [showCharCount, setShowCharCount] = useState(true);
  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [commentFocused, setCommentFocused] = useState(false);
  const issueDetailData = useContext(issueDetailDataContext);
  function clickOnOutside(ref: any) {
    useEffect(() => {
      function handleClickOutside(e: Event): void {
        if (ref.current && !ref.current.contains(e.target)) {
          setCommentFocused(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  clickOnOutside(commentTextAreaRef);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowCharCount(false);
      }, 2000);
    };
    handleTyping();
    return () => {
      clearTimeout(timer);
    };
  }, [commentContent]);
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
                  setIsEdit(!isEdit);
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
      {!isEdit && (
        <section className="rounded-b-2xl border-x border-b border-gray-300 bg-white px-6 py-4">
          {comment.content}
        </section>
      )}
      {isEdit && (
        <section className="flex flex-col gap-y-6">
          <section
            className={`flex h-60 w-full flex-col justify-center rounded-b-2xl border ${
              commentFocused ? 'border-gray-900' : 'border-gray-300'
            }`}
          >
            <textarea
              placeholder="코멘트를 입력하세요."
              value={commentContent}
              onChange={e => {
                setCommentContent(e.target.value);
                setShowCharCount(true);
              }}
              onFocus={() => setCommentFocused(true)}
              className={`h-4/5 w-full  border-none ${
                commentFocused ? 'bg-white' : 'bg-gray-200'
              } p-4 placeholder-gray-600 outline-0 focus:outline-none`}
              ref={commentTextAreaRef}
            />
            <div
              className={`flex justify-end ${
                commentFocused ? 'bg-white' : 'bg-gray-200'
              } h-8`}
            >
              {showCharCount && `띄어쓰기 포함 ${commentContent.length}자`}
            </div>
            <section
              className={`h-1/5 w-full rounded-b-2xl border-t border-dashed border-gray-300 ${
                commentFocused ? 'bg-white' : 'bg-gray-200'
              }`}
            >
              <Button
                title="파일 첨부하기"
                onClick={() => {
                  console.log('파일 첨부하기');
                }}
                size="Small"
                color="Gray"
                type="Ghost"
                condition="Press"
                iconName="paperclip"
                fontSize="text-sm"
              />
            </section>
          </section>
          <div className="flex justify-end gap-x-2">
            <Button
              title="편집 취소"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
              size="Small"
              iconName="xsquare"
              fontSize="text-sm"
              condition={commentContent.length > 0 ? 'Enabled' : 'Disabled'}
              disabled={commentContent.length === 0}
              type="Outline"
            />
            <Button
              title="편집 완료"
              onClick={async () => {
                // TODO(Jayden): api 수정 후, 첫번째 코멘트 patch 로직 작성
                const temp = await fetch(
                  `${BASE_API}issues/${issueDetailData?.issue.issueId}/comments/${comment.commentId}`,
                  {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userId: comment.userId,
                      content: commentContent,
                    }),
                  }
                );

                if (temp.ok) {
                  fetchSetData(
                    `${BASE_API}issues/${issueDetailData?.issue.issueId}`,
                    setIssueDetailData
                  );
                }
                setIsEdit(!isEdit);
              }}
              size="Small"
              iconName="edit"
              fontSize="text-sm"
              condition={commentContent.length > 0 ? 'Enabled' : 'Disabled'}
              disabled={commentContent.length === 0}
            />
          </div>
        </section>
      )}
    </li>
  );
};

export default IssueCommentItem;
