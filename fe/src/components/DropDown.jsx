import { styled } from 'styled-components';
import DropDownHead from './DropDownHead';
import DropDownBody from './DropDownBody';

const StyledDiv = styled.div`
  position: absolute;
  top: 100%;
  // left를 옵션으로 받기
  left: 0;
  // margin-top 옵션으로 받기
  margin-top: 0.8rem;

  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  width: 24rem;
  border: 1px solid #d9dbe9;
  box-shadow: 0 0 0.8rem rgba(20, 20, 43, 0.04);
  border-radius: 16px;
  background: #d9dbe9;
`;

const DropDown = ({ className }) => {
  return (
    <StyledDiv className={className}>
      <DropDownHead>이슈 필터</DropDownHead>
      <DropDownBody>body</DropDownBody>
    </StyledDiv>
  );
};

export default DropDown;
