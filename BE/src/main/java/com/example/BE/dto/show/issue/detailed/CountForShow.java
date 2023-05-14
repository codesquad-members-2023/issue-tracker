package com.example.BE.dto.show.issue.detailed;

public class CountForShow {

    private int openedIssuesCount;
    private int closedIssuesCount;
    private int labelsCount;
    private int milestoneCount;

    public CountForShow(int openedIssuesCount, int closedIssuesCount, int labelsCount, int milestoneCount) {
        this.openedIssuesCount = openedIssuesCount;
        this.closedIssuesCount = closedIssuesCount;
        this.labelsCount = labelsCount;
        this.milestoneCount = milestoneCount;
    }

    public int getOpenedIssuesCount() {
        return openedIssuesCount;
    }

    public int getClosedIssuesCount() {
        return closedIssuesCount;
    }

    public int getLabelsCount() {
        return labelsCount;
    }

    public int getMilestoneCount() {
        return milestoneCount;
    }
}
