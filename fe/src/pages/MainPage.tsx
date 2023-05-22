import React, { useEffect, useMemo, useState } from 'react';

import Header from '@components/Header/Header';
import FilterBar from '@components/FilterBar/FilterBar';
import NavLinks from '@components/NavLinks/NavLinks';
import Button from '@common/Button';
import IssueTable, { IssueRow } from '@components/IssueTable/IssueTable';
import FilterList from '@components/FilterList/FilterList';
import { api } from 'src/api';
import { FILTER_DROPDOWN_LIST } from '@constants/Mainpage';
import { getTimeElapsed } from '@utils/getTimeElapsed';

export type DropdownItems = {
  filter: boolean;
  assignee: boolean;
  label: boolean;
  milestone: boolean;
  writer: boolean;
};

const MainPage = () => {
  // TODO: 올바른 타입 명시
  const [data, setData] = useState({} as any);
  const [issueItems, setIssueItems] = useState<IssueRow[]>([]);
  const [isOpenIssues, setIsOpenIssues] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<DropdownItems>({
    filter: false,
    assignee: false,
    label: false,
    milestone: false,
    writer: false,
  });

  const handleClickStatusTab = (status: boolean) => {
    setIsOpenIssues(status);
  };

  const handleClickDropdown = (title: keyof typeof isDropdownOpen) => {
    const newIsDropdownOpen = { ...isDropdownOpen };

    for (const key in newIsDropdownOpen) {
      if (key === title) {
        newIsDropdownOpen[key] = !newIsDropdownOpen[key];
      } else {
        newIsDropdownOpen[key as keyof typeof isDropdownOpen] = false;
      }
    }
    setIsDropdownOpen(newIsDropdownOpen);
  };

  const shownIssues: IssueRow[] = useMemo(
    () => issueItems.filter((item: IssueRow) => item.isOpen === isOpenIssues),
    [issueItems]
  );

  const mapIssues = (data: any) => {
    const issueItems: IssueRow[] = data.issues
      .filter((issue: any) => issue.isOpen === isOpenIssues)
      .map((issue: any) => {
        const elapseTime = issue.isOpen
          ? getTimeElapsed(issue.createdAt)
          : getTimeElapsed(issue.closedAt);

        return {
          ...issue,
          elapseTime,
        };
      });

    setIssueItems(issueItems);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${api}`);
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

  return (
    <section className="mx-10 my-[27px]">
      {/* ref: https://ko.javascript.info/optional-chaining */}
      <Header url={data.user?.profileUrl} />
      <div className="relative mb-6 flex justify-between">
        <FilterBar onClick={() => handleClickDropdown('filter')} />
        {isDropdownOpen.filter && (
          <FilterList
            title="이슈"
            items={FILTER_DROPDOWN_LIST}
            isNullAvailability={false}
            onClick={() => {
              console.log('test');
            }}
          />
        )}
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
        users={data.userList}
        labels={data.labelList}
        milestones={data.milestoneList}
        issues={shownIssues}
        countOpenedIssues={data.countOpenedIssues}
        countClosedIssues={data.countClosedIssues}
        onIssueTitleClick={() => console.log('onIssueTitleClick')}
        isDropdownOpen={isDropdownOpen}
        status={isOpenIssues}
        onDropdownTitleClick={handleClickDropdown}
        onStatusTabClick={handleClickStatusTab}
      />
    </section>
  );
};

export default MainPage;
