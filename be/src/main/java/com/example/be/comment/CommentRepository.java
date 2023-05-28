package com.example.be.comment;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends CrudRepository<Comment, Integer> {

    @Modifying
    @Query("insert into COMMENT(contents, deleted, user_id, issue_number) values (:contents, false, :userId, :issueNumber)")
    void save(@Param("issueNumber") Integer issueNumber, @Param("userId") String userId, @Param("contents") String contents);

    @Modifying
    @Query("update COMMENT set contents = :contents where id = :commentId")
    void update( @Param("commentId") Integer commentId, @Param("contents") String contents);
}
