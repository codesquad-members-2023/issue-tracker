import { styled } from 'styled-components';

const DropDownContent = ({ children, pos, marginTop }) => {
  return (
    <DropDownContentBox pos={pos} margintop={marginTop}>
      {children}
    </DropDownContentBox>
  );
};

export default DropDownContent;

const DropDownContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  position: absolute;

  z-index: 1;
  width: 240px;
  background: ${({ theme }) => theme.color.neutralBorder};
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  box-shadow: 0px 0px 8px rgba(20, 20, 43, 0.04);
  border-radius: 16px;

  ${({ margintop }) => `margin-top:  ${margintop || '10px'}`};
  ${({ pos }) => {
    if (pos === 'right') {
      return 'right: 0';
    }
    if (pos === 'center') {
      return 'left: 50%; transform: translateX(-50%);';
    }

    return 'left: 0';
  }}
`;
