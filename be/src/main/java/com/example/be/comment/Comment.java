package com.example.be.comment;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("COMMENT")
public class Comment {

    @Id
    private Integer id;

    private String contents;
    private LocalDateTime createdData;
    private LocalDateTime lastUpdatedDate;
    private boolean deleted;

    public int getId() {
        return id;
    }

    public String getContents() {
        return contents;
    }

    public LocalDateTime getCreatedData() {
        return createdData;
    }

    public LocalDateTime getLastUpdatedDate() {
        return lastUpdatedDate;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public void setCreatedData(LocalDateTime createdData) {
        this.createdData = createdData;
    }

    public void setLastUpdatedDate(LocalDateTime lastUpdatedDate) {
        this.lastUpdatedDate = lastUpdatedDate;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
