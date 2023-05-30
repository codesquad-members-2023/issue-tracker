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
import fetchData from '@utils/fetchSetData';
import { IssueDetailData } from '@customTypes/IssueDetailPage';

interface IssueCommentInputProps {
  setIssueDetailData: Dispatch<IssueDetailData>;
}

const IssueCommentInput = (props: IssueCommentInputProps) => {
  const { setIssueDetailData } = props;
  const [commentContent, setCommentContent] = useState('');
  const [showCharCount, setShowCharCount] = useState(true);
  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [commentFocused, setCommentFocused] = useState(false);
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

  const issueDetailData = useContext(issueDetailDataContext);
  const ISSUE_DETAIL_API = `${BASE_API}issues/${issueDetailData?.issue.issueId}`;

  const postComment = async () => {
    {
      const temp = await fetch(ISSUE_DETAIL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 3, // TODO(Jayden): 로그인한 유저의 id로 변경
          content: commentContent,
        }),
      });
      if (temp.ok) {
        fetchData(temp.url, setIssueDetailData);
      }
      setCommentContent('');
    }
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
          } p-4 placeholder-gray-600 outline-0`}
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
