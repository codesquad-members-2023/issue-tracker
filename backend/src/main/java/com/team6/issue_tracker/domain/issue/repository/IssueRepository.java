package com.team6.issue_tracker.domain.issue.repository;

import com.team6.issue_tracker.domain.issue.domain.Issue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends PagingAndSortingRepository<Issue, Long>, IssueCustomRepository {

    Integer countAllByIsDeletedFalseAndIsOpen(boolean isOpen);

    Page<Issue> findAllByIsOpenAndIsDeleted(boolean isOpen, boolean isDeleted, Pageable pageable);

    @Modifying
    @Query("UPDATE issue SET is_open = :status WHERE issue_idx IN (:issue_idx)")
    boolean updateIssuesIsOpen (@Param("status") boolean isOpen, @Param("issue_idx") List<Long> idx);

}
