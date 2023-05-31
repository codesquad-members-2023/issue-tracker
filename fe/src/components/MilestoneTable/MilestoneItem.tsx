import React from 'react';

import { ReactComponent as Milestone } from '@assets/milestone.svg';
import { ReactComponent as Calendar } from '@assets/calendar.svg';
import Button from '@common/Button';
import MilestoneProgressBar from '@components/MilestoneProgressBar/MilestoneProgressBar';

interface MilestoneInfo {
  milestoneId: number;
  name: string;
  description: string;
  completedAt: string;
  countAllOpenedIssues: number;
  countAllClosedIssues: number;
  progress: number;
}

interface MilestoneItemProps {
  milestoneInfo: MilestoneInfo;
}

const getSplitedDate = (date: string) => {
  return date.split(' ')[0];
};

const MilestoneItem = (props: MilestoneItemProps) => {
  const { milestoneInfo } = props;
  const {
    name,
    description,
    completedAt,
    progress,
    countAllOpenedIssues,
    countAllClosedIssues,
    milestoneId,
  } = milestoneInfo;
  return (
    <div className="flex justify-between border-t border-t-gray-300 px-8 py-4">
      <section className="flex w-4/5 flex-col justify-center">
        <section className="mb-2 flex items-center justify-start gap-x-2">
          <Milestone fill="#007AFF" />
          <p className="font-bold">{name}</p>
          <div className="flex items-center gap-x-2 text-md text-gray-600">
            <Calendar stroke="#6E7191" />
            <p>{getSplitedDate(completedAt)}</p>
          </div>
        </section>
        <section>
          <p>{description}</p>
        </section>
      </section>
      <section className="w-1/5">
        <section className="flex items-center justify-end gap-x-6">
          <Button
            title="닫기"
            onClick={() => console.log('닫기')}
            isFlexible={true}
            size="Small"
            color="Gray"
            type="Ghost"
            condition="Press"
            iconName="archive"
            fontSize={'text-sm'}
          />
          <Button
            title="편집"
            onClick={() => console.log('편집')}
            isFlexible={true}
            size="Small"
            color="Gray"
            type="Ghost"
            condition="Press"
            iconName="edit"
            fontSize={'text-sm'}
          />
          <Button
            title="삭제"
            onClick={() => console.log('삭제')}
            isFlexible={true}
            size="Small"
            color="Red"
            type="Ghost"
            condition="Press"
            iconName="trash"
            fontSize={'text-sm'}
          />
        </section>
        <section>
          <MilestoneProgressBar progress={progress} />
        </section>
        <section className="mt-1 flex justify-between text-sm text-gray-600">
          <p className="text-right">{progress}%</p>
          <div>{`열린 이슈 ${countAllOpenedIssues} / 닫힌 이슈 ${countAllClosedIssues}`}</div>
        </section>
      </section>
    </div>
  );
};

export default MilestoneItem;
