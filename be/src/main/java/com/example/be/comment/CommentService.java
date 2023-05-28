package com.example.be.comment;

import com.example.be.comment.dto.CommentInputFormDTO;
import com.example.be.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public void save(int issueNumber, User user, CommentInputFormDTO commentInputFormDTO) {
        commentRepository.save(issueNumber, user.getId(), commentInputFormDTO.getContents());
    }

    public void update(int commentId, CommentInputFormDTO commentInputFormDTO) {
        commentRepository.update(commentId, commentInputFormDTO.getContents());
    }

    public void delete(int commentId) {
        commentRepository.deleteById(commentId);
    }
}
