package com.example.be.issue.mapper;

import com.example.be.issue.Issue;
import com.example.be.issue.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IssueMapper {
    List<Issue> findIssuesWithoutLabelsBy(IssueSearchCondition issueSearchCondition);

    int findIssueSize(IssueSearchCondition issueSearchCondition);

    void save(IssueCreateFormDTO issueCreateFormDTO);

    void saveIssueLabelRelation(IssueCreateFormDTO issueCreateFormDTO);

    void saveAssignee(IssueCreateFormDTO issueCreateFormDTO);

    int updateIssue(IssueUpdateFormDTO issueUpdateFormDTO);

    int validIssue(int issueNumber);

    int validMilestone(String milestoneName);

    int validLabels(List<String> labelNames);

    int insertAssigns(IssueAssignsUpdateFormDTO issueAssignsUpdateFormDTO);

    void deleteAssigns(IssueAssignsUpdateFormDTO issueAssignsUpdateFormDTO);

    int insertIssueLabelRelation(IssueLabelRelationUpdateFormDTO issueMilestoneUpdateFormDTO);

    void deleteIssueLabelRelation(IssueLabelRelationUpdateFormDTO issueMilestoneUpdateFormDTO);

}
