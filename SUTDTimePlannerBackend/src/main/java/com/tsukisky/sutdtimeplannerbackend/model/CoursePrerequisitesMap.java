package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "course_prerequisites_map")
public class CoursePrerequisitesMap {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Integer id;

    @Column(name = "course_id")
    private String courseId;

    @Column(name = "prerequisite_course_id")
    private String prerequisiteCourseId;

    public CoursePrerequisitesMap() {}
}
