import React, { useEffect, useState } from 'react';
import Button from '@common/Button';

const IssueCommentInput = () => {
  const [commentContent, setCommentContent] = useState('');
  const [showCharCount, setShowCharCount] = useState(true);
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
  const handleCommentContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentContent(e.target.value);
  };
  const commentTextAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const [commentFocused, setCommentFocused] = useState(false);
  function clickOnOutside(ref: any) {
    useEffect(() => {
      function handleClickOutside(e: any): void {
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
          }`}
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
          onClick={() => console.log('코멘트 작성')}
          size="Small"
          iconName="plus"
          fontSize="text-sm"
          condition={commentContent.length > 0 ? 'Enabled' : 'Disabled'}
        />
      </div>
    </div>
  );
};

export default IssueCommentInput;
