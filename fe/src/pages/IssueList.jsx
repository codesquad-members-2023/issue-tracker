import { useEffect, useContext, useCallback } from 'react';
import TabBar from '../components/TabBar/TabBar';
import IssueTable from '../components/IssueTable/IssueTable';
import {
  MainPageContext,
  MainPageDispatchContext,
} from '../context/MainPage/MainPageContext';
import { generateQueryString } from '../utils/utils';
import {
  fetchStart,
  fetchSuccess,
  fetchError,
  setMainPageState,
} from '../context/MainPage/MainPageActions';

const IssueList = () => {
  const { filterOptions } = useContext(MainPageContext);
  const dispatch = useContext(MainPageDispatchContext);

  const queryString = generateQueryString(filterOptions);

  const fetchMainPageData = useCallback(async () => {
    dispatch(fetchStart());
    try {
      const url = `http://3.38.73.117:8080/api-fe/issues${queryString}`;

      const response = await fetch(url);
      const mainPageData = await response.json();

      dispatch(setMainPageState(mainPageData));
      dispatch(fetchSuccess());
    } catch (error) {
      // TODO(덴): 에러발생시 진행할 로직 구현 고민하기.(PR질문) ex. 개발자향, 사용자향 UI?
      // ? navigate 개념 이용 ?
      dispatch(fetchError(error));
    }
  }, [dispatch, filterOptions]);

  useEffect(() => {
    fetchMainPageData();
  }, [fetchMainPageData]);

  return (
    <>
      <TabBar />
      <IssueTable />
    </>
  );
};

export default IssueList;
