package com.example.be.issue;

import com.example.be.assignee.Assignee;
import com.example.be.issue.dto.IssueNumberWithLabelDTO;
import com.example.be.label.Label;
import com.example.be.milestone.Milestone;
import com.example.be.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table("ISSUE")
public class Issue {

    @Id
    private Integer number;

    private String title;
    private String contents;
    private boolean state;
    private LocalDateTime createdDate;
    private LocalDateTime lastUpdatedDate;
    private Milestone milestone;
    private User user;
    private List<Label> labels = new ArrayList<>();
    private List<User> assignees = new ArrayList<>();

    public Issue() {
    }

    public Issue(Integer number, String title, String contents, boolean state, LocalDateTime createdDate, LocalDateTime lastUpdatedDate, Milestone milestone, User user) {
        this.number = number;
        this.title = title;
        this.contents = contents;
        this.state = state;
        this.createdDate = createdDate;
        this.lastUpdatedDate = lastUpdatedDate;
        this.milestone = milestone;
        this.user = user;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
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

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getLastUpdatedDate() {
        return lastUpdatedDate;
    }

    public void setLastUpdatedDate(LocalDateTime lastUpdatedDate) {
        this.lastUpdatedDate = lastUpdatedDate;
    }

    public Milestone getMilestone() {
        return milestone;
    }

    public void setMilestone(Milestone milestone) {
        this.milestone = milestone;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Label> getLabels() {
        return labels;
    }

    public void setLabels(List<Label> labels) {
        this.labels = labels;
    }

    public void add(IssueNumberWithLabelDTO issueLabel) {
        this.labels.add(issueLabel.getLabel());
    }

    public List<User> getAssignees() {
        return assignees;
    }

    public void setAssignees(List<User> assignees) {
        this.assignees = assignees;
    }

    public void add(Assignee assignee) {
        this.assignees.add(assignee.getUser());
    }
}
