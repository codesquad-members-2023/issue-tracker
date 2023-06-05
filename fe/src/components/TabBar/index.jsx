import styled from 'styled-components';
import FilterBar from './FilterBar';
import NabTab from './NavTab';

const TabBar = () => {
  return (
    <TabBarBox>
      <FilterBar />
      <NabTab />
    </TabBarBox>
  );
};

export default TabBar;

const TabBarBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
