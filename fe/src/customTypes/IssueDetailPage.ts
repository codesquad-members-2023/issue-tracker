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
  attachedMilestone: {
    milestoneId: number;
    milestoneName: string;
    countAllIssues: number;
    countAllClosedIssues: number;
    progress: number; // 5(%)
  };
  attachedLabelList: {
    labelId: number;
    labelName: string;
    backgroundColor: string;
    fontColor: string;
  }[];

  attachedAssigneeList: {
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
  userList: {
    // 담당자 필터, 작성자 필터에 같이 사용
    userId: number; // id
    userName: string; // username
    profileUrl: string;
  }[];
  labelList: {
    labelId: number;
    labelName: string;
    backgroundColor: string;
    fontColor: string;
    description: string;
  }[];
  milestoneList: {
    milestoneId: number;
    milestoneName: string;
    description: string;
  }[];
}

export type Issue = IssueDetailData['issue'];
export type AttachedLabelList = IssueDetailData['attachedLabelList'];
export type AttachedMilestone = IssueDetailData['attachedMilestone'];
export type CommentList = IssueDetailData['commentList'];
export type Comment = CommentList[number];
