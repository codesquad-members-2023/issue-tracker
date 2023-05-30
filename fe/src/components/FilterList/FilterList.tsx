import React, { useRef } from 'react';

import FilterItem, { FilterItemRaw } from '@common/FilterItem/FilterItem';
import { FilterOptions } from '@components/IssueTable/IssueTable';
import useOutsideClick from './useOutsideClick';

export const filterOptions: Record<keyof FilterOptions, string | string[]> = {
  page: '페이지',
  status: '상태',
  issue: ['열린이슈', '닫힌이슈'],
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
  setOpenedFilterList: (filter: string) => void;
  onItemClick: (type: keyof FilterOptions, id: number) => void;
}

const FilterList: React.FC<Props> = ({
  title,
  items,
  isOpen,
  setOpenedFilterList,
  onItemClick,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onItemClickHandler = (id: number) => {
    onItemClick(title, id);
  };

  const getOption = () => {
    if (title) {
      return filterOptions[title];
    }

    // NOTE(Lily): 예상하지 못한 title이 주어졌을 때 오류 처리
    throw new Error('Invalid title');
  };

  const handleOutsideClick = (event?: MouseEvent) => {
    if (event) {
      // 클릭된 영역이 FilterList 내부의 요소이면 아무 동작하지 않음
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }
    }

    // 클릭된 영역이 FilterList 외부의 요소이면 FilterList를 닫음
    setOpenedFilterList('');
  };

  useOutsideClick(ref, handleOutsideClick);

  return isOpen ? (
    <div
      ref={ref}
      className={`absolute ${
        title !== 'filter' && 'right-0'
      } top-12 z-10 flex w-60 flex-col items-center rounded-lg border`}
    >
      <div className="w-full rounded-t-lg bg-gray-100 py-2 pl-4 text-left text-sm">
        {getOption()} 필터
      </div>
      <div className="w-full rounded-b-lg bg-white">
        {/* TODO(Lily): 담당자, 레이블, 마일스톤 없는 이슈 추가 */}
        {items.map(item => (
          <FilterItem
            key={item.id}
            item={item}
            onItemClick={onItemClickHandler}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default FilterList;
