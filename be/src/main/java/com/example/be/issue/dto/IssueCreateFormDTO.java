package com.example.be.issue.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

public class IssueCreateFormDTO {

    private int issueNumber;
    private String userId;
    @NotBlank(message = "이슈 제목을 입력해주세요.")
    @Size(max = 45, message = "이슈 제목의 길이는 45자를 넘을 수 없습니다.")
    private String title;
    @Size(max = 16777215, message = "이슈 내용의 길이는 1677,7215자를 넘을 수 없습니다.")
    private String contents;
    private List<String> assignees;
    private String milestoneName;
    private List<String> labelNames;

    public IssueCreateFormDTO(String title, String contents, List<String> assignees, String milestoneName, List<String> labelNames) {
        this.title = title;
        this.contents = contents;
        this.assignees = assignees;
        this.milestoneName = milestoneName;
        this.labelNames = labelNames;
    }

    public int getIssueNumber() {
        return issueNumber;
    }

    public void setIssueNumber(int issueNumber) {
        this.issueNumber = issueNumber;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public String getContents() {
        return contents;
    }

    public List<String> getAssignees() {
        return assignees;
    }

    public String getMilestoneName() {
        return milestoneName;
    }

    public List<String> getLabelNames() {
        return labelNames;
    }

    public void setAssignees(List<String> assignees) {
        this.assignees = assignees;
    }

    public void setMilestoneName(String milestoneName) {
        this.milestoneName = milestoneName;
    }

    public void setLabelNames(List<String> labelNames) {
        this.labelNames = labelNames;
    }
}
