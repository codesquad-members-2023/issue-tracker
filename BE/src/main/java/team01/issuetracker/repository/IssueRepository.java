package team01.issuetracker.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import team01.issuetracker.domain.Issue;

import java.util.List;

public interface IssueRepository extends CrudRepository<Issue, Long> {

    long countByIsOpen(boolean state);

    List<Issue> findAllByIsOpen(boolean state);

    List<Issue> findAll();

    @Query("select * from issue where milestone_id = :id")
    List<Issue> findByMilestone(Long id);

    //TODO : 마일스톤 선택
}
