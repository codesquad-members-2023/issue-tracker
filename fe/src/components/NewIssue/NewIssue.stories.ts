import type { Meta, StoryObj } from '@storybook/react';

import NewIssue from '../../pages/NewIssue';

const meta = {
  title: 'NewIssue/NewIssue',
  component: NewIssue,
  argTypes: {},
} satisfies Meta<typeof NewIssue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    user: { userId: 1, userName: 'Lily', profileUrl: '' },
    userList: [],
    labelList: [],
    milestoneList: [],
  },
};
