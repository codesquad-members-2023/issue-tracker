import styled from 'styled-components';
import tempImg from '../../../../assets/userImageSmall.svg';
import DropDown from '../../../DropDown/DropDown';

const TableFilterButtons = () => {
  const assigneeDropDownConfig = {
    buttonText: '담당자',
    headerText: '담당자 필터',
    bodyItems: [
      { text: '담당자가 없는 이슈', checked: false },
      { img: tempImg, text: 'chloe', checked: false },
      { img: tempImg, text: 'head', checked: false },
      { img: tempImg, text: 'sam', checked: false },
      { img: tempImg, text: 'zello', checked: false },
    ],
    bodyCheck: true,
    posright: true,
    marginTop: '10px',
  };

  const labelDropDownConfig = {
    buttonText: '레이블',
    headerText: '레이블 필터',
    bodyItems: [
      { text: '레이블이 없는 이슈', checked: false },
      { img: tempImg, text: 'documentation', checked: false },
      { img: tempImg, text: 'bug', checked: false },
    ],
    bodyCheck: true,
    posright: true,
    marginTop: '10px',
  };

  const milestoneDropDownConfig = {
    buttonText: '마일스톤',
    headerText: '마일스톤 필터',
    bodyItems: [
      { text: '마일스톤이 없는 이슈', checked: false },
      { text: '그룹프로젝트: 이슈트레커', checked: false },
    ],
    bodyCheck: true,
    posright: true,
    marginTop: '10px',
  };

  const authorDropDownConfig = {
    buttonText: '작성자',
    headerText: '작성자 필터',
    bodyItems: [
      { img: tempImg, text: 'chloe', checked: false },
      { img: tempImg, text: 'head', checked: false },
      { img: tempImg, text: 'sam', checked: false },
      { img: tempImg, text: 'zello', checked: false },
    ],
    bodyCheck: true,
    posright: true,
    marginTop: '10px',
  };

  return (
    <TableFilterButtonsBox>
      <DropDown config={assigneeDropDownConfig} />
      <DropDown config={labelDropDownConfig} />
      <DropDown config={milestoneDropDownConfig} />
      <DropDown config={authorDropDownConfig} />
    </TableFilterButtonsBox>
  );
};

export default TableFilterButtons;

const TableFilterButtonsBox = styled.div`
  display: flex;
  gap: 36px;

  color: ${({ theme }) => theme.color.neutralTextWeak};
`;
