package com.example.be.issue.dto;

import javax.validation.constraints.NotNull;
import java.util.List;

public class IssueAssignsUpdateFormDTO {

    @NotNull(message = "이슈 번호를 입력해주세요")
    private Integer issueNumber;

    @NotNull(message = "데이터 전송 형식을 지켜주세요")
    private List<String> assignees;

    public Integer getIssueNumber() {
        return issueNumber;
    }

    public void setIssueNumber(Integer issueNumber) {
        this.issueNumber = issueNumber;
    }

    public List<String> getAssignees() {
        return assignees;
    }

    public void setAssignees(List<String> assignees) {
        this.assignees = assignees;
    }
}
