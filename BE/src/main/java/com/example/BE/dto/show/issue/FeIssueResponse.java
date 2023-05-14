package com.example.BE.dto.show.issue;

import com.example.BE.dto.show.issue.detailed.CountForShow;
import com.example.BE.dto.show.issue.detailed.FeSimpleIssue;

import java.util.List;

public class FeIssueResponse {

    private List<FeSimpleIssue> issues;
    private CountForShow counts;

    public FeIssueResponse(List<FeSimpleIssue> issues, CountForShow counts) {
        this.issues = issues;
        this.counts = counts;
    }

    public List<FeSimpleIssue> getIssues() {
        return issues;
    }

    public CountForShow getCounts() {
        return counts;
    }
}
