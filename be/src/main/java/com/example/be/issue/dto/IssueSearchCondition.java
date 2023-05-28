package com.example.be.issue.dto;

import java.util.List;

public class IssueSearchCondition {

    private String author;
    private List<String> assignees;
    private List<String> labelNames;
    private String milestoneName;
    private Boolean state;
    private int startIndex;
    private int cntPerPage;

    public IssueSearchCondition() {
    }

    public IssueSearchCondition(String author, List<String> assignees, List<String> labelNames, String milestoneName, Boolean state) {
        this.author = author;
        this.assignees = assignees;
        this.labelNames = labelNames;
        this.milestoneName = milestoneName;
        this.state = state;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<String> getAssignees() {
        return assignees;
    }

    public void setAssignees(List<String> assignees) {
        this.assignees = assignees;
    }

    public Integer getAssigneesSize() {
        return assignees.size();
    }

    public List<String> getLabelNames() {
        return labelNames;
    }

    public void setLabelNames(List<String> labelNames) {
        this.labelNames = labelNames;
    }

    public Integer getLabelNamesSize() {
        return labelNames.size();
    }

    public String getMilestoneName() {
        return milestoneName;
    }

    public void setMilestoneName(String milestoneName) {
        this.milestoneName = milestoneName;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public int getStartIndex() {
        return startIndex;
    }

    public void setStartIndex(int startIndex) {
        this.startIndex = startIndex;
    }

    public int getCntPerPage() {
        return cntPerPage;
    }

    public void setCntPerPage(int cntPerPage) {
        this.cntPerPage = cntPerPage;
    }
}
