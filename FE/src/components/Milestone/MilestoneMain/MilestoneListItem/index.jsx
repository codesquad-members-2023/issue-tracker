import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useFetch from '../../../../hooks/useFetch';
import { MILESTONES } from '../../../../constants/api';

import Icon from '../../../common/Icon';
import Button from '../../../common/Button';
import MilestoneTable from '../../MilestoneTable';
import {
  $MilestoneListItem,
  $MilestoneInfo,
  $UpsideInfo,
  $MilestoneName,
  $MilestoneDeadline,
  $MilestoneComment,
  $Buttons,
  $MilestoneProgress,
  $MilestoneControl,
  $ProgressInfo,
  $Percent,
  $Issues,
  $OpenIssue,
  $CloseIssue,
} from './style';

const MilestoneListItem = ({ milestone, getNewMilestoneData }) => {
  const [isEdit, setIsEdit] = useState(false);

  const { fetchData: changeMilestoneStatus } = useFetch(
    MILESTONES.PATCH_MILESTONE(milestone.milestoneId),
    'PATCH',
    {
      isopened: !milestone.isopened,
    },
    true,
  );

  const { fetchData: deleteMilestone } = useFetch(
    MILESTONES.DELETE_MILESTONE(milestone.milestoneId),
    'DELETE',
    {},
    true,
  );

  const calculatePercentage = (() => {
    const totalIssues = milestone.openCount + milestone.closeCount;

    if (totalIssues === 0) return 0;
    return Math.ceil((milestone.closeCount / totalIssues) * 100);
  })();

  const editButtonHandler = () => {
    setIsEdit(true);
  };

  const cancelEditHandler = () => {
    setIsEdit(false);
  };

  const changeMilestoneStatusHandler = async () => {
    // TODO: 닫겠습니까? 모달 구현하기.
    await changeMilestoneStatus();
    getNewMilestoneData();
  };

  const deleteMilestoneHandler = async () => {
    // TODO: 마일스톤을 삭제하시겠습니까? 모달 구현.
    await deleteMilestone();
    getNewMilestoneData();
  };

  return isEdit ? (
    <MilestoneTable
      type="edit"
      id={milestone.milestoneId}
      title={milestone.milestoneName}
      deadline={milestone.deadline}
      content={milestone.content}
      cancelClickHandler={cancelEditHandler}
      isOpened={milestone.isopened}
      getNewMilestoneData={getNewMilestoneData}
    />
  ) : (
    <$MilestoneListItem>
      <$MilestoneInfo>
        <$UpsideInfo>
          <Icon name="milestone" fill="#007AFF" />
          <$MilestoneName>{milestone.milestoneName}</$MilestoneName>
          <$MilestoneDeadline>
            <Icon name="calendar" fill="#6E7191" />
            <div>{milestone.deadline ? milestone.deadline : '완료일이 설정되지 않았습니다.'}</div>
          </$MilestoneDeadline>
        </$UpsideInfo>
        {milestone.content && <$MilestoneComment>{milestone.content}</$MilestoneComment>}
      </$MilestoneInfo>
      <$MilestoneControl>
        <$Buttons>
          {milestone.isopened ? (
            <Button type="ghost" size="S" onClick={changeMilestoneStatusHandler}>
              <Icon name="archive" />
              <p>마일스톤 닫기</p>
            </Button>
          ) : (
            <Button type="ghost" size="S" onClick={changeMilestoneStatusHandler}>
              <Icon name="milestone" />
              <p>마일스톤 열기</p>
            </Button>
          )}

          <Button type="ghost" size="S" onClick={editButtonHandler}>
            <Icon name="edit" />
            <p>편집</p>
          </Button>

          <Button type="ghost" size="S" onClick={deleteMilestoneHandler} colorstype="danger" fill="#FF3B30">
            <Icon name="trash" />
            <p>삭제</p>
          </Button>
        </$Buttons>
        <$MilestoneProgress percent={calculatePercentage} />
        <$ProgressInfo>
          <$Percent>{`${calculatePercentage}%`}</$Percent>
          <$Issues>
            <$OpenIssue>{`열린 이슈 ${milestone.openCount}`}</$OpenIssue>
            <$CloseIssue>{`닫힌 이슈 ${milestone.closeCount}`}</$CloseIssue>
          </$Issues>
        </$ProgressInfo>
      </$MilestoneControl>
    </$MilestoneListItem>
  );
};

MilestoneListItem.propTypes = {
  milestone: PropTypes.object.isRequired,
  getNewMilestoneData: PropTypes.func.isRequired,
};

export default MilestoneListItem;
