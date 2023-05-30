import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, UserIcon } from '../components/common';
import largeUserImage from '../assets/userImageLarge.svg';
import SideBar from '../components/SideBar/SideBar';
import CommentTextArea from '../components/CommentTextArea/CommentTextArea';
import TitleInput from '../components/TitleInput/TitleInput';

const AddIssue = () => {
  const [form, setForm] = useState({ title: '', comment: '' });

  // TODO: 여기부터
  const [users, setUsers] = useState([]);
  const [labels, setLabels] = useState([]);
  const [milestones, setMilestones] = useState([]);
  // TODO: 여기까지 sidebar로 상태 내리기

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const navigate = useNavigate();

  const onChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const onUserClick = (user) => {
    setSelectedUsers(
      selectedUsers.some(({ id }) => id === user.id)
        ? selectedUsers.filter(({ id }) => id !== user.id)
        : [...selectedUsers, user],
    );
  };

  const onLabelClick = (label) => {
    setSelectedLabels(
      selectedLabels.some(({ id }) => id === label.id)
        ? selectedLabels.filter(({ id }) => id !== label.id)
        : [...selectedLabels, label],
    );
  };

  const onMilestoneClick = (milestone) => {
    setSelectedMilestone(
      selectedMilestone?.id === milestone.id ? null : milestone,
    );
  };

  // TODO: 이름 바꾸기
  // TODO: loader로 뺄지 고민해보기?
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

  const createIssue = () => {
    const body = {
      title: form.title,
      contents: form.comment,
      assignees: selectedUsers.map(({ id }) => id),
      milestoneName: selectedMilestone?.id,
      labelNames: selectedLabels.map(({ id }) => id),
    };

    // TODO: 서버에 물어보고 서버 문제면 지우기 (빈 배열일 경우 cors 오류 뜸)
    if (body.assignees.length === 0) {
      delete body.assignees;
    }

    if (body.labelNames.length === 0) {
      delete body.labelNames;
    }

    // TODO: async await으로 바꾸기
    fetch('http://3.38.73.117:8080/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        // TODO: 에러메시지 바꾸기
        // TODO: navigate 주소 상세 페이지로 바꾸기
        if (!res.ok) {
          console.log(res);
          throw new Error('에러');
        }
        navigate('/');
      })
      .catch((e) => {
        // TODO: 에러처리 바꾸기
        console.log(e);
      });
  };

  return (
    <>
      <AddIssueHeader>새로운 이슈 작성</AddIssueHeader>
      <SectionBox>
        <UserIcon large imgSrc={largeUserImage} />
        <InputBox>
          <AddIssueTitleInput
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="제목"
          />
          <AddIssueCommentTextArea
            name="comment"
            value={form.comment}
            onChange={onChange}
            placeholder="코멘트를 입력하세요"
          />
        </InputBox>
        <SideBar
          labels={labels}
          selectedLabels={selectedLabels}
          onLabelClick={onLabelClick}
          milestones={milestones}
          selectedMilestone={selectedMilestone}
          onMilestoneClick={onMilestoneClick}
          users={users}
          selectedUsers={selectedUsers}
          onUserClick={onUserClick}
        />
      </SectionBox>
      <ButtonBox>
        <Link to="/">
          <Button type="ghostButton" size="M">
            x 작성 취소
          </Button>
        </Link>
        <MyButton disabled={form.title.length <= 0} onClick={createIssue}>
          완료
        </MyButton>
      </ButtonBox>
    </>
  );
};

export default AddIssue;

const AddIssueHeader = styled.h1`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.XXL.size};
  line-height: ${({ theme }) => theme.fontSize.XXL.lineHeight};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;

const SectionBox = styled.div`
  display: flex;
  gap: 24px;

  border-top: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
  padding: 24px 0;
`;

const InputBox = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 500px;
`;

const AddIssueTitleInput = styled(TitleInput)`
  height: 56px;
`;

const AddIssueCommentTextArea = styled(CommentTextArea)`
  flex-grow: 1;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  gap: 32px;
`;

// TODO: 나중에 제거하기..
const MyButton = styled.button`
  padding: 12px 24px;
  width: 240px;
  height: 56px;
  background: ${({ theme }) => theme.color.accentBackground};
  border-radius: 16px;

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.L.size};
  color: ${({ theme }) => theme.color.accentText};

  &:hover {
    opacity: ${({ disabled }) => (disabled ? '1' : '0.8')};
  }
`;
