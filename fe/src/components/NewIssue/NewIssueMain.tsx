import React from 'react';

import { UserRow, LabelRow, MilestoneRow } from '../IssueTable/IssueTable';
import Profile from '../../common/Profile/index';
import NewIssueInput from './NewIssueInput';
import NewIssueOptions, { Options } from './NewIssueOptions';

interface Props {
  user: UserRow;
  userList: UserRow[];
  labelList: LabelRow[];
  milestoneList: MilestoneRow[];
  issueStates: {
    issueTitle: string;
    setIssueTitle: React.Dispatch<React.SetStateAction<string>>;
    issueContent: string;
    setIssueContent: React.Dispatch<React.SetStateAction<string>>;
  };
  optionsState: {
    options: Options;
    setOptions: React.Dispatch<React.SetStateAction<Options>>;
  };
}

const NewIssueMain: React.FC<Props> = ({
  user,
  userList,
  labelList,
  milestoneList,
  issueStates,
  optionsState,
}) => {
  return (
    <div className="flex border-y border-gray-300 py-6">
      <div className="pt-3">
        <Profile url={user.profileUrl} />
      </div>
      <NewIssueInput issueStates={issueStates} />
      <NewIssueOptions
        userList={userList}
        labelList={labelList}
        milestoneList={milestoneList}
        optionsState={optionsState}
      />
    </div>
  );
};

export default NewIssueMain;
