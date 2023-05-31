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
    labelList: [
      {
        labelId: 1,
        labelName: 'bug',
        backgroundColor: 'tomato',
        fontColor: '#FFFFFF',
      },
      {
        labelId: 2,
        labelName: 'FE',
        backgroundColor: 'pink',
        fontColor: '#FFFFFF',
      },
      {
        labelId: 3,
        labelName: 'document',
        backgroundColor: '#FF2011',
        fontColor: '#FFFFFF',
      },
    ],
    milestoneList: [
      {
        milestoneId: 1,
        milestoneName: 'FE',
      },
      {
        milestoneId: 2,
        milestoneName: 'BE',
      },
    ],
  },
};
