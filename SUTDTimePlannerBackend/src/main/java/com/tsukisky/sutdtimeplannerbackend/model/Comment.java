package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;
    private String content;
    private String commenter;
    private Boolean isAnonymous;
    private Date time = new Date();
}
