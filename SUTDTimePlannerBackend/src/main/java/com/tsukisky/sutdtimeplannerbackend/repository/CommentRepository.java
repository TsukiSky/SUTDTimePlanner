package com.tsukisky.sutdtimeplannerbackend.repository;

import com.tsukisky.sutdtimeplannerbackend.dto.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, String> {
    public Comment findCommentById(Long id);
}
