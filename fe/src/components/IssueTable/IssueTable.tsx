import React, { useState } from 'react';

import Issue from './Issue';
import Button from '@common/Button';
import FilterList from '@components/FilterList/FilterList';
import { DropdownItems } from '../../pages/MainPage';
import { ElapseTime } from '@utils/getTimeElapsed';

export type FilterOptions = {
  filter: string;
  assignee: string;
  label: string;
  milestone: string;
  writer: string;
};

export interface LabelRow {
  labelId: number;
  labelName: string;
  backgroundColor: string;
  fontColor: string;
}

export interface IssueRow {
  issueId: number;
  title: string;
  content?: string;
  userName: string;
  profileUrl: string;
  isOpen: boolean;
  elapseTime: ElapseTime;
  milestoneName?: string;
  labelList: LabelRow[];
}

export interface UserRow {
  userId: number;
  userName: string;
  profileUrl: string;
}
export interface MilestoneRow {
  milestoneId: number;
  description?: string;
  milestoneName: string;
}

interface Props {
  issues: IssueRow[];
  users: UserRow[];
  labels: LabelRow[];
  milestones: MilestoneRow[];
  countOpenedIssues: number;
  countClosedIssues: number;
  status: boolean;
  onStatusTabClick: (status: boolean) => void;
  filterIssues: (filterType: string, filterItem: string) => void;
}

const IssueTable: React.FC<Props> = ({
  issues,
  users,
  labels,
  milestones,
  countOpenedIssues,
  countClosedIssues,
  status,
  onStatusTabClick,
}) => {
  const [openedFilter, setOpenedFilter] = useState('');

  return (
    <div className="w-160 box-border rounded-2xl border">
      <div className="box-border rounded-t-2xl bg-gray-100 px-8 py-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="mr-8">
              <input
                type="checkbox"
                checked={false}
                onChange={() => console.log('check')}
              />
            </div>
            <div className="flex gap-x-3">
              <Button
                title={`열린 이슈(${countOpenedIssues || 0})`}
                type="Ghost"
                color="Gray"
                size="Small"
                iconName="alertcircle"
                condition={status ? 'Enabled' : 'Press'}
                onClick={() => onStatusTabClick(true)}
              />
              <Button
                title={`닫힌 이슈(${countClosedIssues || 0})`}
                type="Ghost"
                color="Gray"
                size="Small"
                iconName="archive"
                condition={!status ? 'Enabled' : 'Press'}
                onClick={() => onStatusTabClick(false)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-6">
            <div className="relative">
              <Button
                title="담당자"
                onClick={() => setOpenedFilter('assignee')}
                type="Ghost"
                color="Gray"
                hasDropDown={true}
                condition="Press"
                isFlexible={true}
              />
              <FilterList
                title="담당자"
                items={users.map(user => {
                  return {
                    id: user.userId,
                    name: user.userName,
                    isChecked: false,
                    imgUrl: user.profileUrl,
                  };
                })}
                isOpen={openedFilter === 'assignee' ? true : false}
              />
            </div>
            <div className="relative">
              <Button
                title="레이블"
                onClick={() => setOpenedFilter('label')}
                type="Ghost"
                color="Gray"
                hasDropDown={true}
                condition="Press"
                isFlexible={true}
              />
              <FilterList
                title="레이블"
                items={labels.map(label => {
                  return {
                    id: label.labelId,
                    name: label.labelName,
                    isChecked: false,
                    backgroundColor: label.backgroundColor,
                    fontColor: label.fontColor,
                  };
                })}
                isOpen={openedFilter === 'label' ? true : false}
              />
            </div>
            <div className="relative">
              <Button
                title="마일스톤"
                onClick={() => setOpenedFilter('milestone')}
                type="Ghost"
                color="Gray"
                hasDropDown={true}
                condition="Press"
                isFlexible={true}
              />
              <FilterList
                title="마일스톤"
                items={milestones.map(milestone => {
                  return {
                    id: milestone.milestoneId,
                    name: milestone.milestoneName,
                    isChecked: false,
                  };
                })}
                isOpen={openedFilter === 'milestone' ? true : false}
              />
            </div>
            <div className="relative">
              <Button
                title="작성자"
                onClick={() => setOpenedFilter('writer')}
                type="Ghost"
                color="Gray"
                hasDropDown={true}
                condition="Press"
                isFlexible={true}
              />
              <FilterList
                title="작성자"
                items={users.map(user => {
                  return {
                    id: user.userId,
                    name: user.userName,
                    isChecked: false,
                    imgUrl: user.profileUrl,
                  };
                })}
                isOpen={openedFilter === 'assignee' ? true : false}
              />
            </div>
          </div>
        </div>
      </div>
      {issues.length ? (
        issues.map(issue => {
          const {
            issueId,
            title,
            userName,
            profileUrl,
            isOpen,
            elapseTime,
            milestoneName,
            labelList,
          } = issue;
          return (
            <Issue
              key={issueId}
              issueId={issueId}
              title={title}
              userName={userName}
              profileUrl={profileUrl}
              isOpen={isOpen}
              elapseTime={elapseTime}
              milestoneName={milestoneName}
              labelList={labelList}
              onIssueTitleClick={() => console.log('')}
            />
          );
        })
      ) : (
        <div className="my-5 text-center text-neutral-weak">
          검색과 일치하는 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default IssueTable;
