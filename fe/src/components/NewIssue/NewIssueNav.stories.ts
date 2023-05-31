import type { Meta, StoryObj } from '@storybook/react';

import NewIssueNav from './NewIssueNav';

const meta = {
  title: 'NewIssue/NewIssueNav',
  component: NewIssueNav,
  argTypes: {},
} satisfies Meta<typeof NewIssueNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isChanged: false,
  },
};
