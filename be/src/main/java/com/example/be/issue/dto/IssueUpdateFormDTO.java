package com.example.be.issue.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class IssueUpdateFormDTO {

    @NotNull(message = "이슈 번호를 입력해주세요")
    private Integer issueNumber;

    private Boolean state;
    @NotBlank(message = "이슈 제목을 입력해주세요.")
    @Size(max = 45, message = "이슈 제목의 길이는 45자를 넘을 수 없습니다.")
    private String title;
    @Size(max = 16777215, message = "이슈 내용의 길이는 1677,7215자를 넘을 수 없습니다.")
    private String contents;
    private String milestoneName;

    public int getIssueNumber() {
        return issueNumber;
    }

    public void setIssueNumber(int issueNumber) {
        this.issueNumber = issueNumber;
    }

    public Boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getMilestoneName() {
        return milestoneName;
    }

    public void setMilestoneName(String milestoneName) {
        this.milestoneName = milestoneName;
    }

}
