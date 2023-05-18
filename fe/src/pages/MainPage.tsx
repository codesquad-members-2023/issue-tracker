import React, { useEffect, useMemo, useState } from 'react';

import Header from '@components/Header/Header';
import FilterBar from '@components/FilterBar/FilterBar';
import NavLinks from '@components/NavLinks/NavLinks';
import Button from '@common/Button';
import IssueList, { IssueRow } from '@components/IssueList/IssueList';
import FilterList from '@components/FilterList/FilterList';

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

  const fetchData = async () => {
    try {
      const res = await fetch('/issues');
      const data = await res.json();

      if (res.status === 200) {
        setData(data);
        setIssueItems(data.issues);
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
            items={[
              {
                id: 231,
                title: '열린 이슈',
              },
              {
                id: 131232,
                title: '내가 작성한 이슈',
              },
              {
                id: 1223,
                title: '나에게 할당된 이슈',
              },
              {
                id: 1223,
                title: '내가 댓글을 남긴 이슈',
              },
              {
                id: 1223,
                title: '닫힌 이슈',
              },
            ]}
            isNullAvailability={false}
            onClick={() => {
              console.log('test');
            }}
          />
        )}
        <div className="flex gap-x-5">
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
          />
        </div>
      </div>
      <IssueList
        issues={shownIssues}
        countOpenedIssues={data.countOpenedIssues}
        countClosedIssues={data.countOpenedIssues}
        onIssueTitleClick={() => console.log('onIssueTitleClick')}
        isDropdownOpen={isDropdownOpen}
        onDropdownTitleClick={handleClickDropdown}
        onStatusTabClick={handleClickStatusTab}
      />
    </section>
  );
};

export default MainPage;
