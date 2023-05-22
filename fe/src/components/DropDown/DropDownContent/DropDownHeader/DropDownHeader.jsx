import { styled } from 'styled-components';

const DropDownHeader = ({ headerText }) => {
  return <DropDownHeaderBox>{headerText}</DropDownHeaderBox>;
};

export default DropDownHeader;

const DropDownHeaderBox = styled.div`
  padding: 8px 16px;
  background: ${({ theme }) => theme.color.neutralBackground};
  border-radius: 16px 16px 0px 0px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.S.size};
  line-height: ${({ theme }) => theme.fontSize.S.lineHeight};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;
