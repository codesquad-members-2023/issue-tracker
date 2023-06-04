package com.example.be.issue;

import com.example.be.assignee.Assignee;
import com.example.be.issue.dto.CountDTO;
import com.example.be.issue.dto.IssueNumberWithLabelDTO;
import com.example.be.issue.mapper.AssigneeRowMapper;
import com.example.be.issue.mapper.CountRowMapper;
import com.example.be.issue.mapper.IssueEntityRowMapper;
import com.example.be.issue.mapper.IssueLabelMapRowMapper;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface IssueRepository extends CrudRepository<Issue, Integer>, IssueRepositoryCustom {
    
    @Query(value = "select I.number as number, I.title as title, I.contents as contents, I.state as state, I.created_date as created_date, I.last_updated_date as last_updated_date " +
            ",M.name as name, M.description_for_label as description_for_label, M.scheduled_completion_date as scheduled_completion_date, " +
            "U.id as id, U.nickname as nickname, U.img_url as img_url " +
            "from ISSUE I " +
            "left join MILESTONE M on M.name = I.milestone_name " +
            "inner join USER U on I.user_id = U.id " +
            "where I.number = :issueNumber ",
            rowMapperClass = IssueEntityRowMapper.class)
    Issue findIssueByIssueNumber(Integer issueNumber);

    @Query(value = "select ir.issue_number, l.name, l.description, l.background_color, l.text_color " +
            "from ISSUE_LABEL_RELATION ir " +
            "left outer join LABEL l on ir.label_name = l.name " +
            "where ir.issue_number in (:issueNumbers)",
            rowMapperClass = IssueLabelMapRowMapper.class)
    List<IssueNumberWithLabelDTO> findIssueLabelMapsBy(@Param("issueNumbers") Set<Integer> issueNumbers);

    @Query(value = "select a.issue_number, u.id, u.password, u.nickname, u.img_url " +
            "from ASSIGNS a " +
            "left join USER u on a.user_id = u.id " +
            "where a.issue_number in (:issueNumbers)",
            rowMapperClass = AssigneeRowMapper.class)
    List<Assignee> findAssigneesBy(@Param("issueNumbers") Set<Integer> issueNumbers);

    @Query(value = "select " +
            "(select count(number) from ISSUE where state=true) as openedIssuesCount, " +
            "(select count(number) from ISSUE where state=false) as closedIssuesCount",
            rowMapperClass = CountRowMapper.class)
    CountDTO countEntities();
}
