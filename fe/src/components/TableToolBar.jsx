import styled from 'styled-components';

const TableToolBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1280px;
  height: 64px;
  background: #f7f7fc;
  border-radius: 16px 16px 0px 0px;
  border: 1px solid #d9dbe9;
  font-size: 16px;
`;

const TableToolBar = (props) => {
  const { children } = props;
  return <TableToolBarContainer>{children}</TableToolBarContainer>;
};

export default TableToolBar;
