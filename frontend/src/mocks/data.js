import { MY_USER_DATA } from '@constants/user';

export const members = [
  {
    profile: '',
    name: '담당자가 없는 이슈',
    index: 0,
  },
  {
    ...MY_USER_DATA,
  },
  {
    id: 'sarang_daddy',
    profile: 'https://avatars.githubusercontent.com/u/109648042?v=4',
    name: '사랑대디',
    index: 2,
  },
  {
    id: 'lvalentine6',
    profile: 'https://avatars.githubusercontent.com/u/77956808?v=4',
    name: '로이',
    index: 3,
  },
  {
    id: 'new-pow',
    profile: 'https://avatars.githubusercontent.com/u/103120173?v=4',
    name: '이린',
    index: 4,
  },
];

export const labels = [
  {
    index: 0,
    title: '레이블이 없는 이슈입니다.',
    description: null,
    backgroundColor: null,
    style: null,
  },
  {
    index: 1,
    title: 'UI',
    description: '이것은 레이블1입니다.',
    backgroundColor: '#2ecc71',
    style: 'outline',
  },
  {
    index: 2,
    title: '레이블입니다.',
    description: '이것은 레이블2입니다.',
    backgroundColor: '#2ecc71',
    style: 'solid',
  },
  {
    index: 3,
    title: '작소 화이팅',
    description: '이것은 레이블3입니다.',
    backgroundColor: '#3498db',
    style: 'solid',
  },
  {
    index: 4,
    title: '로눅스를 아십니까?',
    description: '이것은 레이블4입니다.',
    backgroundColor: '#f39c12',
    style: 'solid',
  },
];

export const milestones = [
  {
    index: 0,
    title: '마일스톤이 없는 이슈',
    endDate: null,
    contents: null,
    totalIssueNum: null,
    closedIssueNum: null,
    isClosed: null,
  },
  {
    index: 1,
    title: 'Sample Title 1',
    endDate: '2023-06-20',
    contents: 'Sample contents 1',
    totalIssueNum: 10,
    closedIssueNum: 5,
    isClosed: false,
  },
  {
    index: 2,
    title: 'Sample Title 2',
    endDate: '2023-07-22',
    contents: 'Sample contents 2',
    totalIssueNum: 8,
    closedIssueNum: 3,
    isClosed: false,
  },
  {
    index: 3,
    title: 'Sample Title 3',
    endDate: '2023-09-25',
    contents: 'Sample contents 3',
    totalIssueNum: 15,
    closedIssueNum: 12,
    isClosed: false,
  },
];

// 테스트용 mock issueList 데이터
export const issueList = [
  {
    index: 1,
    title: '새 기능 추가',
    comment: [
      {
        writer: members[0],
        contents: '새 기능 추가에 대한 의견입니다.',
      },
      {
        writer: members[1],
        contents: '새 기능 추가에 대한 또 다른 의견입니다.',
      },
    ],
    writer: members[1],
    assignee: members[0],
    label: labels[0],
    milestone: milestones[1],
    status: 'open',
    editedTime: '2023-05-16T15:02:07.759Z',
  },
  {
    index: 2,
    title: '버그 수정',
    comment: [
      {
        writer: members[2],
        contents: '버그 수정에 대한 의견입니다.',
      },
    ],
    writer: members[2],
    assignee: members[1],
    label: labels[1],
    milestone: milestones[1],
    status: 'open',
    editedTime: '2021-12-30T09:45:55.773Z',
  },
  {
    index: 3,
    title: 'UI 개선',
    comment: [
      {
        writer: members[3],
        contents: 'UI 개선에 대한 의견입니다.',
      },
    ],
    writer: members[2],
    assignee: members[4],
    label: labels[2],
    milestone: milestones[2],
    status: 'open',
    editedTime: '2023-05-16T12:02:07.759Z',
  },
  {
    index: 4,
    title: '새로운 사용자 지정 필드 추가',
    comment: [
      {
        writer: members[3],
        contents: '새로운 사용자 지정 필드 추가에 대한 의견입니다.',
      },
    ],
    writer: members[3],
    assignee: members[3],
    label: labels[3],
    milestone: milestones[0],
    status: 'open',
    editedTime: '2022-08-03T07:52:11.306Z',
  },
  {
    index: 5,
    title: '새로운 사용자 지정 필드 추가',
    comment: [
      {
        writer: members[1],
        contents: '새로운 사용자 지정 필드 추가에 대한 의견입니다.',
      },
    ],
    writer: members[1],
    assignee: members[2],
    label: labels[1],
    milestone: milestones[1],
    status: 'open',
    editedTime: '2022-03-11T21:16:39.612Z',
  },
  {
    index: 6,
    title: '검색 기능 개선',
    comment: [
      {
        writer: members[1],
        contents: '검색 기능 개선에 대한 의견입니다.',
      },
    ],
    writer: members[2],
    assignee: members[1],
    label: labels[0],
    milestone: milestones[3],
    status: 'open',
    editedTime: '2023-05-12T15:02:07.759Z',
  },
  {
    index: 7,
    title: '새로운 보고서 템플릿 추가',
    comment: [
      {
        writer: members[3],
        contents: '새로운 보고서 템플릿 추가에 대한 의견입니다.',
      },
    ],
    writer: members[1],
    assignee: members[2],
    label: labels[2],
    milestone: milestones[2],
    status: 'open',
    editedTime: '2022-02-01T04:33:06.209Z',
  },
  {
    index: 8,
    title: '새로운 기능에 대한 사용자 테스트 추가',
    comment: [
      {
        writer: members[2],
        contents: '새로운 기능에 대한 사용자 테스트에 대한 의견입니다.',
      },
    ],
    writer: members[2],
    assignee: members[0],
    label: labels[3],
    milestone: milestones[0],
    status: 'close',
    editedTime: '2023-03-19T09:21:34.126Z',
  },
  {
    index: 9,
    title: '새로운 기능에 대한 성능 테스트 추가',
    comment: [
      {
        writer: members[2],
        contents: '새로운 기능에 대한 성능 테스트에 대한 의견입니다.',
      },
    ],
    writer: members[1],
    assignee: members[1],
    label: labels[0],
    milestone: milestones[1],
    status: 'close',
    editedTime: '2021-10-25T12:08:49.904Z',
  },
];

export const loginToken = {
  message: 'login success',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYzODEyMjEsImdpdGh1YmlkIjoicmVhbHNub29wc28iLCJkaXNwbGF5TmFtZSI6IlNub29wIFNvIiwiZW1haWwiOiJyZWFsQHNub29wLnNvIiwicHJvZmlsZVBob3RvIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91Lzk2MzgxMjIxP3Y9NCIsIm5hbWUiOiLshozrr7zqsr0iLCJwaG9uZU51bWJlciI6bnVsbCwiY2VydGlmaWNhdGlvbiI6dHJ1ZSwiY2VydGlmaWNhdGlvbkNvZGUiOm51bGwsImNvZGVFeHBpcmF0aW9uVGltZSI6bnVsbCwicm9sZSI6bnVsbCwiaWF0IjoxNjg0NzM1NTg1LCJleHAiOjE2ODczMjc1ODUsImlzcyI6ImNvZGVzcXVhZC5rciIsInN1YiI6IlVzZXJJbmZvIn0._YPBGJddRV9PFp9S7MlNWECzn9t4hoidu1huEZCIKwk',
};
