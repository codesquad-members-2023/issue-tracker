import styled from 'styled-components';
import Button from '../button/Button';

const TabContainer = styled.div`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 16px;
  height: 40px;
  display: flex;
  border-radius: 11px;
  border: 1px solid #d9dbe9;
`;

const Tab = () => {
  return (
    <TabContainer>
      <Button type="ghost" size="medium">
        레이블(2)
      </Button>
      <Button type="ghost" size="medium">
        마일스톤(3)
      </Button>
    </TabContainer>
  );
};

export default Tab;
