import React, { useEffect, useState } from 'react';

import NewIssueMain from '../components/NewIssue/NewIssueMain';
import NewIssueNav from '../components/NewIssue/NewIssueNav';
import { BASE_API } from 'src/api';
import { Options } from '../components/NewIssue/NewIssueOptions';
import { useNavigate } from 'react-router-dom';

const dummyData = {
  user: {
    ...JSON.parse(localStorage.getItem('token') as string),
  },
  userList: [
    {
      userId: 1,
      userName: 'Lily',
      profileUrl: '111',
    },
    {
      userId: 2,
      userName: 'Lily',
      profileUrl: '111',
    },
    {
      userId: 3,
      userName: 'Lily',
      profileUrl: '111',
    },
    {
      userId: 4,
      userName: 'Lily',
      profileUrl: '111',
    },
  ],
  labelList: [
    {
      labelId: 1,
      labelName: 'bug',
      backgroundColor: 'tomato',
      fontColor: '#FFFFFF',
    },
    {
      labelId: 2,
      labelName: 'FE',
      backgroundColor: 'pink',
      fontColor: '#FFFFFF',
    },
    {
      labelId: 3,
      labelName: 'document',
      backgroundColor: '#FF2011',
      fontColor: '#FFFFFF',
    },
  ],
  milestoneList: [
    {
      milestoneId: 1,
      milestoneName: 'FE',
      progress: 50,
    },
    {
      milestoneId: 2,
      milestoneName: 'BE',
      progress: 10,
    },
  ],
};

const NewIssue: React.FC = () => {
  const [user, setUser] = useState(dummyData.user);
  const [optionList, setOptionList] = useState({
    userList: [],
    labelList: [],
    milestoneList: [],
  });

  const [issueTitle, setIssueTitle] = useState('');
  const [issueContent, setIssueContent] = useState('');
  const [options, setOptions] = useState<Options>({
    assignee: 0,
    label: 0,
    milestone: 0,
  });
  const issueStates = {
    issueTitle,
    setIssueTitle,
    issueContent,
    setIssueContent,
  };
  const optionsState = {
    options,
    setOptions,
  };
  const isChanged = Boolean(
    issueTitle || issueContent || Object.values(options).some(value => value)
  );
  const navigate = useNavigate();

  const moveToHome = () => {
    navigate('/');
  };

  const newIssueData = () => {
    const assignee = options.assignee ? [{ userId: options.assignee }] : null;
    const label = options.label ? [{ labelId: options.label }] : null;
    const milestone = options.milestone ? options.milestone : null;

    return {
      title: issueTitle,
      content: issueContent,
      userId: user.id,
      userList: assignee,
      labelList: label,
      milestoneId: milestone,
    };
  };

  const postNewIssue = async () => {
    const temp = await fetch(`${BASE_API}issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIssueData()),
    });
    if (temp.ok) {
      setIssueTitle('');
      setIssueContent('');
      moveToHome();
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_API}issues/create`);
      const data = await res.json();

      if (res.status === 200) {
        setOptionList({
          userList: data.userList,
          labelList: data.labelList,
          milestoneList: data.milestoneList,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    setUser({
      ...JSON.parse(localStorage.getItem('token') as string),
    });
  }, []);

  return (
    <div>
      <header className="text-2xl text-gray-900">새로운 이슈 작성</header>
      <NewIssueMain
        user={user}
        userList={optionList.userList}
        labelList={optionList.labelList}
        milestoneList={optionList.milestoneList}
        issueStates={issueStates}
        optionsState={optionsState}
      />
      <NewIssueNav
        isChanged={isChanged}
        onCancelClick={moveToHome}
        onSubmitClick={postNewIssue}
      />
    </div>
  );
};

export default NewIssue;
