import React, { useState } from 'react';

import {
  LabelRow,
  MilestoneRow,
  UserRow,
} from '@components/IssueTable/IssueTable';
import { ReactComponent as CheveronDown } from '@assets/chevronDown.svg';
import Profile from '@common/Profile';
import FilterItem from '@common/FilterItem/FilterItem';

interface Props {
  userList: UserRow[];
  labelList: LabelRow[];
  milestoneList: MilestoneRow[];
}

const NewIssueOptions: React.FC<Props> = ({
  userList,
  labelList,
  milestoneList,
}) => {
  const [isAssigneeOpen, setAssigneeOpen] = useState(false);
  const [isLabelOpen, setLabelOpen] = useState(false);
  const [isMilestoneOpen, setMilestoneOpen] = useState(false);

  const [assignee, setAssignee] = useState(0);
  const [label, setLabel] = useState(0);
  const [milestone, setMilestone] = useState(0);

  const onItemClick = (id: number) => {
    setAssignee(id);
  };

  return (
    <div
      className="flex w-72 flex-col rounded-[14px] border border-gray-200 bg-gray-50"
      onClick={() => setAssigneeOpen(!isAssigneeOpen)}
    >
      <button className="h-1/3 border-b border-gray-300 py-8">
        <div className="relative mx-8 flex items-center">
          <div className="grow text-left font-bold text-gray-600">담당자</div>
          <CheveronDown stroke="#6E7191" />
          {isAssigneeOpen && (
            <div className="absolute top-9 w-full rounded-2xl border border-gray-300 bg-gray-50">
              {userList.map((user, i) => (
                <FilterItem
                  key={user.userId}
                  item={{
                    id: user.userId,
                    name: user.userName,
                    imgUrl: user.profileUrl,
                    width: 20,
                    height: 20,
                  }}
                  isFirst={i === 0}
                  onItemClick={onItemClick}
                />
              ))}
            </div>
          )}
        </div>
        {assignee ? (
          <div className="mx-8 mt-[18px] flex gap-x-2">
            <Profile url="" width={20} height={20} />
            <div className="text-sm font-medium text-gray-900">sam</div>
          </div>
        ) : null}
      </button>
      <button
        className="h-1/3 border-b border-gray-300 py-8"
        onClick={() => setLabelOpen(!isLabelOpen)}
      >
        <div className="mx-8 flex items-center">
          <div className="grow text-left font-bold text-gray-600">레이블</div>
          <CheveronDown stroke="#6E7191" />
        </div>
        {label && <div className="mx-8 mt-[18px] flex gap-x-2"></div>}
      </button>
      <button
        className="h-1/3 py-8"
        onClick={() => setMilestoneOpen(!isMilestoneOpen)}
      >
        <div className="mx-8 flex items-center">
          <div className="grow text-left font-bold text-gray-600">마일스톤</div>
          <CheveronDown stroke="#6E7191" />
        </div>
        {milestone && <div className="mx-8 mt-[18px] flex gap-x-2"></div>}
      </button>
    </div>
  );
};

export default NewIssueOptions;
