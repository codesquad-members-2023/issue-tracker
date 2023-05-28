package com.example.be.milestone.dto;

import java.time.LocalDateTime;

public class MilestoneCreateFormDTO {
    private String name;

    private LocalDateTime scheduledCompletionDate;
    private String descriptionForLabel;

    public MilestoneCreateFormDTO() {}

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
