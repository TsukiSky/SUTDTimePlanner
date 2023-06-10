package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "course_term_map")
public class CourseTermMap {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "term")
    private Integer term;

    @Column(name = "course_id")
    private String courseId;

    public CourseTermMap() {}
}
