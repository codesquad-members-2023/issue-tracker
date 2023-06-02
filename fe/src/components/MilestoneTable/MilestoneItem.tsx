import React, { useState } from 'react';

import { ReactComponent as Milestone } from '@assets/milestone.svg';
import { ReactComponent as Calendar } from '@assets/calendar.svg';
import { ReactComponent as Archive } from '@assets/archive.svg';
import Button from '@common/Button';
import MilestoneProgressBar from '@components/MilestoneProgressBar/MilestoneProgressBar';
import { BASE_API } from '../../api';
import { b } from 'msw/lib/glossary-de6278a9';

interface MilestoneInfo {
  milestoneId: number;
  name: string;
  description: string;
  completedAt: string;
  countAllOpenedIssues: number;
  countAllClosedIssues: number;
  progress: number;
  isOpen: boolean;
}

interface MilestoneItemProps {
  milestoneInfo: MilestoneInfo;
  handleSetMilestoneData: () => void;
}

const getSplitedDate = (date: string) => {
  return date.split(' ')[0];
};

const MilestoneItem = (props: MilestoneItemProps) => {
  const { milestoneInfo, handleSetMilestoneData } = props;
  const {
    name,
    description,
    completedAt,
    progress,
    countAllOpenedIssues,
    countAllClosedIssues,
    milestoneId,
    isOpen,
  } = milestoneInfo;
  const INITIAL_MILESTONE = {
    milestoneName: name,
    description,
    completedAt,
  };
  const [isEditMilestone, setIsEditMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    milestoneName: name,
    description,
    completedAt,
    isOpen,
  } as any);

  const handleIsEditMilestoneClick = () => {
    setIsEditMilestone(!isEditMilestone);
  };

  return (
    <>
      <div className="flex justify-between border-t border-t-gray-300 px-8 py-4 hover:bg-gray-100">
        <section className="flex w-4/5 flex-col justify-center gap-y-2">
          <section className="flex items-center justify-start gap-x-2">
            {milestoneInfo.isOpen ? (
              <Milestone fill="#007AFF" />
            ) : (
              <Archive stroke="#FF3B30" />
            )}
            <p className="font-bold">{name}</p>
            <div className="flex items-center gap-x-2 text-sm text-gray-600">
              <Calendar stroke="#6E7191" />
              <p>{getSplitedDate(completedAt)}</p>
            </div>
          </section>
          <section className="text-gray-600">
            <p>{description}</p>
          </section>
        </section>
        <section className="w-1/5">
          <section className="mb-1 flex items-center justify-end gap-x-6">
            <Button
              title={isOpen ? '닫기' : '열기'}
              onClick={async () => {
                if (!confirm('정말로 닫으시겠습니까?')) return;
                await fetch(`${BASE_API}milestones/${milestoneId}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: newMilestone.milestoneName,
                    description: newMilestone.description,
                    completedAt: `${newMilestone.completedAt}`,
                    isOpen: !newMilestone.isOpen,
                  }),
                });
                handleSetMilestoneData();
              }}
              isFlexible={true}
              size="Small"
              color="Gray"
              type="Ghost"
              gap="gap-x-1"
              condition="Press"
              iconName={isOpen ? 'archive' : 'milestone'}
              fontSize={'text-sm'}
            />
            <Button
              title="편집"
              onClick={handleIsEditMilestoneClick}
              isFlexible={true}
              size="Small"
              color="Gray"
              type="Ghost"
              gap="gap-x-1"
              condition="Press"
              iconName="edit"
              fontSize={'text-sm'}
            />
            <Button
              title="삭제"
              onClick={async () => {
                if (!confirm('정말로 삭제하시겠습니까?')) return;
                await fetch(`${BASE_API}milestones/${milestoneId}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                handleSetMilestoneData();
              }}
              isFlexible={true}
              size="Small"
              color="Red"
              gap="gap-x-1"
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
            <p className="text-right font-medium">{progress}%</p>
            {/* <div>{`열린 이슈 ${countAllOpenedIssues} 닫힌 이슈 ${countAllClosedIssues}`}</div> */}
            <div>
              <span className="mr-2 font-medium">
                열린 이슈 {countAllOpenedIssues}
              </span>
              <span className="font-medium">
                닫힌 이슈 {countAllClosedIssues}
              </span>
            </div>
          </section>
        </section>
      </div>
      {isEditMilestone && (
        <section className="flex h-80 flex-col gap-y-6 border-t border-t-gray-300 bg-gray-50 p-8">
          <div>새로운 마일스톤 추가</div>
          <section className="flex flex-col justify-start gap-6">
            <div className="flex w-full gap-x-4">
              <div className="flex w-full justify-start gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
                <div className="whitespace-nowrap">마일스톤 이름</div>
                <input
                  type="text"
                  placeholder={'입력하세요'}
                  className="w-full bg-gray-200"
                  value={newMilestone.milestoneName}
                  onChange={e =>
                    setNewMilestone({
                      ...newMilestone,
                      milestoneName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full justify-start gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
                <div className="whitespace-nowrap">완료일(선택)</div>
                <input
                  type="text"
                  placeholder={'YYYY-MM-DD'}
                  className="w-full bg-gray-200"
                  value={newMilestone.completedAt.split(' ')[0]}
                  onChange={e =>
                    setNewMilestone({
                      ...newMilestone,
                      completedAt: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex justify-start gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
                <div className="whitespace-nowrap">설명(선택)</div>
                <input
                  type="text"
                  placeholder={'입력하세요'}
                  className="w-full bg-gray-200"
                  value={newMilestone.description}
                  onChange={e =>
                    setNewMilestone({
                      ...newMilestone,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </section>
          <div className="flex justify-end gap-x-2">
            <Button
              title="취소"
              onClick={async () => {
                handleIsEditMilestoneClick();
                setNewMilestone(INITIAL_MILESTONE);
              }}
              size="Small"
              iconName="xsquare"
              fontSize="text-sm"
              type="Outline"
            />
            <Button
              title="완료"
              onClick={async () => {
                handleIsEditMilestoneClick();
                await fetch(`${BASE_API}milestones/${milestoneId}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: newMilestone.milestoneName,
                    description: newMilestone.description,
                    completedAt: `${newMilestone.completedAt}`,
                    isOpen: newMilestone.isOpen,
                  }),
                });
                handleSetMilestoneData();
              }}
              size="Small"
              iconName="plus"
              fontSize="text-sm"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default MilestoneItem;
