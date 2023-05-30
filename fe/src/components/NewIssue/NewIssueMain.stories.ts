import type { Meta, StoryObj } from '@storybook/react';

import NewIssueMain from './NewIssueMain';

const meta = {
  title: 'NewIssue/NewIssueMain',
  component: NewIssueMain,
  argTypes: {},
} satisfies Meta<typeof NewIssueMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    user: { userId: 1, userName: 'Lily', profileUrl: '' },
    UserList: [],
    labelList: [],
    milestoneList: [],
  },
};
