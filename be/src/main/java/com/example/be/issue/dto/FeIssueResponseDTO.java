package com.example.be.issue.dto;

import com.example.be.issue.Issue;
import com.example.be.label.Label;
import com.example.be.milestone.Milestone;
import com.example.be.user.User;
import com.example.be.util.Paging;

import java.util.Collection;
import java.util.List;

public class FeIssueResponseDTO {

    private List<Issue> issues;
    private CountDTO counts;
    private List<Label> allLabels;
    private List<Milestone> allMilestones;
    private List<User> allUsers;

    private Paging paging;

    public FeIssueResponseDTO(List<Issue> issues, CountDTO counts, List<Label> allLabels, List<Milestone> allMilestones, List<User> allUsers, Paging paging) {
        this.issues = issues;
        this.counts = counts;
        this.allLabels = allLabels;
        this.allMilestones = allMilestones;
        this.allUsers = allUsers;
        this.paging = paging;
    }

    public List<Issue> getIssues() {
        return issues;
    }

    public CountDTO getCounts() {
        return counts;
    }

    public List<Label> getAllLabels() {
        return allLabels;
    }

    public List<Milestone> getAllMilestones() {
        return allMilestones;
    }

    public List<User> getAllUsers() {
        return allUsers;
    }

    public Paging getPaging() {
        return paging;
    }
}
