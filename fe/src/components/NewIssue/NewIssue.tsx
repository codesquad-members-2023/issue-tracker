import React from 'react';

import {
  LabelRow,
  MilestoneRow,
  UserRow,
} from '@components/IssueTable/IssueTable';
import NewIssueMain from './NewIssueMain';
import NewIssueNav from './NewIssueNav';

interface Props {
  user: UserRow;
  userList: UserRow[];
  labelList: LabelRow[];
  milestoneList: MilestoneRow[];
}

const NewIssue: React.FC<Props> = ({
  user,
  userList,
  labelList,
  milestoneList,
}) => {
  return (
    <div>
      <header className="text-2xl text-gray-900">새로운 이슈 작성</header>
      <NewIssueMain
        user={user}
        userList={userList}
        labelList={labelList}
        milestoneList={milestoneList}
      />
      <NewIssueNav onClick={() => onclick} />
    </div>
  );
};

export default NewIssue;
