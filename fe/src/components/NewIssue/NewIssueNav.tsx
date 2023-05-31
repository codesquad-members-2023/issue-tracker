import React from 'react';

import Button from '@common/Button';
import { ReactComponent as XSquare } from '@assets/xSquare.svg';

interface Props {
  onClick: () => void;
}

const NewIssueNav: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="mt-6 flex justify-end gap-x-8">
      <button className="flex items-center" onClick={onClick}>
        <XSquare className="mr-1" stroke="#4E4B66" />
        <span className="text-sm font-bold text-gray-700">작성 취소</span>
      </button>
      <Button title={'완료'} onClick={() => onClick} />
    </div>
  );
};

export default NewIssueNav;
