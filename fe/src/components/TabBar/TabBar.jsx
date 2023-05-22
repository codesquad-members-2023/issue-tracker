import styled from 'styled-components';
import FilterBar from './FilterBar/FilterBar';
import NabTab from './NavTab/NabTab';

const TabBar = ({ filterOptions, setFilterOptions }) => {
  return (
    <TabBarBox>
      <FilterBar
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      <NabTab />
    </TabBarBox>
  );
};

export default TabBar;

const TabBarBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
