import { styled } from 'styled-components';
import { Header } from '../Header/Header';

export const PageLayout = ({ children }) => {
  return (
    <PageLayoutBox>
      <Header />
      <Content>{children}</Content>
    </PageLayoutBox>
  );
};

const PageLayoutBox = styled.div`
  background-color: ${({ theme }) => theme.color.neutralBackground};
  height: 100vh;
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 80px;
`;
