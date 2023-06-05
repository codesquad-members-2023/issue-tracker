import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../components/CommentList';
import SideBar from '../components/SideBar';
import { ContainerButton, OutlineButton } from '../components/common';
import TitleEditInput from '../components/TitleEditInput';
import { getElapsedTime } from '../utils';
import { NONE } from '../constants';

const IssueDetail = () => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState('');

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const [issueInfo, setIssueInfo] = useState({
    user: {},
    title: '',
    number: null,
    contents: '',
    state: null,
    createdDate: '',
    assignees: [],
    labels: [],
    milestone: null,
  });
  const [comments, setComments] = useState([]);

  const [textAreaValue, setTextAreaValue] = useState('');

  const params = useParams();
  const issueNumber = params.issuenumber;

  const onChange = ({ target }) => setEditTitleValue(target.value);
  const toggleIsEditTitle = () => setIsEditTitle((prev) => !prev);

  const onUserClick = (user) => {
    const newUsers = selectedUsers.some(({ id }) => id === user.id)
      ? selectedUsers.filter(({ id }) => id !== user.id)
      : [...selectedUsers, user];

    fetch('http://3.38.73.117:8080/api/issues/assigns', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        issueNumber,
        assignees: newUsers.map((el) => el.id),
      }),
    })
      .then(() => {
        return fetch(`http://3.38.73.117:8080/api/issue/${issueNumber}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setIssueInfo(data.issue);
        setComments(data.comments);
        setEditTitleValue(data.issue.title);
        setSelectedLabels(data.issue.labels);
        setSelectedUsers(data.issue.assignees);
        setSelectedMilestone(data.issue.milestone);
      });
  };

  const onLabelClick = (label) => {
    const newLabels = selectedLabels.some(({ id }) => id === label.id)
      ? selectedLabels.filter(({ id }) => id !== label.id)
      : [...selectedLabels, label];

    fetch('http://3.38.73.117:8080/api/issues/labels', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        issueNumber,
        labelNames: newLabels.map((el) => el.name),
      }),
    })
      .then(() => {
        return fetch(`http://3.38.73.117:8080/api/issue/${issueNumber}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setIssueInfo(data.issue);
        setComments(data.comments);
        setEditTitleValue(data.issue.title);
        setSelectedLabels(data.issue.labels);
        setSelectedUsers(data.issue.assignees);
        setSelectedMilestone(data.issue.milestone);
      });
  };

  const onMilestoneClick = (milestone) => {
    const newMileStone = selectedMilestone?.id === milestone.id ? null : milestone;

    fetch('http://3.38.73.117:8080/api/issues', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        issueNumber,
        milestoneName: newMileStone?.name || NONE,
      }),
    })
      .then(() => {
        return fetch(`http://3.38.73.117:8080/api/issue/${issueNumber}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setIssueInfo(data.issue);
        setComments(data.comments);
        setEditTitleValue(data.issue.title);
        setSelectedLabels(data.issue.labels);
        setSelectedUsers(data.issue.assignees);
        setSelectedMilestone(data.issue.milestone);
      });
  };

  const onSubmitTitleClick = () => {
    fetch('http://3.38.73.117:8080/api/issues', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        issueNumber,
        title: editTitleValue,
      }),
    })
      .then(() => {
        return fetch(`http://3.38.73.117:8080/api/issue/${issueNumber}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setIssueInfo(data.issue);
        setComments(data.comments);
        setEditTitleValue(data.issue.title);
        setSelectedLabels(data.issue.labels);
        setSelectedUsers(data.issue.assignees);
        setSelectedMilestone(data.issue.milestone);
        setIsEditTitle(false);
      });
  };

  const onSubmitCommentClick = () => {
    fetch(`http://3.38.73.117:8080/api/issues/${issueNumber}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: textAreaValue,
      }),
    })
      .then(() => {
        setTextAreaValue('');

        return fetch(`http://3.38.73.117:8080/api/issue/${issueNumber}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setIssueInfo(data.issue);
        setComments(data.comments);
        setEditTitleValue(data.issue.title);
        setSelectedLabels(data.issue.labels);
        setSelectedUsers(data.issue.assignees);
        setSelectedMilestone(data.issue.milestone);
      });
  };

  const onToggleOpenClick = () => {
    fetch('http://3.38.73.117:8080/api/issues', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        issueNumber,
        state: !issueInfo.state,
      }),
    })
      .then(() => {
        return fetch(`http://3.38.73.117:8080/api/issue/${issueNumber}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setIssueInfo(data.issue);
        setComments(data.comments);
        setEditTitleValue(data.issue.title);
        setSelectedLabels(data.issue.labels);
        setSelectedUsers(data.issue.assignees);
        setSelectedMilestone(data.issue.milestone);
      });
  };

  useEffect(() => {
    fetch(`http://3.38.73.117:8080/api/issue/${issueNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setIssueInfo(data.issue);
        setComments(data.comments);
        setEditTitleValue(data.issue.title);
        setSelectedLabels(data.issue.labels);
        setSelectedUsers(data.issue.assignees);
        setSelectedMilestone(data.issue.milestone);
      });
  }, []);

  const headerContents = isEditTitle ? (
    <>
      <HeaderBox>
        <TitleEditInput value={editTitleValue} onChange={onChange} />
      </HeaderBox>
      <ButtonsBox>
        <OutlineButton onclick={toggleIsEditTitle}>편집 취소</OutlineButton>
        <ContainerButton onclick={onSubmitTitleClick}>
          편집 완료
        </ContainerButton>
      </ButtonsBox>
    </>
  ) : (
    <>
      <HeaderBox>
        <IssueDetailHeader>{issueInfo.title}</IssueDetailHeader>
        <IssueNumberSpan>
          #
          {issueInfo.number}
        </IssueNumberSpan>
      </HeaderBox>
      <ButtonsBox>
        <OutlineButton onclick={toggleIsEditTitle}>제목 편집</OutlineButton>
        <OutlineButton onclick={onToggleOpenClick}>
          {issueInfo.state ? '이슈 닫기' : '이슈 열기'}
        </OutlineButton>
      </ButtonsBox>
    </>
  );

  return (
    <>
      <HeaderButtonsBox>{headerContents}</HeaderButtonsBox>
      <IssueInfoBox>
        <StatusSpan>{issueInfo.state ? '열린 이슈' : '닫힌 이슈'}</StatusSpan>
        <IssueInfoSpan>
          {`이 이슈가 ${getElapsedTime(issueInfo.createdDate)}에 ${
            issueInfo.user.nickname
          }님에 의해 열렸습니다`}
        </IssueInfoSpan>
        <IssueInfoSpan>{`코멘트 ${comments.length}개`}</IssueInfoSpan>
      </IssueInfoBox>
      <SectionBox>
        <IssueDetailBox>
          <CommentList
            issue={issueInfo}
            comments={comments}
            textAreaValue={textAreaValue}
            handleTextAreaChange={({ target }) => setTextAreaValue(target.value)}
          />
          <MyButton
            style={{ alignSelf: 'end' }}
            type="button"
            onClick={onSubmitCommentClick}
          >
            + 코멘트 작성
          </MyButton>
        </IssueDetailBox>
        <SideBox>
          <SideBar
            selectedLabels={selectedLabels}
            onLabelClick={onLabelClick}
            selectedMilestone={selectedMilestone}
            onMilestoneClick={onMilestoneClick}
            selectedUsers={selectedUsers}
            onUserClick={onUserClick}
          />
          <button style={{ alignSelf: 'end' }} type="button">
            이슈 삭제
          </button>
        </SideBox>
      </SectionBox>
    </>
  );
};

export default IssueDetail;

const HeaderButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

const HeaderBox = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 8px;

  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.XXL.size};
  line-height: ${({ theme }) => theme.fontSize.XXL.lineHeight};
`;

const IssueDetailHeader = styled.h1`
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;

const IssueNumberSpan = styled.span`
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;

const ButtonsBox = styled.div`
  display: flex;
  gap: 8px;
`;

const IssueInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IssueInfoSpan = styled.span`
  color: ${({ theme }) => theme.color.neutralTextWeak};
  font-size: ${({ theme }) => theme.fontSize.M.size};
  font-weight: 400;
`;

const SectionBox = styled.section`
  display: flex;
  gap: 34px;

  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.color.neutralBorder};
`;

const IssueDetailBox = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SideBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;

  > button {
    color: ${({ theme }) => theme.color.dangerText};
  }
`;

// TODO: MyButton들 없애기
const MyButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 0px 16px;
  width: 120px;
  height: 40px;
  background: ${({ theme }) => theme.color.accentBackground};
  border-radius: 11px;
  color: ${({ theme }) => theme.color.accentText};
  font-size: ${({ theme }) => theme.fontSize.S.size};
`;

const StatusSpan = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 0px 16px;
  width: 97px;
  height: 32px;
  background: ${({ theme }) => theme.color.iconBackgoundBlue};
  border-radius: 50px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.accentText};
`;
