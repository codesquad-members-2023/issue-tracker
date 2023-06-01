import React from 'react';
import LabelItem from '@components/LabelTable/LabelItem';

interface LabelTableProps {
  labelsData: any;
  handleSetLabelData: () => void;
}

const LabelTable = (props: LabelTableProps) => {
  const { labelsData, handleSetLabelData } = props;
  return (
    <section className="rounded-2xl border border-gray-300">
      <div className="flex h-16 items-center rounded-t-2xl bg-gray-100 px-6 py-2 font-bold text-gray-600">
        {labelsData.countAllLabels}개의 레이블
      </div>
      <ul className="rounded-b-2xl bg-gray-50">
        {labelsData.labelList.map((label: any) => (
          <LabelItem
            key={label.id}
            labelId={label.id}
            name={label.name}
            fontColor={label.fontColor}
            backgroundColor={label.backgroundColor}
            description={label.description}
            handleSetLabelData={handleSetLabelData}
          />
        ))}
      </ul>
    </section>
  );
};

export default LabelTable;
