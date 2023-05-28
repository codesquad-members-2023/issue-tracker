package com.example.be.milestone;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MilestoneRepository extends CrudRepository<Milestone, String> {

    @Query("select name " +
            "from MILESTONE " +
            "where name = :name")
    String validateName(@Param("name") String name);
}
