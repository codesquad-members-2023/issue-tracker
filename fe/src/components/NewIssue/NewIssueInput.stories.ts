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
    issueStates: {
      issueTitle: 'issue1',
      setIssueTitle: () => console.log('setIssueTitle'),
      issueContent: 'issue1',
      setIssueContent: () => console.log('setIssueContent'),
    },
  },
};
