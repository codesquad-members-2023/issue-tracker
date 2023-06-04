package com.example.be.issue.mapper;

import com.example.be.issue.Issue;
import com.example.be.milestone.Milestone;
import com.example.be.user.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class IssueEntityRowMapper implements RowMapper<Issue> {
    @Override
    public Issue mapRow(ResultSet rs, int rowNum) throws SQLException {
        Issue issue = new BeanPropertyRowMapper<>(Issue.class).mapRow(rs, rowNum);
        Milestone milestone = new BeanPropertyRowMapper<>(Milestone.class).mapRow(rs, rowNum);
        User user = new BeanPropertyRowMapper<>(User.class).mapRow(rs, rowNum);
        issue.setMilestone(milestone);
        issue.setUser(user);
        return issue;
    }
}
