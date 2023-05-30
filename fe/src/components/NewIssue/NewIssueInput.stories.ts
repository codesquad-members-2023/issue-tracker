import type { Meta, StoryObj } from '@storybook/react';

import NewIssueInput from './NewIssueInput';

const meta = {
  title: 'NewIssue/NewIssueInput',
  component: NewIssueInput,
  argTypes: {},
} satisfies Meta<typeof NewIssueInput>;

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
