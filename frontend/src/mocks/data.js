import { MY_USER_DATA } from '@constants/user';

export const issueList = [
  {
    issueId: '1',
    title: '새 기능 추가',
    comment: [
      {
        writer: {
          ...MY_USER_DATA,
        },
        contents: '새 기능 추가에 대한 의견입니다.',
      },
      {
        writer: {
          id: '2',
          profile: 'https://assets.themiilk.com/test/test-profile1.png',
          name: 'Jane Doe',
        },
        contents: '새 기능 추가에 대한 또 다른 의견입니다.',
      },
    ],
    writer: {
      ...MY_USER_DATA,
    },
    assignee: null,
    label: {
      title: 'UI',
      description: '이것은 UI 레이블입니다.',
      style: 'outline',
    },
    milestone: {
      id: '1',
      title: '사랑이는 귀엽다',
      endDate: '2023-05-16T15:02:07.759Z',
      contents: '이것은 마일스톤 1의 내용입니다.',
      totalIssueNum: 10,
      closedIssueNum: 5,
      isClosed: false,
    },
    status: 'open',
    editedTime: '2023-05-16T15:02:07.759Z',
    index: 0,
  },
  {
    issueId: '2',
    title: '버그 수정',
    comment: [
      {
        writer: {
          id: '3',
          profile: 'https://assets.themiilk.com/test/test-profile1.png',
          name: 'Peter Smith',
        },
        contents: '버그 수정에 대한 의견입니다.',
      },
    ],
    writer: {
      ...MY_USER_DATA,
    },
    assignee: {
      ...MY_USER_DATA,
    },
    label: {
      title: 'UI',
      description: '이것은 UI 레이블입니다.',
      backgroundColor: '#8bf6c4',
      style: 'solid',
    },
    milestone: {
      id: '1',
      title: '스눕',
      endDate: '2023-05-16T15:02:07.759Z',
      contents: '이것은 마일스톤 1의 내용입니다.',
      totalIssueNum: 10,
      closedIssueNum: 5,
      isClosed: false,
    },
    status: 'open',
    editedTime: '2021-12-30T09:45:55.773Z',
    index: 1,
  },
  {
    issueId: '3',
    title: 'UI 개선',
    comment: [
      {
        writer: {
          id: '4',
          profile: 'https://assets.themiilk.com/test/test-profile1.png',
          name: 'Mary Jones',
        },
        contents: 'UI 개선에 대한 의견입니다.',
      },
    ],
    writer: {
      id: '3',
      profile: 'https://assets.themiilk.com/test/test-profile1.png',
      name: 'Peter Smith',
    },
    assignee: null,
    label: {
      title: 'UI',
      description: '이것은 UI 레이블입니다.',
      backgroundColor: 'skyblue',
      style: 'solid',
    },
    milestone: {
      id: '1',
      title: '마일스톤',
      endDate: '2023-05-16T15:02:07.759Z',
      contents: '이것은 마일스톤 1의 내용입니다.',
      totalIssueNum: 10,
      closedIssueNum: 5,
      isClosed: false,
    },
    status: 'open',
    editedTime: '2023-05-16T12:02:07.759Z',
    index: 2,
  },
  {
    issueId: '4',
    title: '새로운 사용자 지정 필드 추가',
    comment: [
      {
        writer: {
          id: '5',
          profile: 'https://assets.themiilk.com/test/test-profile1.png',
          name: 'David Jones',
        },
        contents: '새로운 사용자 지정 필드 추가에 대한 의견입니다.',
      },
    ],
    writer: {
      id: '4',
      profile: 'https://assets.themiilk.com/test/test-profile1.png',
      name: 'Mary Jones',
    },
    assignee: null,
    label: {
      title: 'UI',
      description: '이것은 UI 레이블입니다.',
      backgroundColor: 'blue',
      textColor: 'white',
      style: 'solid',
    },
    milestone: {
      id: '1',
      title: '취업 할 수 있을까',
      endDate: '2023-05-16T15:02:07.759Z',
      contents: '이것은 마일스톤 1의 내용입니다.',
      totalIssueNum: 10,
      closedIssueNum: 5,
      isClosed: false,
    },
    status: 'open',
    editedTime: '2022-08-03T07:52:11.306Z',
    index: 3,
  },
  {
    issueId: '5',
    title: '새로운 사용자 지정 필드 추가',
    comment: [
      {
        writer: {
          id: '5',
          profile: 'https://assets.themiilk.com/test/test-profile1.png',
          name: 'David Jones',
        },
        contents: '새로운 사용자 지정 필드 추가에 대한 의견입니다.',
      },
    ],
    writer: {
      id: '4',
      profile: 'https://assets.themiilk.com/test/test-profile1.png',
      name: 'Mary Jones',
    },
    assignee: null,
    label: {
      title: 'UI',
      description: '이것은 UI 레이블입니다.',
      backgroundColor: 'green',
      textColor: 'white',
      style: 'solid',
    },
    milestone: {
      id: '1',
      title: '프런트 화이팅',
      endDate: new Date(),
      contents: '이것은 마일스톤 1의 내용입니다.',
      totalIssueNum: 10,
      closedIssueNum: 5,
      isClosed: false,
    },
    status: 'open',
    editedTime: '2022-03-11T21:16:39.612Z',
    index: 3,
  },
  {
    issueId: '6',
    title: '검색 기능 개선',
    comment: [
      {
        writer: {
          id: '6',
          profile: 'https://assets.themiilk.com/test/test-profile1.png',
          name: 'Sarah Smith',
        },
        contents: '검색 기능 개선에 대한 의견입니다.',
      },
    ],
    writer: {
      id: '5',
      profile: 'https://assets.themiilk.com/test/test-profile1.png',
      name: 'David Jones',
    },
    assignee: null,
    label: {
      title: 'UI',
      description: '이것은 UI 레이블입니다.',
      backgroundColor: 'pink',
      textColor: 'white',
      style: 'solid',
    },
    milestone: {
      id: '1',
      title: '크롱',
      endDate: '2023-05-16T15:02:07.759Z',
      contents: '이것은 마일스톤 1의 내용입니다.',
      totalIssueNum: 10,
      closedIssueNum: 5,
      isClosed: false,
    },
    status: 'open',
    editedTime: '2023-05-12T15:02:07.759Z',
    index: 4,
  },
  {
    issueId: '7',
    title: '새로운 보고서 템플릿 추가',
    comment: [
      {
        writer: {
          id: '7',
          profile: 'https://assets.themiilk.com/test/test-profile1.png',
          name: 'Michael Anderson',
        },
        contents: '새로운 보고서 템플릿 추가에 대한 의견입니다.',
      },
    ],
    writer: {
      id: '6',
      profile: 'https://assets.themiilk.com/test/test-profile1.png',
      name: 'Sarah Smith',
    },
    assignee: null,
    label: {
      title: 'UI',
      description: '이것은 UI 레이블입니다.',
      backgroundColor: 'blue',
      textColor: 'white',
      style: 'solid',
    },
    milestone: {
      id: '1',
      title: '리액트 어려워',
      endDate: '2023-05-16T15:02:07.759Z',
      contents: '이것은 마일스톤 1의 내용입니다.',
      totalIssueNum: 10,
      closedIssueNum: 5,
      isClosed: false,
    },
    status: 'open',
    editedTime: '2022-02-01T04:33:06.209Z',
    index: 5,
  },
  {
    issueId: '8',
    title: '새로운 기능에 대한 사용자 테스트 추가',
    comment: [
      {
        writer: {
          id: '8',
          profile: 'https://assets.themiilk.com/test/test-profile1.png',
          name: 'John Doe',
        },
        contents: '새로운 기능에 대한 사용자 테스트에 대한 의견입니다.',
      },
    ],
    writer: {
      id: '7',
      profile: 'https://assets.themiilk.com/test/test-profile1.png',
      name: 'Michael Anderson',
    },
    assignee: null,
    label: {
      title: 'UI',
      description: '이것은 UI 레이블입니다.',
      backgroundColor: 'tomato',
      textColor: 'white',
      style: 'outline',
    },
    milestone: {
      id: '1',
      title: '마일스톤이 모에용',
      endDate: '2023-05-16T15:02:07.759Z',
      contents: '이것은 마일스톤 1의 내용입니다.',
      totalIssueNum: 10,
      closedIssueNum: 5,
      isClosed: false,
    },
    status: 'open',
    editedTime: '2023-03-19T09:21:34.126Z',
    index: 6,
  },
  {
    issueId: '9',
    title: '새로운 기능에 대한 성능 테스트 추가',
    comment: [
      {
        writer: {
          id: '9',
          profile: 'https://assets.themiilk.com/test/test-profile1.png',
          name: 'Jane Doe',
        },
        contents: '새로운 기능에 대한 성능 테스트에 대한 의견입니다.',
      },
    ],
    writer: {
      id: '8',
      profile: 'https://assets.themiilk.com/test/test-profile1.png',
      name: 'John Doe',
    },
    assignee: null,
    label: {
      title: 'UI',
      description: '이것은 UI 레이블입니다.',
      backgroundColor: 'blue',
      textColor: 'white',
      style: 'outline',
    },
    milestone: {
      id: '1',
      title: '스눕바보',
      endDate: '2023-05-16T15:02:07.759Z',
      contents: '이것은 마일스톤 1의 내용입니다.',
      totalIssueNum: 10,
      closedIssueNum: 5,
      isClosed: false,
    },
    status: 'close',
    editedTime: '2021-10-25T12:08:49.904Z',
    index: 7,
  },
];

export const members = [
  {
    id: 'sarang_daddy',
    profile: 'https://avatars.githubusercontent.com/u/109648042?v=4',
    name: '사랑대디',
  },
  {
    id: 'lvalentine6',
    profile: 'https://avatars.githubusercontent.com/u/77956808?v=4',
    name: '로이',
  },
  {
    id: 'new-pow',
    profile: 'https://avatars.githubusercontent.com/u/103120173?v=4',
    name: '이린',
  },
  {
    id: 'realsnoopso',
    profile: 'https://ca.slack-edge.com/T74H5245A-U04FHDY4DFV-1a828514d33d-512',
    name: '스눕소',
  },
];
