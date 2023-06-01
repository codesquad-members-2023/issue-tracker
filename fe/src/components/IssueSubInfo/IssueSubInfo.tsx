import React, { useContext, useState } from 'react';

import Button from '@common/Button';
import Profile from '@common/Profile';
import {
  Issue,
  AttachedLabelList,
  AttachedMilestone,
  AttachedAssigneeList,
} from '@customTypes/IssueDetailPage';
import Label from '@common/Label';
import MilestoneProgressBar from '@components/MilestoneProgressBar/MilestoneProgressBar';
import { issueDetailDataContext } from '../../pages/IssueDetailPage';
import FilterItem from '@common/FilterItem/FilterItem';

interface IssueSubInfoProps {
  issue: Issue;
  attachedLabelList: AttachedLabelList;
  attachedMilestone: AttachedMilestone;
  attachedAssigneeList: AttachedAssigneeList;
}

const IssueSubInfo = (props: IssueSubInfoProps) => {
  const { issue, attachedLabelList, attachedMilestone, attachedAssigneeList } =
    props;
  const issueDetailData = useContext(issueDetailDataContext);
  const [isDropDownOpen, setIsDropDownOpen] = useState({
    assignee: false,
    label: false,
    milestone: false,
  });
  const [assigneeIdsClicked, setAssigneeIdsClicked] = useState<number[]>(
    attachedAssigneeList.map(assignee => assignee.id)
  );
  const [labelIdsClicked, setLabelIdsClicked] = useState<number[]>(
    attachedLabelList.map(label => label.labelId)
  );
  const [milestoneIdClicked, setMilestoneIdClicked] = useState<number>(
    attachedMilestone.milestoneId
  );
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
            {issueDetailData?.userList.map((user, i) => (
              <FilterItem
                key={user.userId}
                item={{
                  id: user.userId,
                  name: user.userName,
                  imgUrl: user.profileUrl,
                  width: 20,
                  height: 20,
                  isClicked: assigneeIdsClicked.includes(user.userId),
                }}
                isFirst={i === 0}
                onItemClick={id => console.log(id)}
              />
            ))}
          </div>
        )}
        {attachedAssigneeList.map((assignee, i) => (
          <div className="flex gap-x-2" key={assignee.id}>
            <Profile url={assignee.profileUrl} width={20} height={20} />
            <span className="text-gray-900">{assignee.loginId}</span>
          </div>
        ))}
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
            {issueDetailData?.labelList.map((label, i) => (
              <FilterItem
                key={label.labelId}
                item={{
                  id: label.labelId,
                  name: label.labelName,
                  backgroundColor: label.backgroundColor,
                  isClicked: labelIdsClicked.includes(label.labelId),
                }}
                isFirst={i === 0}
                onItemClick={id => console.log(id)}
              />
            ))}
          </div>
        )}

        <div className="flex w-fit flex-wrap gap-y-1">
          {attachedLabelList.map(label => (
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
          <>
            <div className="absolute top-1/2 z-10 rounded-2xl border border-gray-300 bg-white">
              {issueDetailData?.milestoneList.map((milestone, i) => (
                <FilterItem
                  key={milestone.milestoneId}
                  item={{
                    id: milestone.milestoneId,
                    name: milestone.milestoneName,
                    isClicked: milestoneIdClicked === milestone.milestoneId,
                  }}
                  isFirst={i === 0}
                  onItemClick={() => console.log('milestone')}
                />
              ))}
            </div>
            <div className="flex w-full flex-wrap gap-y-2">
              <MilestoneProgressBar progress={attachedMilestone?.progress} />
              <div>{attachedMilestone?.milestoneName}</div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default IssueSubInfo;
