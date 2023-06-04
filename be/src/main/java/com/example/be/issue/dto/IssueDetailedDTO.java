package com.example.be.issue.dto;

import com.example.be.comment.Comment;
import com.example.be.issue.Issue;

import java.util.List;

public class IssueDetailedDTO {
    public Issue issue;

    public List<Comment> comments;

    public IssueDetailedDTO() {
    }

    public IssueDetailedDTO(Issue issue, List<Comment> comments) {
        this.issue = issue;
        this.comments = comments;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
