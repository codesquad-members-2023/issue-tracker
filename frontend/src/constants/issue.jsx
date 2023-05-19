import { MY_USER_DATA } from './user';

export const tabDatas = Object.freeze([
  Object.seal({ text: '레이블', icon: 'label', id: 'label', count: 0 }),
  Object.seal({
    text: '마일스톤',
    icon: 'milestone',
    id: 'milestone',
    count: 0,
  }),
]);

export const STATUS = { OPEN: 'open', CLOSE: 'close' };

export const FILTER_KEYS = {
  STATUS: 'status',
  PAGE: 'page',
  ASSIGNEE: 'assignee',
  LABEL: 'label',
  MILESTONE: 'milestone',
  WRITER: 'writer',
  COMMENT_BY: 'commentBy',
};

export const initialFilter = Object.seal({
  [FILTER_KEYS.STATUS]: 'open',
  [FILTER_KEYS.PAGE]: 0,
  [FILTER_KEYS.ASSIGNEE]: null,
  [FILTER_KEYS.LABEL]: null,
  [FILTER_KEYS.MILESTONE]: null,
  [FILTER_KEYS.WRITER]: null,
  [FILTER_KEYS.COMMENT_BY]: null,
});

export const options = Object.freeze([
  Object.freeze({
    index: 0,
    contents: '열린 이슈',
    filter: Object.freeze({ status: STATUS.OPEN }),
  }),
  Object.freeze({
    index: 1,
    contents: '내가 작성한 이슈',
    filter: Object.freeze({ writer: MY_USER_DATA.index }),
  }),
  Object.freeze({
    index: 2,
    contents: '나에게 할당된 이슈',
    filter: Object.freeze({ assignee: MY_USER_DATA.index }),
  }),
  Object.freeze({
    index: 3,
    contents: '내가 댓글을 남긴 이슈',
    filter: Object.freeze({ commentBy: MY_USER_DATA.index }),
  }),
  Object.freeze({
    index: 4,
    contents: '닫힌 이슈',
    filter: Object.freeze({ status: STATUS.CLOSE }),
  }),
]);

export const labels = Object.freeze([
  Object.freeze({
    id: '1',
    contents: 'documentation',
  }),
  Object.freeze({
    id: '2',
    contents: 'bug',
    filter: Object.freeze({ writer: MY_USER_DATA.id }),
  }),
]);

export const writers = Object.freeze([
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
    ...MY_USER_DATA,
  },
]);

export const milestones = Object.freeze([
  Object.freeze({
    id: '1',
    contents: '마일스톤이 없는 이슈',
    filter: Object.freeze({ status: STATUS.OPEN }),
  }),
  Object.freeze({
    id: '2',
    contents: '그룹프로젝트:이슈트레커',
    filter: Object.freeze({ writer: MY_USER_DATA.id }),
  }),
]);
