import React, {
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import Button from '@common/Button';
import { issueDetailDataContext } from '../../pages/IssueDetailPage';
import { BASE_API } from '../../api';
import fetchSetData from '@utils/fetchSetData';
import { IssueDetailData } from '@customTypes/IssueDetailPage';
import { ReactComponent as Grip } from '@assets/grip.svg';
import useOutsideClick from '@hooks/useOutsideClick';

interface IssueCommentInputProps {
  setIssueDetailData: Dispatch<IssueDetailData>;
}

const IssueCommentInput = (props: IssueCommentInputProps) => {
  const { setIssueDetailData } = props;
  const [commentContent, setCommentContent] = useState('');
  const [showCharCount, setShowCharCount] = useState(true);
  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [commentFocused, setCommentFocused] = useState(false);
  const user = JSON.parse(localStorage.getItem('token') as string);

  useOutsideClick(commentTextAreaRef, () => {
    setCommentFocused(false);
  });

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

  const issueDetailData = useContext(issueDetailDataContext);
  const ISSUE_DETAIL_API = `${BASE_API}issues/${issueDetailData?.issue.issueId}`;

  const postComment = async () => {
    const temp = await fetch(ISSUE_DETAIL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id, // FIXME(Jayden): 로그인한 유저의 id로 변경
        content: commentContent,
      }),
    });
    if (temp.ok) {
      fetchSetData(temp.url, setIssueDetailData);
    }
    setCommentContent('');
  };

  return (
    <div className="flex w-full flex-col justify-between gap-y-6">
      <section
        className={`flex h-60 w-full flex-col justify-center rounded-2xl border ${
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
          className={`h-4/5 w-full rounded-t-2xl border-none ${
            commentFocused ? 'bg-white' : 'bg-gray-200'
          } p-4 placeholder-gray-600 outline-0 focus:outline-none`}
          ref={commentTextAreaRef}
          style={{ resize: 'none' }}
        />
        {showCharCount && (
          <div
            className={`flex justify-end text-sm text-gray-600 ${
              commentFocused ? 'bg-white' : 'bg-gray-200'
            } h-8`}
          >
            띄어쓰기 포함 {commentContent.length}자{<Grip />}
          </div>
        )}
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
      <div className="flex justify-end">
        <Button
          title="코멘트 작성"
          onClick={() => postComment()}
          size="Small"
          iconName="plus"
          fontSize="text-sm"
          condition={commentContent.length > 0 ? 'Enabled' : 'Disabled'}
          disabled={commentContent.length === 0}
        />
      </div>
    </div>
  );
};

export default IssueCommentInput;
