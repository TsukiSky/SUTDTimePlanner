package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private String courseId;

    @Column(name = "name")
    private String name;

    @Column(name = "pillar")
    private String pillar;

    @Column(name = "is_core")
    private Integer isCore;

    @Column(name = "link")
    private String link;

    public Course() {}

    public Course(String courseId, String name, String pillar, Integer isCore, String link) {
        courseId = courseId;
        name = name;
        pillar = pillar;
        isCore = isCore;
        link = link;
    }
}
