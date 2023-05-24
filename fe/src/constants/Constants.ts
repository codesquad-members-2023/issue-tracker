export const FILTER_DROPDOWN_LIST = [
  {
    id: 0,
    name: '열린 이슈',
    onFilterItemClick: () => console.log(''),
  },
  {
    id: 1,
    name: '내가 작성한 이슈',
    onFilterItemClick: () => console.log(''),
  },
  {
    id: 2,
    name: '나에게 할당된 이슈',
    onFilterItemClick: () => console.log(''),
  },
  {
    id: 3,
    name: '내가 댓글을 남긴 이슈',
    onFilterItemClick: () => console.log(''),
  },
  {
    id: 4,
    name: '닫힌 이슈',
    onFilterItemClick: () => console.log(''),
  },
];

export const ISSUE_OPTIONS = {
  ISSUE: '이슈',
  ASSIGNEE: '담당자',
  LABEL: '레이블',
  MILESTONE: '마일스톤',
  WRITER: '작성자',
};
