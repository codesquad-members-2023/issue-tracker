import type { Meta, StoryObj } from '@storybook/react';
import FilterList from './FilterList';

const meta = {
  title: 'Main/FilterList',
  component: FilterList,
} satisfies Meta<typeof FilterList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '이슈',
    items: [
      {
        id: 1,
        name: '열린 이슈',
        isChecked: true,
      },
      {
        id: 2,
        name: '내가 작성한 이슈',
        isChecked: false,
      },
      {
        id: 3,
        name: '나에게 할당된 이슈',
        isChecked: false,
      },
      {
        id: 4,
        name: '내가 댓글을 남긴 이슈',
        isChecked: false,
      },
      {
        id: 5,
        name: '닫힌 이슈',
        isChecked: false,
      },
    ],
  },
};

export const Assignee: Story = {
  args: {
    title: '담당자',
    items: [
      {
        id: 1,
        name: 'Jayden',
        isChecked: false,
        imgUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      },
      {
        id: 2,
        name: 'Chloe',
        isChecked: false,
        imgUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      },
      {
        id: 3,
        name: 'sam',
        isChecked: false,
        imgUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      },
      {
        id: 4,
        name: 'Lily',
        isChecked: false,
        imgUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      },
      {
        id: 5,
        name: 'zello',
        isChecked: false,
        imgUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      },
    ],
    // isNullAvailability: true,
  },
};

export const Label: Story = {
  args: {
    title: '레이블',
    items: [
      {
        id: 1,
        name: 'documentation',
        isChecked: false,
        backgroundColor: 'pink',
      },
      {
        id: 2,
        name: 'bug',
        isChecked: false,
        backgroundColor: 'tomato',
      },
    ],
  },
};

export const Milestone: Story = {
  args: {
    title: '마일스톤',
    items: [
      {
        id: 1,
        name: '그룹프로젝트: 이슈트래커',
        isChecked: false,
      },
    ],
  },
};

export const NoMultipleItems: Story = {
  args: {
    title: '상태 변경',
    items: [
      {
        id: 2,
        name: '선택한 이슈 열기',
        isChecked: false,
      },
      {
        id: 3,
        name: '선택한 이슈 닫기',
        isChecked: false,
      },
    ],
    // isNullAvailability: false,
    // isMultipleItemSelectable: false,
  },
};
