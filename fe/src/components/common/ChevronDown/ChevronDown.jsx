import { styled } from 'styled-components';
import { ReactComponent as ChevronDownIcon } from '../../../assets/chevronDown.svg';

export const ChevronDown = ({ children }) => {
  return <ChevronDownImage>{children}</ChevronDownImage>;
};

const ChevronDownImage = styled(ChevronDownIcon)`
  stroke: ${({ theme }) => theme.color.neutralTextStrong};
`;
