import type { Meta, StoryObj } from '@storybook/react';

import NewIssueOptions from './NewIssueOptions';

const meta = {
  title: 'NewIssue/NewIssueOptions',
  component: NewIssueOptions,
  argTypes: {},
} satisfies Meta<typeof NewIssueOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
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
    labelList: [],
    milestoneList: [],
  },
};
