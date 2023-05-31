import React, { useEffect, useState } from 'react';

import Button from '@common/Button';
import NavLinks from '@components/NavLinks/NavLinks';
import fetchSetData from '@utils/fetchSetData';
import { BASE_API } from '../api';
import MilestoneTable from '@components/MilestoneTable/MilestoneTable';

const TEMP_MILESTONE_DATA = {
  milestoneList: [
    {
      milestoneId: 1,
      name: '[BE] 이슈 관리 기능',
      description: '평냉엔 소주',
      completedAt: '2023-05-21 13:14:13',
      countAllOpenedIssues: 2,
      countAllClosedIssues: 1,
      progress: 33,
    },
    {
      milestoneId: 2,
      name: '[FE] 1-2주차',
      description: '1-2주차\n',
      completedAt: '2023-05-19 11:20:57',
      countAllOpenedIssues: 1,
      countAllClosedIssues: 0,
      progress: 0,
    },
    {
      milestoneId: 3,
      name: '[iOS] 이슈 리스팅',
      description: '맛있겠다\n',
      completedAt: '2023-05-19 11:21:28',
      countAllOpenedIssues: 9,
      countAllClosedIssues: 17,
      progress: 65,
    },
    {
      milestoneId: 5,
      name: '[BE] 마일스톤 수정',
      description: '마일스톤 수정 기능',
      completedAt: '2023-05-23 13:00:00',
      countAllOpenedIssues: 1,
      countAllClosedIssues: 0,
      progress: 0,
    },
    {
      milestoneId: 6,
      name: '[common] 마일스톤 추가',
      description: '마일스톤 추가하는 테스트',
      completedAt: '2023-05-23 18:52:11',
      countAllOpenedIssues: 1,
      countAllClosedIssues: 0,
      progress: 0,
    },
  ],
  countOpenedMilestones: 5,
  countClosedMilestones: 0,
  countAllMilestones: 5,
  countAllLabels: 17,
};

const MilestonePage = () => {
  const [milestonesData, setMilestonesData] = useState({} as any);
  const [isNewMilestone, setIsNewMilestone] = React.useState(false);
  const [newMilestone, setNewMilestone] = useState({
    milestoneName: '',
    description: '',
    completedAt: '',
  } as any);
  const handleIsNewMilestoneClick = () => {
    setIsNewMilestone(!isNewMilestone);
  };

  useEffect(() => {
    fetchSetData(`${BASE_API}milestones`, setMilestonesData);
    // setMilestonesData(TEMP_MILESTONE_DATA);
  }, []);
  console.log(milestonesData);
  return (
    <>
      {Object.keys(milestonesData).length ? (
        <section className="flex flex-col gap-y-6 ">
          <section className="flex justify-between">
            <NavLinks
              countAllLabels={milestonesData.countAllLabels}
              countAllMilestones={milestonesData.countAllMilestones}
            />
            {isNewMilestone ? (
              <Button
                title="닫기"
                onClick={handleIsNewMilestoneClick}
                size="Small"
                iconName="xsquare"
                fontSize="text-sm"
                type="Outline"
              />
            ) : (
              <Button
                title="마일스톤 추가"
                onClick={handleIsNewMilestoneClick}
                size="Small"
                iconName="plus"
                fontSize="text-sm"
              />
            )}
          </section>
          {isNewMilestone && (
            <section className="flex h-80 flex-col gap-y-6 rounded-2xl border border-gray-300 bg-gray-50 p-8">
              <div>새로운 마일스톤 추가</div>
              <section className="flex flex-col justify-start gap-6">
                <div className="flex w-full gap-x-4">
                  <div className="flex w-full justify-start gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
                    <div className="whitespace-nowrap">마일스톤 이름</div>
                    <input
                      type="text"
                      placeholder={'입력하세요'}
                      className="w-full bg-gray-200 focus:outline-none"
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
                      className="w-full bg-gray-200 focus:outline-none"
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
                      className="w-full bg-gray-200 focus:outline-none"
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
              <div className="flex justify-end">
                <Button
                  title="완료"
                  onClick={async () => {
                    handleIsNewMilestoneClick();
                    // await fetch(`${BASE_API}milestones`, {
                    //   method: 'POST',
                    //   headers: {
                    //     'Content-Type': 'application/json',
                    //   },
                    //   body: JSON.stringify({
                    //     labelName: newLabel.labelName,
                    //     description: newLabel.description,
                    //     backgroundColor: newLabel.backgroundColor,
                    //     fontColor: newLabel.fontColor,
                    //   }),
                    // });
                    // await fetchSetData(`${BASE_API}labels`, setLabelsData);
                    // setNewLabel(INITIAL_LABEL);
                  }}
                  size="Small"
                  iconName="plus"
                  fontSize="text-sm"
                />
              </div>
            </section>
          )}
          <section>
            <MilestoneTable milestonesData={milestonesData} />
          </section>
        </section>
      ) : null}
    </>
  );
};

export default MilestonePage;
