package com.example.be.issue;

import com.example.be.issue.dto.*;

import java.util.List;

public interface IssueRepositoryCustom {

    List<Issue> findIssuesWithoutLabelsBy(IssueSearchCondition issueSearchCondition);

    int findIssueSize(IssueSearchCondition issueSearchCondition);

    int save(IssueCreateFormDTO issueCreateFormDTO);

    boolean update(IssueUpdateFormDTO issueUpdateFormDTO);

    boolean updateAssigns(IssueAssignsUpdateFormDTO issueAssignsUpdateFormDTO);

    boolean updateIssueLabelRelation(IssueLabelRelationUpdateFormDTO issueLabelRelationUpdateFormDTO);

}
