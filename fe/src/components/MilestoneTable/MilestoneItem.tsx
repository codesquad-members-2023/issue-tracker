import React, { useState } from 'react';

import { ReactComponent as Milestone } from '@assets/milestone.svg';
import { ReactComponent as Calendar } from '@assets/calendar.svg';
import Button from '@common/Button';
import MilestoneProgressBar from '@components/MilestoneProgressBar/MilestoneProgressBar';
import { BASE_API } from '../../api';
import fetchSetData from '@utils/fetchSetData';

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
  } as any);
  const handleIsEditMilestoneClick = () => {
    setIsEditMilestone(!isEditMilestone);
  };
  return (
    <>
      <div className="flex justify-between border-t border-t-gray-300 px-8 py-4">
        <section className="flex w-4/5 flex-col justify-center gap-y-2">
          <section className="flex items-center justify-start gap-x-2">
            <Milestone fill="#007AFF" />
            <p className="font-bold">{name}</p>
            <div className="flex items-center gap-x-2 text-md text-gray-600">
              <Calendar stroke="#6E7191" />
              <p>{getSplitedDate(completedAt)}</p>
            </div>
          </section>
          <section className="text-gray-600">
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
              onClick={handleIsEditMilestoneClick}
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
              type="Ghost"
              condition="Press"
              iconName="trash"
              fontSize={'text-sm'}
            />
          </section>
          <section>
            <MilestoneProgressBar progress={progress} />
          </section>
          <section className="flex justify-between text-sm text-gray-600">
            <p className="text-right">{progress}%</p>
            <div>{`열린 이슈 ${countAllOpenedIssues} / 닫힌 이슈 ${countAllClosedIssues}`}</div>
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
                  value={newMilestone.completedAt}
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
                // NOTE(Jayden): 현재 PATCH 요청 400 에러 발생
                await fetch(`${BASE_API}milestones/${milestoneId}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: newMilestone.milestoneName,
                    description: newMilestone.description,
                    completedAt: `${newMilestone.completedAt}T23:59:59`,
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
