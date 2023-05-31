import React from 'react';

import { UserRow, LabelRow, MilestoneRow } from '../IssueTable/IssueTable';
import Profile from '../../common/Profile/index';
import NewIssueInput from './NewIssueInput';
import NewIssueOptions from './NewIssueOptions';

interface Props {
  user: UserRow;
  userList: UserRow[];
  labelList: LabelRow[];
  milestoneList: MilestoneRow[];
}

const NewIssueMain: React.FC<Props> = ({
  user,
  userList,
  labelList,
  milestoneList,
}) => {
  return (
    <div className="flex border-y border-gray-300 py-6">
      <div className="pt-3">
        <Profile url={user.profileUrl} />
      </div>
      <NewIssueInput />
      <NewIssueOptions
        userList={userList}
        labelList={labelList}
        milestoneList={milestoneList}
      />
    </div>
  );
};

export default NewIssueMain;
