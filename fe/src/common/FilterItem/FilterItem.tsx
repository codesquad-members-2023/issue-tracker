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
      className={`mx-4 my-2 flex items-center bg-white text-gray-700 ${
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
