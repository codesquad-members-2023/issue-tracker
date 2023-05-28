import FilterBar from './filterBar/FilterBar';
import styled from 'styled-components';
import Button from '../../../components/common/button/Button';
import PlusIcon from '../../../assets/icons/PlusIcon.svg';
import Tab from '../../../components/common/tabs/Tabs';
import { Link } from 'react-router-dom';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 29px;
  margin-bottom: 24px;
`;

const SubNavBlock = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const Nav = () => {
  return (
    <NavContainer>
      <FilterBar />
      <SubNavBlock>
        <Tab />
        <Link to="/addIssue">
          <Button type="container" size="medium">
            <img src={PlusIcon} />
            이슈 작성
          </Button>
        </Link>
      </SubNavBlock>
    </NavContainer>
  );
};

export default Nav;
