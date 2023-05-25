import React from 'react';

import Button from '@common/Button';
import Profile from '@common/Profile';
import {
  Issue,
  AttachedLabelList,
  AttachedMilestone,
} from '@customTypes/IssueDetailPage';
import Label from '@common/Label';
import MilestoneProgressBar from '@components/MilestoneProgressBar/MilestoneProgressBar';

interface IssueSubInfoProps {
  issue: Issue;
  attachedLabels: AttachedLabelList;
  attachedMilestone: AttachedMilestone;
}

const IssueSubInfo = (props: IssueSubInfoProps) => {
  const { issue, attachedLabels, attachedMilestone } = props;
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
          <Profile url={issue.profileUrl} width={20} height={20} />
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
          {attachedLabels.map(label => (
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
            <MilestoneProgressBar progress={attachedMilestone?.progress} />
            <div>{attachedMilestone?.milestoneName}</div>
          </div>
        }
      </section>
    </div>
  );
};

export default IssueSubInfo;
