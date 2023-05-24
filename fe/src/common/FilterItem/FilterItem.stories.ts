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
    id: 123123,
    name: 'Lily',
    isClicked: false,
    imgUrl:
      'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
    width: 20,
    height: 20,
  },
};

export const Secondary: Story = {
  args: {
    id: 13213,
    name: '열린이슈',
    isClicked: false,
    imgUrl: '',
    width: 16,
    height: 16,
    isMultipleItemSelectable: true,
  },
};

export const noImageUrl: Story = {
  args: {
    id: 123425,
    name: 'assignee',
    isClicked: true,
    imgUrl: '',
  },
};

export const backgroundColorItem: Story = {
  args: {
    id: 123425,
    name: 'assignee',
    isClicked: false,
    backgroundColor: 'red',
  },
};
