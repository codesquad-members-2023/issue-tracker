import React, { useMemo, useState } from 'react';

import {
  LabelRow,
  MilestoneRow,
  UserRow,
} from '@components/IssueTable/IssueTable';
import { ReactComponent as CheveronDown } from '@assets/chevronDown.svg';
import Profile from '@common/Profile';
import FilterItem from '@common/FilterItem/FilterItem';
import Label from '@common/Label';
import MilestoneProgressBar from '@components/MilestoneProgressBar/MilestoneProgressBar';

export interface Options {
  assignee: number;
  label: number;
  milestone: number;
}

interface Props {
  userList: UserRow[];
  labelList: LabelRow[];
  milestoneList: MilestoneRow[];
  optionsState: {
    options: Options;
    setOptions: React.Dispatch<React.SetStateAction<Options>>;
  };
}

const NewIssueOptions: React.FC<Props> = ({
  userList,
  labelList,
  milestoneList,
  optionsState,
}) => {
  const { options, setOptions } = optionsState;

  const [isAssigneeOpen, setAssigneeOpen] = useState(false);
  const [isLabelOpen, setLabelOpen] = useState(false);
  const [isMilestoneOpen, setMilestoneOpen] = useState(false);

  const onItemClick = (option: keyof Options, id: number) => {
    if (option in options && options[option] === id) {
      setOptions({
        ...options,
        [option]: 0,
      });
    } else {
      setOptions({
        ...options,
        [option]: id,
      });
    }
  };

  const onOptionClick = (option: string) => {
    switch (option) {
      case 'assignee':
        return setAssigneeOpen(!isAssigneeOpen);
      case 'label':
        return setLabelOpen(!isLabelOpen);
      case 'milestone':
        return setMilestoneOpen(!isMilestoneOpen);
      default: {
        throw new Error('Invalid option');
      }
    }
  };

  const selectedOptionsInfo = useMemo(() => {
    const selectedAssignee = userList.find(
      user => user.userId === options.assignee
    );
    const selectedLabel = labelList.find(
      label => label.labelId === options.label
    );
    const selectedMilestone = milestoneList.find(
      milestone => milestone.milestoneId === options.milestone
    );

    return {
      selectedAssignee,
      selectedLabel,
      selectedMilestone,
    };
  }, [options, userList, labelList, milestoneList]);

  return (
    <div className="flex h-fit w-72 min-w-[288px] flex-col rounded-[14px] border border-gray-300 bg-gray-50">
      <button
        className="border-b border-gray-300 py-8"
        onClick={() => onOptionClick('assignee')}
      >
        <div className="relative mx-8 flex items-center">
          <div className="grow text-left font-bold text-gray-600">담당자</div>
          <CheveronDown stroke="#6E7191" />
          {isAssigneeOpen && userList.length > 0 && (
            <div className="absolute top-9 z-10 w-full rounded-2xl border border-gray-300 bg-gray-50">
              {userList.map((user, i) => (
                <FilterItem
                  key={user.userId}
                  item={{
                    id: user.userId,
                    name: user.userName,
                    isClicked: user.userId === options.assignee,
                    imgUrl: user.profileUrl,
                    width: 20,
                    height: 20,
                  }}
                  isFirst={i === 0}
                  onItemClick={id => onItemClick('assignee', id)}
                />
              ))}
            </div>
          )}
        </div>
        {options.assignee > 0 && (
          <div className="mx-8 mt-[18px] flex gap-x-2">
            <Profile
              url={selectedOptionsInfo.selectedAssignee?.profileUrl || ''}
              width={20}
              height={20}
            />
            <div className="text-sm font-medium text-gray-900">
              {selectedOptionsInfo.selectedAssignee?.userName}
            </div>
          </div>
        )}
      </button>
      <button
        className="border-b border-gray-300 py-8"
        onClick={() => onOptionClick('label')}
      >
        <div className="relative mx-8 flex items-center">
          <div className="grow text-left font-bold text-gray-600">레이블</div>
          <CheveronDown stroke="#6E7191" />
          {isLabelOpen && labelList.length > 0 && (
            <div className="absolute top-9 z-10 w-full rounded-2xl border border-gray-300 bg-gray-50">
              {labelList.map((label, i) => (
                <FilterItem
                  key={label.labelId}
                  item={{
                    id: label.labelId,
                    name: label.labelName,
                    isClicked: label.labelId === options.label,
                    backgroundColor: label.backgroundColor,
                    width: 20,
                    height: 20,
                  }}
                  isFirst={i === 0}
                  onItemClick={id => onItemClick('label', id)}
                />
              ))}
            </div>
          )}
        </div>
        {options.label > 0 && (
          <div className="mx-8 mt-[18px] flex gap-x-2">
            <Label
              labelName={selectedOptionsInfo.selectedLabel?.labelName}
              backgroundColor={
                selectedOptionsInfo.selectedLabel?.backgroundColor
              }
              fontColor={selectedOptionsInfo.selectedLabel?.fontColor}
            />
          </div>
        )}
      </button>
      <button className="py-8" onClick={() => onOptionClick('milestone')}>
        <div className="relative mx-8 flex items-center">
          <div className="grow text-left font-bold text-gray-600">마일스톤</div>
          <CheveronDown stroke="#6E7191" />
          {isMilestoneOpen && milestoneList.length > 0 && (
            <div className="absolute top-9 z-10 w-full rounded-2xl border border-gray-300 bg-gray-50">
              {milestoneList.map((milestone, i) => (
                <FilterItem
                  key={milestone.milestoneId}
                  item={{
                    id: milestone.milestoneId,
                    name: milestone.milestoneName,
                    isClicked: milestone.milestoneId === options.milestone,
                    width: 20,
                    height: 20,
                    isMultipleItemSelectable: false,
                  }}
                  isFirst={i === 0}
                  onItemClick={id => onItemClick('milestone', id)}
                />
              ))}
            </div>
          )}
        </div>
        {options.milestone > 0 && (
          <div className="mx-8 mt-[18px]">
            <MilestoneProgressBar
              progress={selectedOptionsInfo.selectedMilestone?.progress || 0}
            />
            <div className="mt-2 text-left text-sm font-medium text-gray-900">
              {selectedOptionsInfo.selectedMilestone?.milestoneName}
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default NewIssueOptions;
