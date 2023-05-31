import React, { useEffect, useState } from 'react';

import Button from '@common/Button';
import NavLinks from '@components/NavLinks/NavLinks';
import fetchSetData from '@utils/fetchSetData';
import { BASE_API } from '../api';

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
  }, []);
  console.log(milestonesData);
  return (
    <>
      {Object.keys(milestonesData).length === 0 ? (
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
          <section></section>
        </section>
      ) : null}
    </>
  );
};

export default MilestonePage;
