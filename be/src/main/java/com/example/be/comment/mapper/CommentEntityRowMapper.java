package com.example.be.comment.mapper;

import com.example.be.comment.Comment;
import com.example.be.issue.Issue;
import com.example.be.milestone.Milestone;
import com.example.be.user.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CommentEntityRowMapper implements RowMapper<Comment> {
    @Override
    public Comment mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new BeanPropertyRowMapper<>(Comment.class).mapRow(rs, rowNum);
    }
}
