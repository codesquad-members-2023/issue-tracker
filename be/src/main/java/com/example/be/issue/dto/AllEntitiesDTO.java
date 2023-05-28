package com.example.be.issue.dto;

import com.example.be.label.Label;
import com.example.be.milestone.Milestone;
import com.example.be.user.User;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class AllEntitiesDTO {

    private List<Label> allLabels;
    private List<Milestone> allMilestones;
    private List<User> allUsers;

    public AllEntitiesDTO(Iterable<Label> labels, Iterable<Milestone> milestones, Iterable<User> users) {
        this.allLabels = StreamSupport.stream(labels.spliterator(), false)
                .collect(Collectors.toList());
        this.allMilestones = StreamSupport.stream(milestones.spliterator(), false)
                .collect(Collectors.toList());
        this.allUsers = StreamSupport.stream(users.spliterator(), false)
                .collect(Collectors.toList());
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
