import React from 'react';

const NewIssueInput: React.FC = () => {
  return (
    <form className="flex w-full flex-col ">
      <label className="mb-2	h-14 overflow-hidden rounded-[14px] bg-gray-200 px-6 py-3.5">
        <span className="text-gray-600">제목</span>
        <input
          className="w-full bg-gray-200 text-gray-900"
          type="text"
          value=""
          onChange={() => console.log('input')}
        />
      </label>
      <label className="h-[436px] overflow-hidden	rounded-t-[14px] bg-gray-200 px-6 py-3.5">
        <span className="text-gray-600">코멘트를 입력하세요</span>
        <textarea
          className="w-full bg-gray-200 text-gray-900"
          value=""
          onChange={() => console.log('input2')}
        ></textarea>
      </label>
      <label className="border-t border-dashed border-gray-300 bg-gray-200 px-6">
        <input
          className="h-[52px] w-full rounded-b-[14px] bg-gray-200 py-4"
          type="file"
        />
      </label>
    </form>
  );
};

export default NewIssueInput;
