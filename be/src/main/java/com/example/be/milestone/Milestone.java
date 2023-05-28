package com.example.be.milestone;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("MILESTONE")
public class Milestone implements Persistable<String> {

    @Id
    private String name;

    @Column("scheduled_completion_date")
    private LocalDateTime scheduledCompletionDate;

    @Column("description_for_label")
    private String descriptionForLabel;

    @Override
    public String getId() {
        return name;
    }

    @Transient
    private boolean isNew = true;

    @Override
    public boolean isNew() {
        return isNew;
    }

    public Milestone createEntityForInsert() {
        isNew = true;
        return this;
    }

    public Milestone createEntityForUpdate() {
        isNew = false;
        return this;
    }

    public Milestone() {}

    public Milestone(String name, LocalDateTime scheduledCompletionDate, String descriptionForLabel) {
        this.name = name;
        this.scheduledCompletionDate = scheduledCompletionDate;
        this.descriptionForLabel = descriptionForLabel;
    }

    public boolean isEmpty() {
        return name == null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getScheduledCompletionDate() {
        return scheduledCompletionDate;
    }

    public void setScheduledCompletionDate(LocalDateTime scheduledCompletionDate) {
        this.scheduledCompletionDate = scheduledCompletionDate;
    }

    public String getDescriptionForLabel() {
        return descriptionForLabel;
    }

    public void setDescriptionForLabel(String descriptionForLabel) {
        this.descriptionForLabel = descriptionForLabel;
    }

}
