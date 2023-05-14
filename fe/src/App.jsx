import { useState } from 'react';
import FilterBar from './components/FilterBar';
import GlobalStyles from './components/GlobalStyles';
import IssueTable from './components/IssueTable';

const App = () => {
  const [issues, setIssues] = useState([]);
  const [counts, setCounts] = useState({
    openedIssueCount: 0,
    closedIssueCount: 0,
    totalLabelCount: 0,
    milestoneCount: 0,
  });
  const [filterOptions, setFilterOptions] = useState({
    isOpened: true,
    // writtenByMe: false,
    // assignedToMe: false,
    // commentedByMe: false,
    // assignee: null,
    // labels: [],
    // milestone: null,
    // author: null,
  });

  return (
    <div>
      <GlobalStyles />
      <FilterBar filterOptions={filterOptions} />
      <IssueTable
        openedIssueCount={counts.openedIssueCount}
        closedIssueCount={counts.closedIssueCount}
        isOpened={filterOptions.isOpened}
      />
    </div>
  );
};
export default App;
