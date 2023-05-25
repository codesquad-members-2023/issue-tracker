import React from 'react';

import Button from '@common/Button';
import Profile from '@common/Profile';
import { Issue, LabelList, Milestone } from '@customTypes/IssueDetailPage';
import Label from '@common/Label';
import MilestoneProgressBar from '@components/MilestoneProgressBar/MilestoneProgressBar';

const TEMP_PROFILE_URL =
  'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';

interface IssueSubInfoProps {
  issue: Issue;
  labels: LabelList;
  milestone: Milestone;
}

const IssueSubInfo = (props: IssueSubInfoProps) => {
  const { issue, labels, milestone } = props;
  return (
    <div className="h-fit w-fit rounded-2xl border border-gray-300">
      <section className="flex flex-col justify-between border-b border-b-gray-300 p-8">
        <Button
          title="담당자"
          onClick={() => console.log('이슈 상세 담당자')}
          hasDropDown={true}
          isFlexible={true}
          type="Ghost"
          color="Gray"
          condition="Press"
          gap="gap-x-40"
        />
        <div className="flex gap-x-2">
          <Profile url={TEMP_PROFILE_URL} width={20} height={20} />
          <span className="text-gray-900">{issue.userName}</span>
        </div>
      </section>
      <section className="flex flex-col justify-between border-b border-b-gray-300 p-8">
        <Button
          title="레이블"
          onClick={() => console.log('이슈 상세 레이블')}
          hasDropDown={true}
          isFlexible={true}
          type="Ghost"
          color="Gray"
          condition="Press"
          gap="gap-x-40"
        />
        <div className="flex w-fit flex-wrap gap-y-1">
          {labels.map(label => (
            <Label
              key={label.labelId}
              labelName={label.labelName}
              backgroundColor={label.backgroundColor}
              fontColor={label.fontColor}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col justify-between p-8">
        <Button
          title="마일스톤"
          onClick={() => console.log('이슈 상세 마일스톤')}
          hasDropDown={true}
          isFlexible={true}
          type="Ghost"
          color="Gray"
          condition="Press"
          gap="gap-x-40"
        />
        {
          <div className="flex w-full flex-wrap gap-y-2">
            <MilestoneProgressBar progress={milestone?.progress} />
            <div>{milestone.milestoneName}</div>
          </div>
        }
      </section>
    </div>
  );
};

export default IssueSubInfo;
