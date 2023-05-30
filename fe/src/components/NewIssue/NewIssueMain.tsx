import React from 'react';

import { UserRow, LabelRow, MilestoneRow } from '../IssueTable/IssueTable';
import Profile from '../../common/Profile/index';

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
    <div className="my-6 border-y border-gray-300 py-6">
      <Profile url={user.profileUrl} />
      {/* <NewIssueInput />
      <NewIssueSidebar userList={userList} labelList={labelList} milestoneList={milestoneList} /> */}
    </div>
  );
};

export default NewIssueMain;
