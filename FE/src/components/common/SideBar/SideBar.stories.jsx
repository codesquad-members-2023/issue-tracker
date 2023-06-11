import React from 'react';
import SideBar from '.';

const meta = {
  title: 'Side Bar',
  component: SideBar,
};

export default meta;

const Template = (args) => <SideBar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  assignees: [
    { userId: 1, name: '고뭉남', url: 'https://avatars.githubusercontent.com/u/77562698?v=4' },
    { userId: 2, name: '니노', url: 'https://avatars.githubusercontent.com/u/95615105?v=4' },
    { userId: 3, name: '에이든', url: 'https://avatars.githubusercontent.com/u/115064144?v=4' },
    { userId: 4, name: '아켄', url: 'https://avatars.githubusercontent.com/u/96980857?v=4' },
    { userId: 5, name: '솔', url: 'https://avatars.githubusercontent.com/u/86761640?v=4' },
    { userId: 6, name: '훈딩', url: 'https://avatars.githubusercontent.com/u/56246060?v=4' },
  ],

  labels: [
    {
      labelId: 1,
      labelName: 'docs',
      backgroundColor: '#0025E6',
      fontColor: 'light',
    },
    {
      labelId: 2,
      labelName: 'bug',
      backgroundColor: '#DE4123',
      fontColor: 'dark',
    },
    {
      labelId: 3,
      labelName: 'enhancement',
      backgroundColor: '#50C878',
      fontColor: 'dark',
    },
    {
      labelId: 4,
      labelName: 'task',
      backgroundColor: '#FFD700',
      fontColor: 'dark',
    },
  ],

  milestones: [
    { milestoneId: 1, milestoneName: 'NewMilestone' },
    { milestoneId: 2, milestoneName: 'IssueTracker' },
  ],
};
