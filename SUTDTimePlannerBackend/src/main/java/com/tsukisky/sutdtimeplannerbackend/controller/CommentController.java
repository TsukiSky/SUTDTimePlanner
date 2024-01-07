package com.tsukisky.sutdtimeplannerbackend.controller;

import com.tsukisky.sutdtimeplannerbackend.common.RequestUserIdCommentId;
import com.tsukisky.sutdtimeplannerbackend.service.CommentService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("comment")
@CrossOrigin("*")
public class CommentController {
    @Resource
    private CommentService commentService;
    @PostMapping("/like")
    public boolean like(@RequestBody RequestUserIdCommentId requestUserIdCommentId) {
        System.out.println(requestUserIdCommentId);
        return commentService.handleLike(requestUserIdCommentId.getUserId(), requestUserIdCommentId.getCommentId());
    }

    @PostMapping("/dislike")
    public boolean dislike(@RequestBody RequestUserIdCommentId requestUserIdCommentId) {
        return commentService.handleDislike(requestUserIdCommentId.getUserId(), requestUserIdCommentId.getCommentId());
    }

}
