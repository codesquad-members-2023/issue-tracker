import { styled } from 'styled-components';
import { ReactComponent as CheckOffCircle } from '../../../../assets/checkOffCircle.svg';
import { ReactComponent as CheckOnCircle } from '../../../../assets/checkOnCircle.svg';
import { UserIcon } from '../../../common';

const DropDownBody = ({
  bodyItems, bodyCheck, handleIsOpen, headerText,
}) => {
  const itemList = bodyItems.map(
    ({
      userImage, labelColor, text, handleItemClick, checked, key,
    }) => {
      return (
        <li
          key={key}
          onClick={() => {
            handleIsOpen(false);
            if (typeof handleItemClick !== 'function') return;

            handleItemClick();
          }}
        >
          <IconTextBox checked={checked}>
            {labelColor && <IconLabel labelcolor={labelColor} />}
            {userImage && <UserIcon imgSrc={userImage} />}
            <span>{text}</span>
          </IconTextBox>
          {bodyCheck
            && (checked ? <CheckOnCircleImage /> : <CheckOffCircleImage />)}
        </li>
      );
    },
  );

  return (
    <DropDownBodyList headertext={headerText}>{itemList}</DropDownBodyList>
  );
};

export default DropDownBody;

const CheckOnCircleImage = styled(CheckOnCircle)`
  stroke: ${({ theme }) => theme.color.neutralTextStrong};
`;
const CheckOffCircleImage = styled(CheckOffCircle)`
  stroke: ${({ theme }) => theme.color.neutralTextStrong};
`;

const DropDownBodyList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1px;

  color: ${({ theme }) => theme.color.neutralTextStrong};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.M.size};
  line-height: ${({ theme }) => theme.fontSize.M.lineHeight};
  ${({ headertext }) => (!headertext
    ? 'border-top-left-radius: 16px; border-top-right-radius: 16px;'
    : '')};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  background: ${({ theme }) => theme.color.neutralBorder};

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 8px 16px;
    background: ${({ theme }) => theme.color.neutralBackgroundStrong};
    cursor: pointer;
  }

  li:first-child {
    ${({ headertext }) => (!headertext
    ? 'border-top-left-radius: 16px; border-top-right-radius: 16px;'
    : '')};
  }

  li:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

const IconLabel = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ labelcolor }) => labelcolor};
`;

const IconTextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-weight: ${({ theme, checked }) => (checked ? theme.fontWeight.bold : theme.fontWeight.regular)};
  }
`;
