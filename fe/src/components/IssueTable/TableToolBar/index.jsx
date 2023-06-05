import styled from 'styled-components';

const TableToolBar = ({ children }) => {
  return <TableToolBarBox>{children}</TableToolBarBox>;
};

export default TableToolBar;

const TableToolBarBox = styled.div`
  display: flex;
  align-items: center;

  gap: 33px;
  padding: 24px;

  height: 64px;
  background-color: ${({ theme }) => theme.color.neutralBackground};
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-radius: 16px 16px 0px 0px;
`;
