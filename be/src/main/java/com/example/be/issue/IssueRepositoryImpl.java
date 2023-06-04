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

        if (issueCreateFormDTO.hasLabels()) {
            issueMapper.saveIssueLabelRelation(issueCreateFormDTO);
        }

        if (issueCreateFormDTO.hasAssigns()) {
            issueMapper.saveAssignee(issueCreateFormDTO);
        }

        return issueCreateFormDTO.getIssueNumber();
    }

    @Override
    public boolean update(IssueUpdateFormDTO issueUpdateFormDTO) {
        if (issueMapper.validIssue(issueUpdateFormDTO.getIssueNumber()) != 1) {
            return false;
        }
        if (issueUpdateFormDTO.getMilestoneName() != null && !issueUpdateFormDTO.getMilestoneName().equals("$none") && issueMapper.validMilestone(issueUpdateFormDTO.getMilestoneName()) != 1) {
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

        // 유효성 검사와 비지니스 로직을 같은 계층에서 하니까 코드가 난잡해지는 것 같습니다.
        // 다음 프로젝트에서는 유효성 검사와 비지니스 로직 부분을 분리하도록 하겠습니다.
        if (issueLabelRelationUpdateFormDTO.getLabelNames().size() == 0) {
            issueMapper.deleteIssueLabelRelation(issueLabelRelationUpdateFormDTO);
            return true;
        }

        if (issueMapper.validLabels(issueLabelRelationUpdateFormDTO.getLabelNames()) != issueLabelRelationUpdateFormDTO.getLabelNames().size()) {
            return false;
        }
        issueMapper.deleteIssueLabelRelation(issueLabelRelationUpdateFormDTO);
        issueMapper.insertIssueLabelRelation(issueLabelRelationUpdateFormDTO);
        return true;
    }

}
