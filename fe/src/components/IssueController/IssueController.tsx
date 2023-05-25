import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@common/Button';

const IssueController = () => {
  return (
    <div className="flex gap-x-2">
      <Button
        title="제목 편집"
        onClick={() => console.log('제목 편집')}
        size="Small"
        type="Outline"
        iconName="edit"
        fontSize="text-sm"
      />
      <Link to={'/'} className="h-fit">
        <Button
          title="이슈 닫기"
          onClick={() => console.log('이슈 닫기')}
          size="Small"
          type="Outline"
          iconName="archive"
          fontSize="text-sm"
        />
      </Link>
    </div>
  );
};

export default IssueController;
