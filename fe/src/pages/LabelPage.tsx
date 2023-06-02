import React, { useEffect, useState } from 'react';

import NavLinks from '@components/NavLinks/NavLinks';
import Button from '@common/Button';
import LabelTable from '@components/LabelTable/LabelTable';
import { BASE_API } from '../api';
import fetchSetData from '@utils/fetchSetData';
import Label from '@common/Label';
import { ReactComponent as RefreshCcw } from '@assets/refreshCcw.svg';
import getRandomHexColor from '@utils/getRandomHexColor';

const LabelPage = () => {
  const INITIAL_LABEL = {
    labelName: '',
    backgroundColor: '#000000',
    fontColor: '#ffffff',
    description: '',
  };
  const [labelsData, setLabelsData] = useState({} as any);
  const [newLabel, setNewLabel] = useState(INITIAL_LABEL);
  const [isNewLabel, setIsNewLabel] = useState(false);
  const [isFontColorDropdown, setIsFontColorDropdown] = useState(false);
  const handleIsNewLabelClick = () => {
    setIsNewLabel(!isNewLabel);
  };
  const handleIsFontColorDropdownClick = () => {
    setIsFontColorDropdown(!isFontColorDropdown);
  };
  const handleSetLabelData = () => {
    fetchSetData(`${BASE_API}labels`, setLabelsData);
  };
  useEffect(() => {
    handleSetLabelData();
  }, []);
  return (
    <>
      {Object.keys(labelsData).length ? (
        <section className="flex flex-col gap-y-6 ">
          <section className="flex justify-between">
            <NavLinks
              countAllLabels={labelsData.countAllLabels}
              countAllMilestones={labelsData.countAllMilestones}
              isLabelPage={true}
            />
            {isNewLabel ? (
              <Button
                title="닫기"
                onClick={() => {
                  handleIsNewLabelClick();
                  setNewLabel(INITIAL_LABEL);
                }}
                size="Small"
                iconName="xsquare"
                fontSize="text-sm"
                type="Outline"
              />
            ) : (
              <Button
                title="레이블 추가"
                onClick={handleIsNewLabelClick}
                size="Small"
                iconName="plus"
                fontSize="text-sm"
              />
            )}
          </section>
          {isNewLabel && (
            <section className="flex h-80 flex-col gap-y-6 rounded-2xl border border-gray-300 bg-gray-50 p-8">
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
                    <div className="whitespace-nowrap">레이블 이름</div>
                    <input
                      type="text"
                      placeholder="입력하세요"
                      className="w-full bg-gray-200 focus:outline-none"
                      value={newLabel.labelName}
                      onChange={e =>
                        setNewLabel({
                          ...newLabel,
                          labelName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-start gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
                    <div className="whitespace-nowrap">설명(선택)</div>
                    <input
                      type="text"
                      placeholder="입력하세요"
                      className="w-full bg-gray-200 focus:outline-none"
                      value={newLabel.description}
                      onChange={e =>
                        setNewLabel({
                          ...newLabel,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="relative flex justify-start">
                    <div className="flex w-60 items-center justify-between gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
                      <div className="whitespace-nowrap">배경 색상</div>
                      {newLabel.backgroundColor}
                      <RefreshCcw
                        stroke="#4E4B66"
                        onClick={() =>
                          setNewLabel({
                            ...newLabel,
                            backgroundColor: getRandomHexColor(),
                          })
                        }
                        className="cursor-pointer"
                      />
                    </div>
                    <Button
                      title={
                        newLabel.fontColor === '#14142B'
                          ? 'dark text'
                          : 'light text'
                      }
                      onClick={() => {
                        handleIsFontColorDropdownClick();
                      }}
                      size="Small"
                      color="Gray"
                      type="Ghost"
                      condition="Press"
                      hasDropDown={true}
                    />
                    {isFontColorDropdown && (
                      <div className="absolute left-64 top-12 rounded-2xl border px-2">
                        <Button
                          title="dark text"
                          onClick={() => {
                            setNewLabel({
                              ...newLabel,
                              fontColor: '#14142B',
                            });
                            handleIsFontColorDropdownClick();
                          }}
                          isFlexible={true}
                          type="Ghost"
                          condition="Press"
                          color="Gray"
                          size="Small"
                        />
                        <Button
                          title="light text"
                          onClick={() => {
                            setNewLabel({
                              ...newLabel,
                              fontColor: '#FEFEFE',
                            });
                            handleIsFontColorDropdownClick();
                          }}
                          isFlexible={true}
                          type="Ghost"
                          condition="Press"
                          color="Gray"
                          size="Small"
                        />
                      </div>
                    )}
                  </div>
                </section>
              </div>
              <div className="flex justify-end">
                <Button
                  title="완료"
                  onClick={async () => {
                    handleIsNewLabelClick();
                    await fetch(`${BASE_API}labels`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        labelName: newLabel.labelName,
                        description: newLabel.description,
                        backgroundColor: newLabel.backgroundColor,
                        fontColor: newLabel.fontColor,
                      }),
                    });
                    await fetchSetData(`${BASE_API}labels`, setLabelsData);
                    setNewLabel(INITIAL_LABEL);
                  }}
                  size="Small"
                  iconName="plus"
                  fontSize="text-sm"
                />
              </div>
            </section>
          )}
          <section>
            <LabelTable
              labelsData={labelsData}
              handleSetLabelData={handleSetLabelData}
            />
          </section>
        </section>
      ) : null}
    </>
  );
};

export default LabelPage;
