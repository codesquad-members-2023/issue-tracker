package com.example.BE.dto.show.issue.detailed;

public class SimpleAuthor {

    private String nickName;
    private String imageUrl;

    public SimpleAuthor(String nickName, String imageUrl) {
        this.nickName = nickName;
        this.imageUrl = imageUrl;
    }

    public String getNickName() {
        return nickName;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
