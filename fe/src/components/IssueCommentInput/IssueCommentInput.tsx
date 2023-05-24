import React, { useState } from 'react';
import Button from '@common/Button';

const IssueCommentInput = () => {
  const [commentContent, setCommentContent] = useState('');
  const handleCommentContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentContent(e.target.value);
  };
  return (
    <div className="flex w-full flex-col justify-between gap-y-6">
      <section className="flex h-60 w-full flex-col justify-center border-gray-300">
        <textarea
          placeholder="코멘트를 입력하세요."
          value={commentContent}
          onChange={handleCommentContentChange}
          className="h-4/5 w-full rounded-t-2xl border-none bg-gray-200 p-4 placeholder-gray-600"
        />
        <section className="h-1/5 w-full rounded-b-2xl border-t border-dashed border-gray-300 bg-gray-200">
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
        />
      </div>
    </div>
  );
};

export default IssueCommentInput;
