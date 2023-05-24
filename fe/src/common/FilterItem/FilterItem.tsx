import React from 'react';

import Profile from '../Profile';
import { ReactComponent as CheckOffCircle } from '@assets/checkOffCircle.svg';
import { ReactComponent as CheckOnCircle } from '@assets/checkOnCircle.svg';

export interface FilterItemRaw {
  id: number;
  name: string;
  isClicked: boolean;
  imgUrl?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  isMultipleItemSelectable?: boolean;
  onItemClick: (type: string, id: number) => void;
}

const FilterItem: React.FC<FilterItemRaw> = ({
  id,
  name,
  isClicked,
  width,
  height,
  imgUrl,
  backgroundColor,
  isMultipleItemSelectable = true,
  onItemClick,
}) => {
  return (
    <button
      className={`flex w-full items-center gap-x-2 border-t bg-white px-4 py-2 text-gray-700 ${
        isClicked && 'font-bold'
      }`}
      onClick={() => onItemClick(name, id)}
    >
      {imgUrl && <Profile url={imgUrl} width={width} height={height} />}
      {backgroundColor && (
        <div className={'h-5 w-5 rounded-full'} style={{ backgroundColor }} />
      )}
      <span className="flex grow">{name}</span>
      {isMultipleItemSelectable &&
        (isClicked ? <CheckOnCircle /> : <CheckOffCircle />)}
    </button>
  );
};

export default FilterItem;
