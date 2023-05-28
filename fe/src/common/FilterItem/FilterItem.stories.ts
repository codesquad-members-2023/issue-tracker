import type { Meta, StoryObj } from '@storybook/react';
import FilterItem from './FilterItem';

const meta = {
  title: 'Common/FilterItem',
  component: FilterItem,
} satisfies Meta<typeof FilterItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    item: {
      id: 123123,
      name: 'Lily',
      isClicked: false,
      imgUrl:
        'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
      width: 20,
      height: 20,
      isMultipleItemSelectable: true,
    },
    onItemClick: () => console.log(''),
  },
};

export const Secondary: Story = {
  args: {
    item: {
      id: 13213,
      name: '열린이슈',
      isClicked: false,
      imgUrl: '',
      width: 16,
      height: 16,
      isMultipleItemSelectable: true,
    },
    onItemClick: () => console.log(''),
  },
};

export const noImageUrl: Story = {
  args: {
    item: {
      id: 123425,
      name: 'assignee',
      isClicked: true,
      imgUrl: '',
      isMultipleItemSelectable: true,
    },
    onItemClick: () => console.log(''),
  },
};

export const backgroundColorItem: Story = {
  args: {
    item: {
      id: 123425,
      name: 'assignee',
      isClicked: false,
      backgroundColor: 'red',
    },
    onItemClick: () => console.log(''),
  },
};
