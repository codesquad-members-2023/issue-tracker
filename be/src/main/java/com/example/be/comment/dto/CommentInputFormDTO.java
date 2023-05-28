package com.example.be.comment.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CommentInputFormDTO {

    @NotBlank(message = "댓글을 입력해주세요.")
    @Size(max = 16777215, message = "댓글 내용의 길이는 1677,7215자를 넘을 수 없습니다.")
    private String contents;

    public CommentInputFormDTO() {
    }

    public CommentInputFormDTO(String contents) {
        this.contents = contents;
    }

    public String getContents() {
        return contents;
    }
}
