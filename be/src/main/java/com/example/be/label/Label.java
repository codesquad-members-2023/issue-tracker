package com.example.be.label;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("LABEL")
public class Label implements Persistable<String>{

    @Id
    @Column("name")
    private String name;

    @Column("description")
    private String description;
    @Column("background_color")
    private String backgroundColor;
    @Column("text_color")
    private String textColor;

    @Transient
    private boolean isNew = true;

    @Override
    public String getId() {
        return name;
    }

    @Override
    public boolean isNew() {
        return isNew;
    }

    public Label createEntityForInsert() {
        isNew = true;
        return this;
    }

    public Label createEntityForUpdate() {
        isNew = false;
        return this;
    }

    public Label() {}

    public Label(String name, String description, String backgroundColor, String textColor) {
        this.name = name;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public String getTextColor() {
        return textColor;
    }

    public void setTextColor(String textColor) {
        this.textColor = textColor;
    }

}
