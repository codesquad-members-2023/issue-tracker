package com.example.BE.issue;

import com.example.BE.issue.dto.Count;
import com.example.BE.issue.dto.IssueLabelMap;
import com.example.BE.mapper.CountRowMapper;
import com.example.BE.mapper.IssueLabelMapRowMapper;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface IssueRepository extends CrudRepository<Issue, Integer>, IssueRepositoryCustom {

    @Query(value = "select ir.issue_number, l.name, l.description, l.background_color, l.text_color " +
            "from ISSUE_LABEL_RELATION ir " +
            "left outer join LABEL l on ir.label_name = l.name " +
            "where ir.issue_number in (:issueNumbers)",
            rowMapperClass = IssueLabelMapRowMapper.class)
    List<IssueLabelMap> findAllIssueLabelMap(@Param("issueNumbers") Set<Integer> issueNumbers);

    @Query(value = "select " +
            "(select count(number) from ISSUE where state=true) as openedIssuesCount, " +
            "(select count(number) from ISSUE where state=false) as closedIssuesCount, " +
            "(select count(name) from LABEL) as labelsCount, " +
            "(select count(name) from MILESTONE) as milestoneCount",
            rowMapperClass = CountRowMapper.class)
    Count countEntities();
}
