import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import DropDown from '../DropDown';
import { Label, UserIcon } from '../common';

const SideBar = ({
  selectedLabels,
  onLabelClick,
  selectedMilestone,
  onMilestoneClick,
  selectedUsers,
  onUserClick,
  className,
}) => {
  const [users, setUsers] = useState([]);
  const [labels, setLabels] = useState([]);
  const [milestones, setMilestones] = useState([]);

  const usersConfig = {
    buttonText: '담당자',
    bodyItems: users.map((user) => {
      const { imgUrl, id, nickname } = user;

      return {
        key: id,
        userImage: imgUrl,
        text: nickname,
        handleItemClick: () => onUserClick(user),
        checked: selectedUsers.some((selectedUser) => selectedUser.id === id),
      };
    }),
    bodyCheck: true,
    pos: 'center',
    marginTop: '30px',
  };

  const labelsConfig = {
    buttonText: '레이블',
    bodyItems: labels.map((label) => {
      const { backgroundColor, id, name } = label;

      return {
        key: id,
        labelColor: backgroundColor,
        text: name,
        handleItemClick: () => onLabelClick(label),
        checked: selectedLabels.some(
          (selectedLabel) => selectedLabel.id === id,
        ),
      };
    }),
    bodyCheck: true,
    pos: 'center',
    marginTop: '30px',
  };

  const milestonesConfig = {
    buttonText: '마일스톤',
    bodyItems: milestones.map((milestone) => {
      const { id, name } = milestone;

      return {
        key: id,
        text: name,
        handleItemClick: () => onMilestoneClick(milestone),
        checked: selectedMilestone?.id === id,
      };
    }),
    bodyCheck: true,
    pos: 'center',
    marginTop: '30px',
  };

  const fetchAddIssueData = async () => {
    // TODO: url 바꾸기
    const data = await fetch('http://3.38.73.117:8080/api-fe/issues');
    const res = await data.json();

    setLabels(res.allLabels);
    setMilestones(res.allMilestones);
    setUsers(res.allUsers);
  };

  useEffect(() => {
    fetchAddIssueData();
  }, []);

  return (
    <div className={className}>
      <SideBarBox>
        <SideBarRow>
          <SideBarDropDown config={usersConfig} />
          {selectedUsers.map(({ id, imgUrl, nickname }) => {
            return (
              <SelectedDropDownItem key={id}>
                <UserIcon imgSrc={imgUrl} />
                <span>{nickname}</span>
              </SelectedDropDownItem>
            );
          })}
        </SideBarRow>
        <SideBarRow>
          <SideBarDropDown config={labelsConfig} />
          {selectedLabels.map(({
            id, name, textColor, backgroundColor,
          }) => {
            return (
              <SelectedDropDownItem key={id}>
                <Label
                  name={name}
                  textColor={textColor}
                  backgroundColor={backgroundColor}
                />
              </SelectedDropDownItem>
            );
          })}
        </SideBarRow>
        <SideBarRow>
          <SideBarDropDown config={milestonesConfig} />

          {selectedMilestone && (
            <SelectedDropDownItem>
              <span>{selectedMilestone.name}</span>
            </SelectedDropDownItem>
          )}
        </SideBarRow>
      </SideBarBox>
    </div>
  );
};

export default SideBar;

const SideBarBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;

  background: ${({ theme }) => theme.color.neutralBorder};
  border: 1px solid ${({ theme }) => theme.color.neutralBackgroundBold};
  border-radius: 16px;
`;

const SideBarDropDown = styled(DropDown)`
  display: flex;
  justify-content: space-between;

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.M.size};
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;

const SelectedDropDownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.S.size};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;

const SideBarRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  padding: 32px;
  background-color: ${({ theme }) => theme.color.neutralBackgroundStrong};

  &:first-child {
    border-radius: 16px 16px 0 0;
  }

  &:last-child {
    border-radius: 0 0 16px 16px;
  }
`;
