import React, { useState } from 'react';

import Issue from './Issue';
import Button from '@common/Button';
import FilterList from '@components/FilterList/FilterList';
import { ElapseTime } from '@utils/getTimeElapsed';

export interface FilterOptions {
  page?: number;
  filter?: number;
  assignee?: number;
  label?: number;
  milestone?: number;
  writer?: number;
}

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
  labelList: LabelRow[];
  milestoneName?: string;
}

export interface UserRow {
  userId: number;
  userName: string;
  profileUrl: string;
}

export interface MilestoneRow {
  milestoneId: number;
  milestoneName: string;
  description?: string;
}

interface Props {
  issues: IssueRow[];
  users: UserRow[];
  labels: LabelRow[];
  milestones: MilestoneRow[];
  countOpenedIssues: number;
  countClosedIssues: number;
  status: boolean;
  filterOptions: FilterOptions;
  onStatusTabClick: (status: boolean) => void;
  updateFilterOption: (type: keyof FilterOptions, id: number) => void;
}

const IssueTable: React.FC<Props> = ({
  issues,
  users,
  labels,
  milestones,
  countOpenedIssues,
  countClosedIssues,
  status,
  filterOptions,
  updateFilterOption,
  onStatusTabClick,
}) => {
  const [openedFilterList, setOpenedFilterList] = useState('');

  const onItemClick = (type: keyof FilterOptions, id: number) => {
    updateFilterOption(type, id);
    setOpenedFilterList('');
  };

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
                onClick={() => setOpenedFilterList('assignee')}
                type="Ghost"
                color="Gray"
                hasDropDown={true}
                condition="Press"
                isFlexible={true}
              />
              <FilterList
                title="assignee"
                items={users.map(user => {
                  const { userId, userName, profileUrl } = user;
                  return {
                    id: userId,
                    name: userName,
                    isClicked:
                      filterOptions['assignee'] === userId ? true : false,
                    imgUrl: profileUrl,
                  };
                })}
                isOpen={openedFilterList === 'assignee' ? true : false}
                onItemClick={onItemClick}
              />
            </div>
            <div className="relative">
              <Button
                title="레이블"
                onClick={() => setOpenedFilterList('label')}
                type="Ghost"
                color="Gray"
                hasDropDown={true}
                condition="Press"
                isFlexible={true}
              />
              <FilterList
                title="label"
                items={labels.map(label => {
                  const { labelId, labelName, backgroundColor } = label;
                  return {
                    id: labelId,
                    name: labelName,
                    isClicked:
                      filterOptions['label'] === labelId ? true : false,
                    backgroundColor: backgroundColor,
                  };
                })}
                isOpen={openedFilterList === 'label' ? true : false}
                onItemClick={onItemClick}
              />
            </div>
            <div className="relative">
              <Button
                title="마일스톤"
                onClick={() => setOpenedFilterList('milestone')}
                type="Ghost"
                color="Gray"
                hasDropDown={true}
                condition="Press"
                isFlexible={true}
              />
              <FilterList
                title="milestone"
                items={milestones.map(milestone => {
                  const { milestoneId, milestoneName } = milestone;
                  return {
                    id: milestoneId,
                    name: milestoneName,
                    isClicked:
                      filterOptions['milestone'] === milestoneId ? true : false,
                  };
                })}
                isOpen={openedFilterList === 'milestone' ? true : false}
                onItemClick={onItemClick}
              />
            </div>
            <div className="relative">
              <Button
                title="작성자"
                onClick={() => setOpenedFilterList('writer')}
                type="Ghost"
                color="Gray"
                hasDropDown={true}
                condition="Press"
                isFlexible={true}
              />
              <FilterList
                title="writer"
                items={users.map(user => {
                  const { userId, userName, profileUrl } = user;
                  return {
                    id: userId,
                    name: userName,
                    isClicked:
                      filterOptions['writer'] === userId ? true : false,
                    imgUrl: profileUrl,
                  };
                })}
                isOpen={openedFilterList === 'writer' ? true : false}
                onItemClick={onItemClick}
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
