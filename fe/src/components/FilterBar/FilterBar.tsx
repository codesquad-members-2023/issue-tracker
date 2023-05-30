import React, { useState } from 'react';

import { ReactComponent as Search } from '@assets/search.svg';
import Button from '@common/Button';
import FilterList from '@components/FilterList/FilterList';
import { FILTER_DROPDOWN_LIST } from '@constants/Constants';
import { FilterOptions } from '@components/IssueTable/IssueTable';

interface Props {
  searchValue: string;
  filterOptions: FilterOptions;
  updateFilterOption: (type: keyof FilterOptions, id: number) => void;
}

const FilterBar: React.FC<Props> = ({
  searchValue,
  filterOptions,
  updateFilterOption,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterOpen = (status: string) => {
    setIsFilterOpen(Boolean(status));
  };

  const onItemClick = (type: keyof FilterOptions, id: number) => {
    updateFilterOption(type, id);
  };

  return (
    <div className="flex w-auto justify-start rounded-2xl border border-gray-200">
      <Button
        title="필터"
        size="Small"
        color="Gray"
        type="Ghost"
        hasDropDown={true}
        condition="Press"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      />
      <FilterList
        title="filter"
        items={FILTER_DROPDOWN_LIST.map(item => {
          const { id, name } = item;
          return {
            id,
            name,
            isClicked: filterOptions['filter'] === id ? true : false,
          };
        })}
        isOpen={isFilterOpen}
        setOpenedFilterList={handleFilterOpen}
        onItemClick={onItemClick}
      />
      <form
        action=""
        className="flex w-[472px] items-center justify-start gap-x-3 rounded-r-2xl bg-gray-100 pl-6"
      >
        <Search stroke="#6E7191" className="w-4 self-center" />
        <input
          type="text"
          value={searchValue}
          className="w-96 bg-gray-100 text-gray-600 focus:outline-none"
          onChange={() => console.log('')}
        />
      </form>
    </div>
  );
};

export default FilterBar;
