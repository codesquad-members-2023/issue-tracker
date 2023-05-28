package com.example.be.assignee;

import com.example.be.user.User;

public class Assignee {

    private Integer issueNumber;
    private User user;

    public Assignee() {
    }

    public Integer getIssueNumber() {
        return issueNumber;
    }

    public void setIssueNumber(Integer issueNumber) {
        this.issueNumber = issueNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
