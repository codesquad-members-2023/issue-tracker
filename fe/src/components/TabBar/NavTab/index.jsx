import styled from 'styled-components';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContainerButton, GhostButton } from '../../common';
import { ReactComponent as label } from '../../../assets/label.svg';
import { ReactComponent as mileStone } from '../../../assets/mileStone.svg';
import { ReactComponent as plus } from '../../../assets/plus.svg';
import { MainPageStateContext } from '../../../context/MainPage/MainPageStateContext';

const NabTab = () => {
  const { allLabels, allMilestones } = useContext(MainPageStateContext);

  const totalLabel = allLabels?.length > 0 ? allLabels.length : 0;
  const totalMileStone = allMilestones?.length > 0 ? allMilestones.length : 0;

  return (
    <NabTabBox>
      <div>
        <GhostButton
          size="S"
          gap="4px"
          color="neutralText"
          backgroundColor="neutralBackground"
          hoverColor="neutralTextWeak"
        >
          <LableIcon />
          {`레이블(${totalLabel})`}
        </GhostButton>
        <GhostButton
          size="S"
          gap="4px"
          color="neutralText"
          backgroundColor="neutralBackground"
          hoverColor="neutralTextWeak"
        >
          <MileStoneIcon />
          {`마일스톤(${totalMileStone})`}
        </GhostButton>
      </div>
      <Link to="/add-issue">
        <ContainerButton>
          <PlusIcon />
          이슈작성
        </ContainerButton>
      </Link>
    </NabTabBox>
  );
};

export default NabTab;

const NabTabBox = styled.div`
  display: flex;
  gap: 16px;

  > div {
    display: flex;
    justify-content: space-around;

    width: 321px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.color.neutralBorder};
    border-radius: 11px;

    > button {
      width: 100%;
      border-radius: 11px 0px 0px 11px;
    }

    > button:last-child {
      border-left: 1px solid ${({ theme }) => theme.color.neutralBorder};
      border-radius: 0px 11px 11px 0px;
    }
  }
`;

const LableIcon = styled(label)`
  stroke: ${({ theme }) => theme.color.neutralText};
`;

const MileStoneIcon = styled(mileStone)`
  fill: ${({ theme }) => theme.color.neutralText};
`;

const PlusIcon = styled(plus)`
  stroke: ${({ theme }) => theme.color.accentText};
`;
