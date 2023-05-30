package com.team6.issue_tracker.domain.comment.controller;

import com.team6.issue_tracker.domain.comment.service.CommentService;
import com.team6.issue_tracker.domain.comment.domain.Comment;
import com.team6.issue_tracker.domain.comment.dto.CreateCommentRequest;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/issue/{issueIdx}")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @Operation(
            summary = "코멘트 작성",
            tags = "comment",
            description = "사용자는 코멘트를 등록할 수 있다."
    )
    @PostMapping("/comment")
    public void createComment(@PathVariable("issueIdx") Long issueIdx, CreateCommentRequest request) {
        //TODO 유효성 검증
        commentService.saveComment(Comment.newComment(request.getContents(), issueIdx, request.getWriterIdx()));
    }
}
