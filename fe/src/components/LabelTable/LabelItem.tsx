import Label from '@common/Label';
import React, { useState } from 'react';
import Button from '@common/Button';
import { BASE_API } from '../../api';
import getRandomHexColor from '@utils/getRandomHexColor';
import { ReactComponent as RefreshCcw } from '@assets/refreshCcw.svg';

interface LabelItemProps {
  labelId: number;
  name: string;
  fontColor: string;
  backgroundColor: string;
  description: string;
  handleSetLabelData: () => void;
}

const LabelItem = (props: LabelItemProps) => {
  const {
    labelId,
    name,
    fontColor,
    backgroundColor,
    description,
    handleSetLabelData,
  } = props;
  const INITIAL_LABEL = {
    labelName: name,
    backgroundColor,
    fontColor,
    description,
  };
  const [newLabel, setNewLabel] = useState(INITIAL_LABEL);
  const [isEditLabel, setIsEditLabel] = useState(false);
  const [isFontColorDropdown, setIsFontColorDropdown] = useState(false);
  const handleIsEditLabelClick = () => {
    setIsEditLabel(!isEditLabel);
  };
  const handleIsFontColorDropdownClick = () => {
    setIsFontColorDropdown(!isFontColorDropdown);
  };
  return (
    <>
      <div className="flex h-24 items-center justify-between border-t border-t-gray-300 px-8 py-10 hover:bg-gray-100">
        <div className="w-44">
          <Label
            labelName={name}
            fontColor={fontColor}
            backgroundColor={backgroundColor}
          />
        </div>
        <div className="flex grow">
          <p className="w-3/5 text-gray-600">{description}</p>
        </div>

        <section className="flex gap-x-4">
          <Button
            title="편집"
            onClick={handleIsEditLabelClick}
            isFlexible={true}
            size="Small"
            color="Gray"
            gap="gap-x-1"
            type="Ghost"
            condition="Press"
            iconName="edit"
            fontSize={'text-sm'}
          />
          <Button
            title="삭제"
            onClick={async () => {
              if (confirm('정말 삭제하시겠습니까?')) {
                await fetch(`${BASE_API}labels/${labelId}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                handleSetLabelData();
              }
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
      </div>
      {isEditLabel && (
        <section className="flex h-80 flex-col gap-y-6  border-t border-t-gray-300 bg-gray-50 p-8">
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
                  placeholder={newLabel.labelName}
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
                  placeholder={newLabel.description}
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
                  <div className="absolute left-64 top-12 w-full rounded-2xl border px-2">
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
          <div className="flex justify-end gap-x-2">
            <Button
              title="취소"
              onClick={async () => {
                handleIsEditLabelClick();
                setNewLabel(INITIAL_LABEL);
              }}
              size="Small"
              iconName="xsquare"
              fontSize="text-sm"
              type="Outline"
            />
            <Button
              title="편집 완료"
              onClick={async () => {
                handleIsEditLabelClick();
                await fetch(`${BASE_API}labels/${labelId}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    labelName: newLabel.labelName,
                    description: newLabel.description,
                    backgroundColor: newLabel.backgroundColor,
                    fontColor: newLabel.fontColor,
                  }),
                }).catch(err => console.log(err));
                handleSetLabelData();
              }}
              size="Small"
              iconName="edit"
              fontSize="text-sm"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default LabelItem;
