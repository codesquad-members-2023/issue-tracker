import React, { useState } from 'react';

import FilterItem, { FilterItemRaw } from '@common/FilterItem/FilterItem';

interface Props {
  title: string;
  items: FilterItemRaw[];
}

const FilterList: React.FC<Props> = ({ title, items }) => {
  const [checkedItem, setCheckedItem] = useState(0);

  const onItemClick = (id: number) => {
    setCheckedItem(id);
  };

  return (
    <div className="absolute top-12 z-10 flex w-60 flex-col items-center rounded-lg border">
      <div className="w-full rounded-t-lg bg-gray-100 py-2 pl-4 text-left text-sm">
        {title} 필터
      </div>
      <div className="w-full rounded-b-lg bg-white">
        {/* TODO(Lily): 담당자, 레이블, 마일스톤 없는 이슈 추가 */}
        {items.map(item => {
          const { id, name, imgUrl, backgroundColor } = item;
          return (
            <button
              key={id}
              className="flex w-full items-center justify-between border-t text-gray-700"
              onClick={() => onItemClick(id)}
            >
              <FilterItem
                id={id}
                name={name}
                isChecked={id === checkedItem ? true : false}
                imgUrl={imgUrl}
                width={20}
                height={20}
                backgroundColor={backgroundColor}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterList;
