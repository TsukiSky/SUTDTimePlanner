package com.tsukisky.sutdtimeplannerbackend.dto;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;
    @Column(name = "content", length = 1000)
    private String content;
    private String commenter;
    private Boolean isAnonymous;
    private Date time = new Date();
    @ElementCollection
    private List<Integer> likes;
    @ElementCollection
    private List<Integer> dislikes;
}
