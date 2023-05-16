import React from 'react';
import List from '.';

const meta = {
  title: 'List',
  component: List,
};

export default meta;

const Template = (args) => {
  return <List {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
  issueId: 1,
  issueTitle: '[FE]: Creating Components',
  labels: [
    {
      labelId: 1,
      labelName: 'docs',
      backgroundColor: '#0025E6',
      textColor: 'light',
    },
  ],
  writer: {
    name: '훈딩',
    createdAt: '2023-05-16T09:10:35.145Z',
  },
  milestone: 'GroupProject:IssueTracker',
};
