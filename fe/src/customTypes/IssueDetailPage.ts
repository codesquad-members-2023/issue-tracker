export interface IssueDetailData {
  issue: {
    issueId: number;
    title: string;
    content: string;
    userName: string;
    profileUrl: string;
    open: boolean;
    createdAt: string;
    closedAt: string;
  };
  milestone: {
    milestoneId: number;
    milestoneName: string;
    countAllIssues: number;
    countAllClosedIssues: number;
    progress: number; // 5(%)
  };
  labelList: {
    labelId: number;
    labelName: string;
    backgroundColor: string;
    fontColor: string;
  }[];

  assigneeList: {
    userId: number;
    userName: string;
    profileUrl: string;
  }[];
  commentList: {
    commentId: number;
    userId: number; // 본인 코멘트인지 판단할 때
    userName: string;
    profileUrl: string;
    content: string;
    createdAt: string;
    updateAt: string;
  }[];
}

export type CommentList = IssueDetailData['commentList'];

export type Comment = CommentList[number];

export type Issue = IssueDetailData['issue'];
