import styled from 'styled-components';
import SelectedItem from './SelectedItem';

const $SelectedItem = styled(SelectedItem)`
  margin-top: 18px;
`;

const $SideBarMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${({ isselected }) => (isselected ? '132px' : '96px')};
  padding: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border.default};
`;

export { $SideBarMenu, $SelectedItem };
