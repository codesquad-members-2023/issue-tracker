import React, { useState } from 'react';

import Profile from '../Profile';
import { ReactComponent as CheckOffCircle } from '@assets/checkOffCircle.svg';
import { ReactComponent as CheckOnCircle } from '@assets/checkOnCircle.svg';

export interface FilterItemRaw {
  id: number;
  name: string;
  bold?: boolean;
  imgUrl?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

const FilterItem: React.FC<FilterItemRaw> = ({
  name,
  bold = false,
  imgUrl,
  backgroundColor,
  width,
  height,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClickIsChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <button
      onClick={() => {
        handleClickIsChecked();
      }}
      className={`flex items-center gap-x-1 text-gray-700 ${
        bold && 'font-bold'
      }`}
    >
      {imgUrl && <Profile url={imgUrl} width={width} height={height} />}
      {backgroundColor && (
        <div
          className={'h-5 w-5 rounded-full'}
          style={{ backgroundColor }}
        ></div>
      )}
      <span>{name}</span>
      {isChecked ? <CheckOnCircle /> : <CheckOffCircle />}
    </button>
  );
};

export default FilterItem;
