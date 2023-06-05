import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

export const PageLayout = () => {
  return (
    <PageLayoutBox>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </PageLayoutBox>
  );
};

const PageLayoutBox = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.neutralBackground};
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 80px;
`;
