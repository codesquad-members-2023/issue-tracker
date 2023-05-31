import type { Meta, StoryObj } from '@storybook/react';

import IssueTable from './IssueTable';

const meta = {
  title: 'Main/IssueTable',
  component: IssueTable,
  argTypes: {},
} satisfies Meta<typeof IssueTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    issues: [
      {
        issueId: 1,
        title: 'issue title',
        content: 'issue content',
        userName: 'user name',
        profileUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
        isOpen: true,
        elapseTime: {
          days: 12,
          hours: 2,
          minutes: 49,
          seconds: 22,
        },
        milestoneName: 'milestone name',
        labelList: [
          {
            labelId: 20123,
            labelName: 'title',
            backgroundColor: 'tomato',
            fontColor: 'black',
          },
          {
            labelId: 20123,
            labelName: 'document',
            backgroundColor: 'blue',
            fontColor: 'black',
          },
        ],
      },
      {
        issueId: 2,
        title: 'issue title',
        content: 'issue content',
        userName: 'user name',
        profileUrl:
          'https://lh3.googleusercontent.com/ogw/AOLn63F6B2eAe4HzDtvFPJU2zTjgdOtSHvHt-FnbIYcYgqU=s64-c-mo',
        isOpen: true,
        elapseTime: {
          days: 12,
          hours: 2,
          minutes: 49,
          seconds: 22,
        },
        milestoneName: 'milestone name',
        labelList: [
          {
            labelId: 20123,
            labelName: 'Jayden',
            backgroundColor: 'orange',
            fontColor: 'black',
          },
          {
            labelId: 20123,
            labelName: 'Lily',
            backgroundColor: 'pink',
            fontColor: 'black',
          },
          {
            labelId: 20123,
            labelName: 'FE',
            backgroundColor: 'red',
            fontColor: 'black',
          },
        ],
      },
    ],
    users: [
      {
        userId: 1,
        userName: 'user name',
        profileUrl: '',
      },
    ],
    labels: [
      {
        labelId: 0,
        labelName: 'label1',
        backgroundColor: 'tomato',
        fontColor: 'white',
      },
    ],
    milestones: [
      {
        milestoneId: 0,
        milestoneName: 'milestone1',
        description: '',
      },
    ],
    countOpenedIssues: 10,
    countClosedIssues: 20,
    status: true,
    filterOptions: { filter: 2 },
    checkedIssues: [1, 2, 3],
  },
};

export const Secondary: Story = {
  args: {
    issues: [],
    users: [
      {
        userId: 0,
        userName: '',
        profileUrl: '',
      },
    ],
    labels: [
      {
        labelId: 0,
        labelName: '',
        backgroundColor: '',
        fontColor: '',
      },
    ],
    milestones: [
      {
        milestoneId: 0,
        milestoneName: '',
      },
    ],
    countOpenedIssues: 0,
    countClosedIssues: 0,
    status: true,
    filterOptions: { milestone: 0 },
    checkedIssues: [],
  },
};
