import React from 'react';

interface Props {
  labelName?: string;
  backgroundColor?: string;
  fontColor?: string;
}

const Label: React.FC<Props> = ({ labelName, backgroundColor, fontColor }) => {
  return (
    <div
      className={'mr-1 h-6 w-fit rounded-2xl px-4 py-1 text-xs font-semibold'}
      style={{ backgroundColor, color: fontColor }}
    >
      {labelName}
    </div>
  );
};

export default Label;
