package com.example.be.comment;

import com.example.be.comment.mapper.CommentEntityRowMapper;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Integer> {

    @Modifying
    @Query("insert into COMMENT(contents, deleted, user_id, issue_number) values (:contents, false, :userId, :issueNumber)")
    void save(@Param("issueNumber") Integer issueNumber, @Param("userId") String userId, @Param("contents") String contents);

    @Modifying
    @Query("update COMMENT set contents = :contents where id = :commentId")
    void update( @Param("commentId") Integer commentId, @Param("contents") String contents);

    @Query(value = "select id, contents as contents, created_data , last_updated_date from COMMENT where issue_number = :issueNumber and deleted = false",
    rowMapperClass = CommentEntityRowMapper.class)
    List<Comment> findCommentByIssueNumber(Integer issueNumber);

}
