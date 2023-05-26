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
    title: 'filter',
    items: [
      {
        id: 1,
        name: '열린 이슈',
        isClicked: true,
      },
      {
        id: 2,
        name: '내가 작성한 이슈',
        isClicked: false,
      },
      {
        id: 3,
        name: '나에게 할당된 이슈',
        isClicked: false,
      },
      {
        id: 4,
        name: '내가 댓글을 남긴 이슈',
        isClicked: false,
      },
      {
        id: 5,
        name: '닫힌 이슈',
        isClicked: false,
      },
    ],
    isOpen: false,
  },
};

export const Assignee: Story = {
  args: {
    title: 'assignee',
    items: [
      {
        id: 1,
        name: 'Jayden',
        isClicked: false,
        imgUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      },
      {
        id: 2,
        name: 'Chloe',
        isClicked: false,
        imgUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      },
      {
        id: 3,
        name: 'sam',
        isClicked: false,
        imgUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      },
      {
        id: 4,
        name: 'Lily',
        isClicked: false,
        imgUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      },
      {
        id: 5,
        name: 'zello',
        isClicked: false,
        imgUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      },
    ],
    isOpen: false,
    // isNullAvailability: true,
  },
};

export const Label: Story = {
  args: {
    title: 'label',
    items: [
      {
        id: 1,
        name: 'documentation',
        isClicked: false,
        backgroundColor: 'pink',
      },
      {
        id: 2,
        name: 'bug',
        isClicked: false,
        backgroundColor: 'tomato',
      },
    ],
    isOpen: false,
  },
};

export const Milestone: Story = {
  args: {
    title: 'milestone',
    items: [
      {
        id: 1,
        name: '그룹프로젝트: 이슈트래커',
        isClicked: false,
      },
    ],
    isOpen: false,
  },
};

export const NoMultipleItems: Story = {
  args: {
    title: 'filter',
    items: [
      {
        id: 2,
        name: '선택한 이슈 열기',
        isClicked: false,
      },
      {
        id: 3,
        name: '선택한 이슈 닫기',
        isClicked: false,
      },
    ],
    isOpen: false,
    // isNullAvailability: false,
    // isMultipleItemSelectable: false,
  },
};
