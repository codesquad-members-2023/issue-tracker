package com.issuetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Column;

@Data
@AllArgsConstructor
public class IssueLabelDto {
    @Column("labelId")
    private int labelId;
    @Column("labelName")
    private String labelName;
    @Column("backgroundColor")
    private String backgroundColor;
    @Column("fontColor")
    private String fontColor;
}
