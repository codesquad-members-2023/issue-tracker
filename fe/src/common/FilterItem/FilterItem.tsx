import React from 'react';

import Profile from '../Profile';
import { ReactComponent as CheckOffCircle } from '@assets/checkOffCircle.svg';
import { ReactComponent as CheckOnCircle } from '@assets/checkOnCircle.svg';

export interface FilterItemRaw {
  id: number;
  name: string;
  isChecked: boolean;
  bold?: boolean;
  imgUrl?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
  isMultipleItemSelectable?: boolean;
}

const FilterItem: React.FC<FilterItemRaw> = ({
  name,
  isChecked,
  bold,
  imgUrl,
  backgroundColor,
  width,
  height,
  isMultipleItemSelectable = true,
}) => {
  return (
    <div
      className={`mx-4 my-2 flex grow items-center gap-x-1 text-gray-700 ${
        bold && 'font-bold'
      }`}
    >
      {imgUrl && <Profile url={imgUrl} width={width} height={height} />}
      {backgroundColor && (
        <div className={'h-5 w-5 rounded-full'} style={{ backgroundColor }} />
      )}
      <span className="flex grow">{name}</span>
      {isMultipleItemSelectable &&
        (isChecked ? <CheckOnCircle /> : <CheckOffCircle />)}
    </div>
  );
};

export default FilterItem;
