package com.example.be.issue.dto;

import com.example.be.label.Label;
import com.example.be.milestone.Milestone;
import com.example.be.user.User;

import java.util.List;

public class AllLabelsAndMilestonesAndUsersDTO {

    private List<Label> allLabels;
    private List<Milestone> allMilestones;
    private List<User> allUsers;

    public AllLabelsAndMilestonesAndUsersDTO(Iterable<Label> labels, Iterable<Milestone> milestones, Iterable<User> users) {
        this.allLabels = (List<Label>) labels;
        this.allMilestones = (List<Milestone>) milestones;
        this.allUsers = (List<User>) users;
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
}
