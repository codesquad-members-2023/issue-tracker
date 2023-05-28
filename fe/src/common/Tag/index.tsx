import React from 'react';

import { ReactComponent as AlertCircle } from '@assets/alertCircle.svg';
import { ReactComponent as Archive } from '@assets/archive.svg';

type TagType = 'openClose' | 'writer';

interface TagProps {
  tagType: TagType;
  writerName?: string;
  isOpen?: boolean;
}

// FIXME(Jayden): Tag 컴포넌트 로직 단순화
const Tag = ({ tagType, writerName, isOpen }: TagProps) => {
  return (
    <>
      {tagType === 'openClose' ? (
        isOpen ? (
          <div className="flex h-8 w-fit items-center justify-center gap-x-1 rounded-[50px] bg-blue px-4">
            <AlertCircle stroke="#FEFEFE" />
            <span className="text-sm text-gray-50">열린 이슈</span>
          </div>
        ) : (
          <div className="flex h-8 w-fit items-center justify-center gap-x-1 rounded-[50px] bg-navy px-4">
            <Archive stroke="#FEFEFE" />
            <span className="text-sm text-gray-50">닫힌 이슈</span>
          </div>
        )
      ) : (
        <div className="flex h-8 w-fit items-center justify-center gap-x-1 rounded-[50px] border border-gray-300 bg-gray-100 px-4 text-gray-600">
          {writerName}
        </div>
      )}
    </>
  );
};

export default Tag;
