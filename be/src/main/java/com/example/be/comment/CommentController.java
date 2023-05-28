package com.example.be.comment;

import com.example.be.comment.dto.CommentInputFormDTO;
import com.example.be.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/api/issues/{issueNumber}/comments")
    public Map<String, String> addComment(@PathVariable int issueNumber, @Validated @RequestBody CommentInputFormDTO commentInputFormDTO) {
        User testUser = new User("1234", "codesquad", "BE", "mock.img");
        commentService.save(issueNumber, testUser, commentInputFormDTO);
        return Map.of("commentSave", "OK");
    }

    @PutMapping("/api/issues/{issueNumber}/comments/{commentId}")
    public Map<String, String> updateComment(@PathVariable int commentId, @Validated @RequestBody CommentInputFormDTO commentInputFormDTO) {
        commentService.update(commentId, commentInputFormDTO);
        return Map.of("commentUpdate", "OK");
    }

    @DeleteMapping("/api/issues/{issueNumber}/comments/{commentId}")
    public Map<String, String> deleteComment(@PathVariable int commentId) {
        commentService.delete(commentId);
        return Map.of("commentDelete", "OK");
    }
}
