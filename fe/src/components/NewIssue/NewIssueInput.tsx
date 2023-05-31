import React, { ChangeEvent, useState } from 'react';

import Button from '@common/Button';

const NewIssueInput: React.FC = () => {
  const [issueTitle, setIssueTitle] = useState('');
  const [issueComment, setIssueComment] = useState('');

  const [isTitleFocused, setTitleFocused] = useState(false);
  const [isCommentFocused, setCommentFocused] = useState(false);

  const isChangedTitle = isTitleFocused || issueTitle;
  const isChangedComment = isCommentFocused || issueComment;
  const commentBackgroundColor = `bg-gray-${isCommentFocused ? '90' : '200'}`;

  const handleTitleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIssueTitle(target.value);
  };

  const handleCommentChange = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setIssueComment(target.value);
  };

  const handleFocus = (element: string) => {
    element === 'title' ? setTitleFocused(true) : setCommentFocused(true);
  };

  const handleBlur = (element: string) => {
    element === 'title' ? setTitleFocused(false) : setCommentFocused(false);
  };

  return (
    <form className="mx-6 flex w-full flex-col">
      <label
        className={`mb-2 h-14 overflow-hidden rounded-[14px] bg-gray-200 px-6 ${
          isChangedTitle || 'py-3.5'
        }`}
      >
        <span className={`text-gray-600 text-${isChangedTitle ? 'sm' : 'md'}`}>
          제목
        </span>
        <input
          className="h-6 w-full bg-gray-200 text-gray-900 focus:outline-none"
          type="text"
          value={issueTitle}
          onChange={handleTitleChange}
          onFocus={() => handleFocus('title')}
          onBlur={() => handleBlur('title')}
        />
      </label>
      <label
        className={`h-[436px] overflow-hidden rounded-t-[14px] ${commentBackgroundColor} ${
          isCommentFocused && 'border border-b-0 border-gray-300'
        } px-6 py-3.5`}
      >
        <span
          className={`text-gray-600 text-${isChangedComment ? 'sm' : 'md'}`}
        >
          코멘트를 입력하세요
        </span>
        <textarea
          className={`h-[92%] w-full ${commentBackgroundColor} text-gray-900 focus:outline-none`}
          value={issueComment}
          onChange={handleCommentChange}
          onFocus={() => handleFocus('comment')}
          onBlur={() => handleBlur('comment')}
        ></textarea>
      </label>
      <label
        className={`h-[52px] w-full rounded-b-[14px] ${
          isCommentFocused && 'border border-solid border-gray-300'
        } ${commentBackgroundColor} pl-2 pr-4 pt-1`}
        style={{ borderTop: '1px dashed #D9DBE9' }}
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
      </label>
    </form>
  );
};

export default NewIssueInput;
