package com.tsukisky.sutdtimeplannerbackend.service;

import com.tsukisky.sutdtimeplannerbackend.model.Comment;
import com.tsukisky.sutdtimeplannerbackend.repository.CommentRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Resource
    private CommentRepository commentRepository;

    public boolean handleLike(Integer userId, Long commentId) {
        try {
            Comment c = commentRepository.findCommentById(commentId);
            if (c.getLikes().contains(userId)){
                c.getLikes().remove(userId);
            } else {
                c.getLikes().add(userId);
            }
            commentRepository.save(c);
            return true;
        } catch (Exception e) {
            e.getStackTrace();
            return false;
        }
    }

    public boolean handleDislike(Integer userId, Long commentId) {
        try {
            Comment c = commentRepository.findCommentById(commentId);
            if (c.getDislikes().contains(userId)){
                c.getDislikes().remove(userId);
            } else {
                c.getDislikes().add(userId);
            }
            commentRepository.save(c);
            return true;
        } catch (Exception e) {
            e.getStackTrace();
            return false;
        }
    }
}
