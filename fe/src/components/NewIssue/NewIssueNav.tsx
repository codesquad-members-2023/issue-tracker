import React from 'react';

import Button from '@common/Button';

interface Props {
  onClick: () => void;
}

const NewIssueNav: React.FC<Props> = ({ onClick }) => {
  return <Button title={'완료'} onClick={() => onClick} />;
};

export default NewIssueNav;
