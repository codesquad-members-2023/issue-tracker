import React, { useEffect, useMemo, useState } from 'react';

import FilterBar from '@components/FilterBar/FilterBar';
import NavLinks from '@components/NavLinks/NavLinks';
import Button from '@common/Button';
import IssueTable, {
  FilterOptions,
  IssueRow,
} from '@components/IssueTable/IssueTable';
import FilterList from '@components/FilterList/FilterList';
import { BASE_API } from 'src/api';
import { getTimeElapsed } from '@utils/getTimeElapsed';

const MainPage = () => {
  // TODO: 올바른 타입 명시
  const [data, setData] = useState({} as any);
  const [issueItems, setIssueItems] = useState<IssueRow[]>([]);
  const [isOpenIssues, setIsOpenIssues] = useState(true);

  const handleClickStatusTab = (status: boolean) => {
    setIsOpenIssues(status);
  };

  const mapIssues = (data: any) => {
    const issueItems: IssueRow[] = data.issues
      .filter((issue: any) => issue.open === isOpenIssues)
      .map((issue: any) => {
        const elapseTime = issue.open
          ? getTimeElapsed(issue.createdAt)
          : getTimeElapsed(issue.closedAt);

        return {
          ...issue,
          isOpen: issue.open,
          elapseTime,
        };
      });

    setIssueItems(issueItems);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_API}`);
      // const res = await fetch('/issues');
      const data = await res.json();
      if (res.status === 200) {
        setData(data);
        mapIssues(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isOpenIssues]);

  // TODO(Lily): 아래 코드들은 정리 예정
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [page, setPage] = useState(1);
  const BASE_QUERY_STRING = '?offset=10';
  const pageQueryString = `${BASE_QUERY_STRING}&pageNum=${page}`;

  const updateFilterOption = (type: keyof FilterOptions, id: number) => {
    const updatedFilterOptions = { ...filterOptions };

    if (updatedFilterOptions[type] && updatedFilterOptions[type] === id) {
      delete updatedFilterOptions[type];
    } else {
      updatedFilterOptions[type] = id;
    }

    setFilterOptions(updatedFilterOptions);
  };

  const buildQueryString = (filterOptions: FilterOptions): string => {
    const params = [];

    for (const [key, value] of Object.entries(filterOptions)) {
      if (value !== undefined) {
        params.push(`${key}=${value}`);
      }
    }

    return `?${params.join('&')}`;
  };

  const filterQueryString = useMemo(() => {
    return `${pageQueryString}&${buildQueryString(filterOptions)}`;
  }, [filterOptions]);

  useEffect(() => {
    async () => {
      try {
        const res = await fetch(`${BASE_API}/${filterQueryString}`);
        const data = await res.json();

        console.log(data);
        if (res.status === 200) {
          mapIssues(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [filterQueryString]);

  return (
    <>
      <div className="relative mb-6 flex justify-between">
        <FilterBar onClick={() => console.log('')} />
        {/* {isDropdownOpen.filter && (
          <FilterList
            title="이슈"
            items={FILTER_DROPDOWN_LIST}
            onClick={filterIssues}
          />
        )} */}
        <div className="flex gap-x-4">
          <NavLinks
            countAllMilestones={data.countAllMilestones}
            countAllLabels={data.countAllLabels}
          />
          <Button
            title={'이슈 작성'}
            onClick={() => {
              console.log('test');
            }}
            size={'Small'}
            iconName="plus"
            fontSize="text-xs"
          />
        </div>
      </div>
      <IssueTable
        issues={issueItems}
        users={data.userList}
        labels={data.labelList}
        milestones={data.milestoneList}
        countOpenedIssues={data.countOpenedIssues}
        countClosedIssues={data.countClosedIssues}
        status={isOpenIssues}
        filterOptions={filterOptions}
        onStatusTabClick={handleClickStatusTab}
        updateFilterOption={updateFilterOption}
      />
    </>
  );
};

export default MainPage;
