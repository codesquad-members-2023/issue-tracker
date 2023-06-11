import styled from 'styled-components';
import Button from '../../../common/Button';

const $CheckBox = styled.button``;

const $IssueStateControls = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const $IssueButtonsWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const $FilterOptions = styled.div`
  display: flex;
  gap: 36px;
`;

const $CheckStatus = styled.div`
  color: ${({ theme }) => theme.colors.neutral.text.weak};
  font-size: ${({ theme }) => theme.fontSize.M.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const $StatusChangeButton = styled(Button)`
  gap: 5px;
  color: ${({ theme, open }) => (open ? theme.colors.danger.text : theme.colors.accent.text.weak)};
  & > p {
    line-height: 13px;
  }
`;

const $IssueListMainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 64px;
  padding: 0px 32px;
`;

export {
  $IssueListMainHeader,
  $CheckBox,
  $IssueStateControls,
  $IssueButtonsWrapper,
  $FilterOptions,
  $CheckStatus,
  $StatusChangeButton,
};
