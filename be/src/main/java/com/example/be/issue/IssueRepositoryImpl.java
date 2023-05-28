package com.example.be.issue;

import com.example.be.issue.dto.*;
import com.example.be.issue.mapper.IssueMapper;

import java.util.List;

public class IssueRepositoryImpl implements IssueRepositoryCustom{

    private final IssueMapper issueMapper;

    public IssueRepositoryImpl(IssueMapper issueMapper) {
        this.issueMapper = issueMapper;
    }

    @Override
    public List<Issue> findIssuesWithoutLabelsBy(IssueSearchCondition issueSearchCondition) {
        return issueMapper.findIssuesWithoutLabelsBy(issueSearchCondition);
    }

    @Override
    public int findIssueSize(IssueSearchCondition issueSearchCondition) {
        return issueMapper.findIssueSize(issueSearchCondition);
    }

    @Override
    public int save(IssueCreateFormDTO issueCreateFormDTO) {
        issueMapper.save(issueCreateFormDTO);

        if (issueCreateFormDTO.getLabelNames() != null && issueCreateFormDTO.getLabelNames().size() != 0) {
            issueMapper.saveIssueLabelRelation(issueCreateFormDTO);
        }

        if (issueCreateFormDTO.getAssignees() != null && issueCreateFormDTO.getAssignees().size() != 0) {
            issueMapper.saveAssignee(issueCreateFormDTO);
        }

        return issueCreateFormDTO.getIssueNumber();
    }

    @Override
    public boolean update(IssueUpdateFormDTO issueUpdateFormDTO) {
        if (issueMapper.validIssue(issueUpdateFormDTO.getIssueNumber()) != 1) {
            return false;
        }
        if (issueUpdateFormDTO.getMilestoneName() != null && issueMapper.validMilestone(issueUpdateFormDTO.getMilestoneName()) != 1) {
            return false;
        }
        return issueMapper.updateIssue(issueUpdateFormDTO) == 1;
    }

    @Override
    public boolean updateAssigns(IssueAssignsUpdateFormDTO issueAssignsUpdateFormDTO) {
        // TODO : 사용자 검증 필요
        if (issueMapper.validIssue(issueAssignsUpdateFormDTO.getIssueNumber()) != 1) {
            return false;
        }
        issueMapper.deleteAssigns(issueAssignsUpdateFormDTO);
        if (issueAssignsUpdateFormDTO.getAssignees().size() != 0) {
            return issueMapper.insertAssigns(issueAssignsUpdateFormDTO) == issueAssignsUpdateFormDTO.getAssignees().size();
        }
       return true;
    }
    @Override
    public boolean updateIssueLabelRelation(IssueLabelRelationUpdateFormDTO issueLabelRelationUpdateFormDTO) {

        if (issueMapper.validIssue(issueLabelRelationUpdateFormDTO.getIssueNumber()) != 1) {
            return false;
        }

        if (issueMapper.validLabels(issueLabelRelationUpdateFormDTO.getLabelNames()) != issueLabelRelationUpdateFormDTO.getLabelNames().size()) {
            return false;
        }

        issueMapper.deleteIssueLabelRelation(issueLabelRelationUpdateFormDTO);
        if (issueLabelRelationUpdateFormDTO.getLabelNames().size() != 0) {
            return issueMapper.insertIssueLabelRelation(issueLabelRelationUpdateFormDTO) == issueLabelRelationUpdateFormDTO.getLabelNames().size();
        }
        return true;
    }

}
