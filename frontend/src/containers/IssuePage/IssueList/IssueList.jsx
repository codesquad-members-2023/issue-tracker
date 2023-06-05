import styles from './IssueList.module.css';
import classNames from 'classnames/bind';
import {
  IssueElement,
  IssueListCheckingHeader,
  IssueListHeader,
} from '@containers/index';
import { Empty } from '@components/index';
import { useEffect, useState } from 'react';
import { checkContext } from '@src/services/issue';

export const IssueList = ({
  issueData,
  setIssueData,
  userList,
  assigneeList,
  milestoneList,
  labelList,
  issueCount,
  loading,
}) => {
  const cx = classNames.bind(styles);
  const containerClassNames = cx('container');
  const contentsClassNames = cx('contents');

  const [checkStateObject, setCheckStateObject] = useState([]);

  useEffect(() => {
    const initialCheckState = issueData?.reduce((acc, issue) => {
      acc.push({ issueId: issue.index, isChecked: false });
      return acc;
    }, []);

    setCheckStateObject(initialCheckState);
  }, [issueData]);

  const isCheckedStateNumber =
    checkStateObject?.filter((item) => item.isChecked === true).length ?? 0;

  const [isCheckedHeader, setIsCheckedHeader] = useState(false);

  const handleHeaderCheckState = () => {
    const updatedCheckStateObject = checkStateObject.map((item) => {
      return { ...item, isChecked: !isCheckedHeader };
    });

    setCheckStateObject(updatedCheckStateObject);
    setIsCheckedHeader(!isCheckedHeader);
  };

  useEffect(() => {
    setIsCheckedHeader(false);
  }, [issueData]);

  const isReusltEmpty = issueData?.length !== 0;

  return (
    <checkContext.Provider value={[checkStateObject, setCheckStateObject]}>
      <div className={containerClassNames}>
        {isCheckedStateNumber === 0 ? (
          <IssueListHeader
            userList={userList}
            assigneeList={assigneeList}
            milestoneList={milestoneList}
            issueCount={issueCount}
            labelList={labelList}
            isCheckedHeader={isCheckedHeader}
            handleHeaderCheckState={handleHeaderCheckState}
          ></IssueListHeader>
        ) : (
          <IssueListCheckingHeader
            isCheckedStateNumber={isCheckedStateNumber}
            isCheckedHeader={isCheckedHeader}
            handleHeaderCheckState={handleHeaderCheckState}
            setIssueData={setIssueData}
            checkStateObject={checkStateObject}
          ></IssueListCheckingHeader>
        )}
        <ul className={contentsClassNames}>
          {loading ? (
            <Empty>로딩중</Empty>
          ) : isReusltEmpty ? (
            issueData?.map((issue) => {
              const title = issue.title;
              const label = issue.labelList[0];
              const issueNumber = issue.index;
              const timeStamp = issue.createdAt;
              const writer = issue.writer.name;
              const milesStone = issue.milestone;
              const profileImageUrl = issue.writer.profileImageUrl;
              const iconName =
                issue.status === 'OPEN' ? 'alertCircle' : 'archive';

              return (
                <li key={issueNumber}>
                  <IssueElement
                    iconName={iconName}
                    title={title}
                    label={label}
                    issueId={issueNumber}
                    timeStamp={timeStamp}
                    writer={writer}
                    milesStone={milesStone}
                    profileImageUrl={profileImageUrl}
                  ></IssueElement>
                </li>
              );
            })
          ) : (
            <Empty>검색 결과가 없습니다.</Empty>
          )}
        </ul>
      </div>
    </checkContext.Provider>
  );
};
