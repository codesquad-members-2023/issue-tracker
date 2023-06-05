import { useEffect, useContext, useCallback } from 'react';
import TabBar from '../components/TabBar';
import IssueTable from '../components/IssueTable';
import { generateQueryString } from '../utils';
import {
  fetchStart,
  fetchSuccess,
  fetchError,
  setMainPageState,
} from '../context/MainPage/MainPageActions';
import { MainPageFilterContext } from '../context/MainPage/MainPageFilterContext';
import { MainPageStateDispatchContext } from '../context/MainPage/MainPageStateContext';

const IssueList = () => {
  const filterOptions = useContext(MainPageFilterContext);
  const dispatch = useContext(MainPageStateDispatchContext);

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
