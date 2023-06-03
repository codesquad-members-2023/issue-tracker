package team01.issuetracker.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team01.issuetracker.domain.Issue;

import java.util.List;
import java.util.Optional;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long> {
    Optional<Issue> findById(Long id);

    int countByIsOpen(boolean state);

    int countByIsOpenAndMilestoneId(boolean state, Long id);

    List<Issue> findAllByIsOpen(boolean state);

    List<Issue> findAll();

    @Query("SELECT DISTINCT i.id, i.WRITER_ID, i.TITLE, i.DESCRIPTION, i.IS_OPEN, i.CREATE_DATE_TIME, i.MILESTONE_ID FROM issue i" +
            "    LEFT OUTER JOIN issue_label il ON i.id = il.issue_id" +
            "    LEFT OUTER JOIN assignee a ON i.id = a.issue_id" +
            "    WHERE (:isOpen IS NULL OR i.is_open = :isOpen)" +
            "    AND ((:milestone = 0 AND i.MILESTONE_ID IS NULL) OR (:milestone is NULL OR i.MILESTONE_ID = :milestone))" +
            "    AND (:writers IS NULL OR i.writer_id = :writers)" +
            "    AND ((:assignee IS NULL OR a.MEMBER_ID in (:assignee)) OR (a.MEMBER_ID IS NULL AND :assignee = 0))" +
            "    AND ((:label IS NULL OR il.label_id in (:label)) OR (il.LABEL_ID IS NULL AND :label = 0))" +
            "    ORDER BY i.id DESC;")
    List<Issue> findAllByFilter(@Param("isOpen") Boolean isOpen,
                                @Param("milestone") Long milestone,
                                @Param("label") Long label,
                                @Param("assignee") Long assignee,
                                @Param("writers") Long writers);
}
