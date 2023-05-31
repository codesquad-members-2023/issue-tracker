import React, { useEffect, useState } from 'react';

import NavLinks from '@components/NavLinks/NavLinks';
import Button from '@common/Button';
import LabelTable from '@components/LabelTable/LabelTable';
import { BASE_API } from '../api';
import fetchSetData from '@utils/fetchSetData';
import Label from '@common/Label';
import { ReactComponent as RefreshCcw } from '@assets/refreshCcw.svg';

const LabelPage = () => {
  const [labelsData, setLabelsData] = useState({} as any);
  const [newLabel, setNewLabel] = useState({
    labelName: '레이블',
    backgroundColor: '#000000',
    fontColor: '#ffffff',
    description: '입력하세요',
  });
  useEffect(() => {
    fetchSetData(`${BASE_API}labels`, setLabelsData);
  }, []);
  return (
    <>
      {Object.keys(labelsData).length ? (
        <section className="flex flex-col gap-y-6 ">
          <section className="flex justify-between">
            <NavLinks
              countAllLabels={labelsData.countAllLabels}
              countAllMilestones={labelsData.countAllMilestones}
            />
            <Button
              title="레이블 추가"
              onClick={() => console.log('레이블 추가')}
              size="Small"
              iconName="plus"
              fontSize="text-sm"
            />
          </section>
          <section className="flex h-80 flex-col gap-y-6 rounded-2xl border border-gray-300 p-8">
            <div>새로운 레이블 추가</div>
            <div className="flex justify-start gap-x-6">
              <section className="flex h-40 w-1/4 items-center justify-center rounded-2xl border border-gray-300">
                <Label
                  labelName={newLabel.labelName}
                  backgroundColor={newLabel.backgroundColor}
                  fontColor={newLabel.fontColor}
                />
              </section>
              <section className="flex w-full flex-col gap-y-4">
                <div className="flex justify-start gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
                  <div>레이블 이름</div>
                  <input
                    type="text"
                    placeholder={newLabel.labelName}
                    className="bg-gray-200"
                  />
                </div>
                <div className="flex justify-start gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
                  <div>설명(선택)</div>
                  <input
                    type="text"
                    placeholder={newLabel.description}
                    className="bg-gray-200"
                  />
                </div>
                <div className="flex justify-start">
                  <div className="flex w-60 items-center justify-between gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
                    <div className="whitespace-nowrap">배경 색상</div>
                    {newLabel.backgroundColor}
                    <RefreshCcw stroke="#4E4B66" />
                  </div>
                  <Button
                    title={'dark text'}
                    onClick={() => {
                      console.log('폰트 색상 변경');
                    }}
                    size="Small"
                    color="Gray"
                    type="Ghost"
                    condition="Press"
                    hasDropDown={true}
                  />
                </div>
              </section>
            </div>
          </section>
          <section>
            <LabelTable labelsData={labelsData} />
          </section>
        </section>
      ) : null}
    </>
  );
};

export default LabelPage;
