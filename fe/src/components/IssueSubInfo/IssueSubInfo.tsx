import React, { useContext, useState } from 'react';

import Button from '@common/Button';
import Profile from '@common/Profile';
import {
  Issue,
  AttachedLabelList,
  AttachedMilestone,
} from '@customTypes/IssueDetailPage';
import Label from '@common/Label';
import MilestoneProgressBar from '@components/MilestoneProgressBar/MilestoneProgressBar';
import { issueDetailDataContext } from '../../pages/IssueDetailPage';
import FilterItem from '@common/FilterItem/FilterItem';

interface IssueSubInfoProps {
  issue: Issue;
  attachedLabels: AttachedLabelList;
  attachedMilestone: AttachedMilestone;
}

const IssueSubInfo = (props: IssueSubInfoProps) => {
  const { issue, attachedLabels, attachedMilestone } = props;
  const issueDetailData = useContext(issueDetailDataContext);
  const [isDropDownOpen, setIsDropDownOpen] = useState({
    assignee: false,
    label: false,
    milestone: false,
  });
  return (
    <div className="h-fit w-fit rounded-2xl border border-gray-300">
      <section className="relative flex flex-col justify-between border-b border-b-gray-300 p-8">
        <Button
          title="담당자"
          onClick={() =>
            setIsDropDownOpen({
              ...isDropDownOpen,
              assignee: !isDropDownOpen.assignee,
              label: false,
              milestone: false,
            })
          }
          hasDropDown={true}
          isFlexible={true}
          type="Ghost"
          color="Gray"
          condition="Press"
          gap="gap-x-40"
        />
        {isDropDownOpen.assignee && (
          <div className="absolute top-1/2 z-10 rounded-2xl border border-gray-300 bg-white">
            {issueDetailData?.userList.map(user => (
              <FilterItem
                key={user.userId}
                item={{
                  id: user.userId,
                  name: user.userName,
                  imgUrl: user.profileUrl,
                  width: 20,
                  height: 20,
                  isClicked: issueDetailData?.issue.userName === user.userName,
                }}
                onItemClick={id => console.log(id)}
              />
            ))}
          </div>
        )}
        <div className="flex gap-x-2">
          <Profile url={issue.profileUrl} width={20} height={20} />
          <span className="text-gray-900">{issue.userName}</span>
        </div>
      </section>
      <section className="relative flex flex-col justify-between border-b border-b-gray-300 p-8">
        <Button
          title="레이블"
          onClick={() => {
            setIsDropDownOpen({
              ...isDropDownOpen,
              label: !isDropDownOpen.label,
              assignee: false,
              milestone: false,
            });
          }}
          hasDropDown={true}
          isFlexible={true}
          type="Ghost"
          color="Gray"
          condition="Press"
          gap="gap-x-40"
        />
        {isDropDownOpen.label && (
          <div className="absolute top-1/2 z-10 rounded-2xl border border-gray-300 bg-white">
            {issueDetailData?.labelList.map(label => (
              <FilterItem
                key={label.labelId}
                item={{
                  id: label.labelId,
                  name: label.labelName,
                  backgroundColor: label.backgroundColor,
                  isClicked: attachedLabels.some(
                    attachedLabel => attachedLabel.labelId === label.labelId
                  ),
                }}
                onItemClick={id => console.log(id)}
              />
            ))}
          </div>
        )}

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
      <section className="relative flex flex-col justify-between p-8">
        <Button
          title="마일스톤"
          onClick={() =>
            setIsDropDownOpen({
              ...isDropDownOpen,
              milestone: !isDropDownOpen.milestone,
              assignee: false,
              label: false,
            })
          }
          hasDropDown={true}
          isFlexible={true}
          type="Ghost"
          color="Gray"
          condition="Press"
          gap="gap-x-40"
        />
        {isDropDownOpen.milestone && (
          <div className="absolute top-1/2 z-10 rounded-2xl border border-gray-300 bg-white">
            {issueDetailData?.milestoneList.map(milestone => (
              <FilterItem
                key={milestone.milestoneId}
                item={{
                  id: milestone.milestoneId,
                  name: milestone.milestoneName,
                  isClicked:
                    attachedMilestone?.milestoneId === milestone.milestoneId,
                }}
                onItemClick={() => console.log('milestone')}
              />
            ))}
          </div>
        )}
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
