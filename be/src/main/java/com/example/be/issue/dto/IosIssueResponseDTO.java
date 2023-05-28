package com.example.be.issue.dto;

import com.example.be.issue.Issue;
import com.example.be.util.Paging;

import java.util.Collection;

public class IosIssueResponseDTO {

    private Collection<Issue> issues;

    private Paging paging;

    public IosIssueResponseDTO(Collection<Issue> issues, Paging paging) {
        this.issues = issues;
        this.paging = paging;
    }

    public Collection<Issue> getIssues() {
        return issues;
    }

    public Paging getPaging() { return paging;}

}
