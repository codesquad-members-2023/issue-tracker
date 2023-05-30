import styled from 'styled-components';
import { useContext } from 'react';
import CheckBox from './CheckBox/CheckBox';
import IssueItem from './IssueItem/IssueItem';
import IssueStatusButtons from './TableToolBar/IssueStatusButtons/IssueStatusButtons';
import TableFilterButtons from './TableToolBar/TableFilterButtons/TableFilterButtons';
import TableToolBar from './TableToolBar/TableToolBar';
import {
  MainPageContext,
  MainPageDispatchContext,
  mainPageInitialState,
} from '../../context/MainPage/MainPageContext';
import { Button } from '../common';
import { OPENED, RESET } from '../../constants';
import { ReactComponent as xSquare } from '../../assets/xSquare.svg';
import { setFilterOption } from '../../context/MainPage/MainPageActions';

const IssueTable = () => {
  const { issues, filterOptions, loading } = useContext(MainPageContext);
  const dispatch = useContext(MainPageDispatchContext);

  let content;

  if (loading) {
    // TODO(덴): 스피너 기능에 대한 고민 필요. 굳이 필요한가?
    // content = <Spinner />;
  } else if (issues.length) {
    content = issues.map((issue) => (
      <IssueItem key={issue.number} {...issue} />
    ));
  } else {
    content = <NoticeBox>검색과 일치하는 결과가 없습니다.</NoticeBox>;
  }

  const isFilterApplied = Object.values(filterOptions).some(
    (option) => option !== null
      && option !== false
      && option.length > 0
      && option !== OPENED,
  );

  return (
    <div>
      {isFilterApplied ? (
        <FilterNoticeBox>
          <Button
            type="ghostButton"
            size="S"
            gap="7px"
            color="neutralText"
            hoverColor="iconBackgoundBlue"
            onclick={() => {
              dispatch(
                setFilterOption(RESET, mainPageInitialState.filterOptions),
              );
            }}
          >
            <XSquare />
            현재의 검색 필터 및 정렬 지우기
          </Button>
        </FilterNoticeBox>
      ) : (
        ''
      )}
      <TableToolBar>
        <CheckBox />
        <IssueStatusButtons />
        <TableFilterButtons />
      </TableToolBar>
      <IssueItemList>{content}</IssueItemList>
    </div>
  );
};

export default IssueTable;

const FilterNoticeBox = styled.div`
  height: 38px;
`;

const XSquare = styled(xSquare)`
  stroke: ${({ theme }) => theme.color.neutralText};
`;

const IssueItemList = styled.ul`
  display: flex;
  flex-direction: column;

  height: auto;
  border-radius: 0px 0px 16px 16px;

  > div {
    height: 100px;
    border-right: 1px solid ${({ theme }) => theme.color.neutralBorder};
    border-left: 1px solid ${({ theme }) => theme.color.neutralBorder};
    border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
  }

  > li {
    border-right: 1px solid ${({ theme }) => theme.color.neutralBorder};
    border-left: 1px solid ${({ theme }) => theme.color.neutralBorder};
    border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
  }

  > li:last-child {
    border-radius: 0px 0px 16px 16px;
  }
`;

const NoticeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.M.size};
  color: ${({ theme }) => theme.color.neutralTextWeak};
  background-color: ${({ theme }) => theme.color.neutralBackgroundStrong};
  border-radius: 0px 0px 16px 16px;
`;
