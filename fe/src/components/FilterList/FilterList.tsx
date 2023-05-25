import React from 'react';

import FilterItem, { FilterItemRaw } from '@common/FilterItem/FilterItem';
import { FilterOptions } from '@components/IssueTable/IssueTable';

const filterOptions: Record<keyof FilterOptions, string> = {
  filter: '이슈',
  assignee: '담당자',
  label: '레이블',
  milestone: '마일스톤',
  writer: '작성자',
};

interface Props {
  title: keyof FilterOptions;
  items: FilterItemRaw[];
  isOpen: boolean;
  onItemClick: (type: keyof FilterOptions, id: number) => void;
}

const FilterList: React.FC<Props> = ({ title, items, isOpen, onItemClick }) => {
  const _onItemClick = (id: number) => {
    onItemClick(title, id);
  };

  const getOption = () => {
    if (title) {
      return filterOptions[title];
    }

    // NOTE(Lily): 예상하지 못한 title이 주어졌을 때 오류 처리
    throw new Error('Invalid title');
  };

  return (
    <>
      {isOpen && (
        // TODO(Lily): right-0은 이슈 필터 시에는 필요 없음
        <div className="absolute right-0 top-12 z-10 flex w-60 flex-col items-center rounded-lg border">
          <div className="w-full rounded-t-lg bg-gray-100 py-2 pl-4 text-left text-sm">
            {getOption()} 필터
          </div>
          <div className="w-full rounded-b-lg bg-white">
            {/* TODO(Lily): 담당자, 레이블, 마일스톤 없는 이슈 추가 */}
            {items.map(item => {
              return (
                <FilterItem
                  key={item.id}
                  item={item}
                  onItemClick={_onItemClick}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterList;
