import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import useFetch from '../../hooks/useFetch';
import { ISSUES } from '../../constants/api';

import Button from '../common/Button';
import Icon from '../common/Icon';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SideBar from '../common/SideBar';
import { $NewIssueForm, $NewIssueFormMain, $UserImg, $InputWrapper, $SubmitButtonWrapper } from './style';

const NewIssueForm = ({ userImgSrc, userData, labelData, milestoneData }) => {
  const [files, setFiles] = useState([]);
  const [issueInfo, setIssueInfo] = useState({
    title: '',
    comment: '',
    assignee: null,
    label: null,
    milestone: null,
  });
  const navigate = useNavigate();

  const { fetchData: postNewIssue, data: newIssue } = useFetch(
    ISSUES.POST_ISSUE,
    'POST',
    {
      issueTitle: issueInfo.title,
      comment: issueInfo.comment,
      assignee: issueInfo.assignee === null ? [] : [issueInfo.assignee],
      label: issueInfo.label === null ? [] : [issueInfo.label],
      milestone: issueInfo.milestone,
    },
    true,
  );

  const changeTitleHandler = ({ target }) => {
    setIssueInfo({ ...issueInfo, title: target.value });
  };
  const changeCommentHandler = ({ target }) => {
    setIssueInfo({ ...issueInfo, comment: target.value });
  };
  const changeAssigneeHandler = (userId) => setIssueInfo({ ...issueInfo, assignee: userId });
  const changeLabelHandler = (labelId) => setIssueInfo({ ...issueInfo, label: labelId });
  const changeMilestoneHandler = (milestoneId) => setIssueInfo({ ...issueInfo, milestone: milestoneId });

  const navigateToIssueList = () => navigate('/');
  const navigateToDetailIssue = () => navigate(`/issues/${newIssue.issueId}`);

  const submitHandler = async (event) => {
    event.preventDefault();

    await postNewIssue();
  };

  const filesUploadHandler = ({ target }) => {
    setFiles([...target.files]);
  };

  useEffect(() => {
    if (!newIssue) return;
    navigateToDetailIssue();
  }, [newIssue]);

  return (
    <$NewIssueForm>
      <$NewIssueFormMain>
        <$UserImg src={userImgSrc} alt="myImg" />
        <$InputWrapper>
          <TextInput id="issueTitle" value={issueInfo.title} onChange={changeTitleHandler} labelText="제목" />
          <TextArea
            id="issueComment"
            value={issueInfo.comment}
            onChange={changeCommentHandler}
            files={files}
            filesUploadHandler={filesUploadHandler}
            size="L"
          />
        </$InputWrapper>
        <SideBar
          assignees={userData}
          labels={labelData}
          milestones={milestoneData}
          changeAssigneeHandler={changeAssigneeHandler}
          changeLabelHandler={changeLabelHandler}
          changeMilestoneHandler={changeMilestoneHandler}
        />
      </$NewIssueFormMain>
      <$SubmitButtonWrapper>
        <Button type="ghost" size="S" onClick={navigateToIssueList}>
          <Icon name="xSquare" />
          <p>작성 취소</p>
        </Button>
        <Button type="contained" size="L" onClick={submitHandler} disabled={issueInfo.title.length === 0}>
          완료
        </Button>
      </$SubmitButtonWrapper>
    </$NewIssueForm>
  );
};

NewIssueForm.propTypes = {
  userImgSrc: PropTypes.string.isRequired,
  userData: PropTypes.array.isRequired,
  labelData: PropTypes.array.isRequired,
  milestoneData: PropTypes.array.isRequired,
};

export default NewIssueForm;
