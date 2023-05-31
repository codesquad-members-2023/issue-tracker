import React, { useEffect, useMemo, useState } from 'react';

import FilterBar from '@components/FilterBar/FilterBar';
import NavLinks from '@components/NavLinks/NavLinks';
import Button from '@common/Button';
import IssueTable, {
  FilterOptions,
  IssueRow,
} from '@components/IssueTable/IssueTable';
import { BASE_API } from 'src/api';
import { getTimeElapsed } from '@utils/getTimeElapsed';
import { ReactComponent as XSquare } from '@assets/xSquare.svg';

const MainPage = () => {
  const [data, setData] = useState({} as any);
  const [issueItems, setIssueItems] = useState<IssueRow[]>([]);
  const [isOpenIssues, setIsOpenIssues] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [checkedIssues, setCheckedIssues] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const BASE_QUERY_STRING = 'issues/?';
  const pageQueryString = `${BASE_QUERY_STRING}&pageNum=${page}&`;
  const hasFilters = Boolean(
    checkedIssues.length || Object.keys(filterOptions).length
  );

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

  const handleClickStatusTab = (status: boolean) => {
    setIsOpenIssues(status);
  };

  const updateFilterOption = (type: keyof FilterOptions, id: number) => {
    const updatedFilterOptions = { ...filterOptions };

    if (updatedFilterOptions[type] && updatedFilterOptions[type] === id) {
      delete updatedFilterOptions[type];
    } else {
      updatedFilterOptions[type] = id;
    }

    setFilterOptions(updatedFilterOptions);
  };

  const filterQueryString = useMemo(() => {
    const statusOption = isOpenIssues ? 'open' : 'close';
    const queryStrings = {
      status: statusOption,
      ...filterOptions,
    };
    const queryString = Object.entries(queryStrings)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return `${pageQueryString}${queryString}`;
  }, [filterOptions, isOpenIssues, pageQueryString]);

  const generateFilterBarString = (
    isOpenIssues: boolean,
    filterOptions: FilterOptions
  ): string => {
    const isOpen = isOpenIssues ? ' is:open' : ' is:close';

    const formattedOptions = Object.entries(filterOptions)
      .map(([key, value]) => `${key}:${value}`)
      .join(' ');

    return `is:issue${isOpen} ${formattedOptions}`;
  };

  const filterBarString = useMemo(() => {
    return generateFilterBarString(isOpenIssues, filterOptions);
  }, [filterQueryString]);

  const onFilterResetClick = () => {
    setCheckedIssues([]);
    setFilterOptions({});
  };

  const fetchFilteredData = async () => {
    try {
      const res = await fetch(`${BASE_API}${filterQueryString}`);
      const data = await res.json();

      if (res.status === 200) {
        setData(data);
        mapIssues(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatedIssues = async (id: number) => {
    if (!isOpenIssues === Boolean(id)) {
      try {
        const fetchData = checkedIssues.map(checkedIssue => ({
          issueId: checkedIssue,
          isOpen: Boolean(id),
        }));

        console.log(
          JSON.stringify({
            issues: fetchData,
          })
        );
        const response = await fetch(`${BASE_API}issues`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            issues: fetchData,
          }),
        });

        fetchFilteredData();
        setCheckedIssues([]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [filterQueryString]);

  return (
    <>
      <div className="relative mb-[30px] flex justify-between">
        <FilterBar
          searchValue={filterBarString}
          filterOptions={filterOptions}
          updateFilterOption={updateFilterOption}
        />
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
      {hasFilters && (
        <button
          className="mb-[30px] flex items-center"
          onClick={onFilterResetClick}
        >
          <XSquare className="mr-1" stroke="#4E4B66" />
          <span className="text-sm font-bold text-gray-700">
            현재의 검색 필터 및 정렬 지우기
          </span>
        </button>
      )}
      {Object.keys(data).length ? (
        <IssueTable
          issues={issueItems}
          users={data.userList}
          labels={data.labelList}
          milestones={data.milestoneList}
          countOpenedIssues={data.countOpenedIssues}
          countClosedIssues={data.countClosedIssues}
          status={isOpenIssues}
          filterOptions={filterOptions}
          checkedIssues={checkedIssues}
          updateIssueStatus={updatedIssues}
          onStatusTabClick={handleClickStatusTab}
          updateFilterOption={updateFilterOption}
          setCheckedIssues={setCheckedIssues}
        />
      ) : null}
    </>
  );
};

export default MainPage;
