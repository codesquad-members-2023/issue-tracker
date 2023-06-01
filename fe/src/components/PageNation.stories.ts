import type { Meta, StoryObj } from '@storybook/react';

import PageNation from './PageNation';

const meta = {
  title: 'Main/PageNation',
  component: PageNation,
  argTypes: {},
} satisfies Meta<typeof PageNation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    issueCount: 5,
  },
};
