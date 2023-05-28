package com.example.be.issue.mapper;

import com.example.be.assignee.Assignee;
import com.example.be.user.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AssigneeRowMapper implements RowMapper<Assignee> {

    @Override
    public Assignee mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new BeanPropertyRowMapper<>(User.class).mapRow(rs, rowNum);
        Assignee assignee = new BeanPropertyRowMapper<>(Assignee.class).mapRow(rs, rowNum);
        assignee.setUser(user);

        return assignee;
    }
}
