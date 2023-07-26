package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "course_id")
    private Integer courseId;

    @Column(name = "name")
    private String name;

    @Column(name = "pillar")
    private String pillar;

    // @Column(name = "is_core")
    // private Integer isCore;

    @Column(name = "link")
    private String link;

    @Column(name = "description")
    private String description;

//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "prerequisite", referencedColumnName = "course_id")
//    private List<Course> prerequisites;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id", referencedColumnName = "course_id")
    private List<Class> classes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id", referencedColumnName = "course_id")
    private List<Term> terms;

    public Course() {}
}
