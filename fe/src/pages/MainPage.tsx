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

const MainPage = () => {
  // TODO: 올바른 타입 명시
  const [data, setData] = useState({} as any);
  const [issueItems, setIssueItems] = useState<IssueRow[]>([]);
  const [isOpenIssues, setIsOpenIssues] = useState(true);

  const handleClickStatusTab = (status: boolean) => {
    setIsOpenIssues(status);
  };

  const mapIssues = (data: any) => {
    console.log(data);
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

  // TODO(Lily): 아래 코드들은 정리 예정
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [page, setPage] = useState(1);
  const BASE_QUERY_STRING = 'issues/?';
  const pageQueryString = `${BASE_QUERY_STRING}&pageNum=${page}&`;

  const updateFilterOption = (type: keyof FilterOptions, id: number) => {
    const updatedFilterOptions = { ...filterOptions };

    if (updatedFilterOptions[type] && updatedFilterOptions[type] === id) {
      delete updatedFilterOptions[type];
    } else {
      updatedFilterOptions[type] = id;
    }

    setFilterOptions(updatedFilterOptions);
  };

  useEffect(() => {
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

    fetchData();
  }, [filterOptions]);

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

  const generateFilterString = (
    isOpenIssues: boolean,
    filterOptions: FilterOptions
  ): string => {
    const isOpen = isOpenIssues ? ' is:open' : ' is:close';

    const formattedOptions = Object.entries(filterOptions)
      .map(([key, value]) => `${key}:${value}`)
      .join(' ');

    return `is:issue${isOpen} ${formattedOptions}`;
  };

  const filterString = useMemo(() => {
    return generateFilterString(isOpenIssues, filterOptions);
  }, [filterQueryString]);

  const updatedIssues = async (id: number, checkedIssues: number[]) => {
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

        // 처리할 작업 추가 (응답 확인 등)
        console.log(response);
      } catch (error) {
        // 에러 처리
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_API}${filterQueryString}`);
        const data = await res.json();

        if (res.status === 200) {
          mapIssues(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [filterQueryString]);

  return (
    <>
      <div className="relative mb-6 flex justify-between">
        <FilterBar
          searchValue={filterString}
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
          updateIssueStatus={updatedIssues}
          onStatusTabClick={handleClickStatusTab}
          updateFilterOption={updateFilterOption}
        />
      ) : null}
    </>
  );
};

export default MainPage;
