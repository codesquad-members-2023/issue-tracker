package com.example.BE.dto.show.issue.detailed;

public class SimpleLabel {

    private String name;
    private String textColor;
    private String backgroundColor;

    public SimpleLabel(String name, String textColor, String backgroundColor) {
        this.name = name;
        this.textColor = textColor;
        this.backgroundColor = backgroundColor;
    }

    public String getName() {
        return name;
    }

    public String getTextColor() {
        return textColor;
    }

    public String getBackgroundColor() {
        return backgroundColor;
    }
}
