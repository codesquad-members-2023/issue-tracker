package com.issuetracker.dto.issue;

import lombok.Getter;
import lombok.Setter;

@Getter
public class IssueMilestoneDto {
    private int milestoneId;
    private String milestoneName;
    private int countAllIssues;
    private int countAllClosedIssues;
    private int progress;

    public int getProgress() {
        //마일스톤 진행률을 반환합니다.
        return 100 * countAllClosedIssues / countAllIssues;
    }
}
