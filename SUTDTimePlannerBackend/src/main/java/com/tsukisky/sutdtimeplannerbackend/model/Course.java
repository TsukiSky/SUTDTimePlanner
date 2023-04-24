package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "course")
public class Course {
    public Course() {}

    public Course(Integer term, String pillar, String code, String subject, String enrolmentCategory, String link, Boolean isCore, List<Course> preRequisites, String remark) {
        this.term = term;
        this.pillar = pillar;
        this.code = code;
        this.subject = subject;
        this.enrolmentCategory = enrolmentCategory;
        this.link = link;
        this.isCore = isCore;
        this.preRequisites = preRequisites;
        this.remark = remark;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "course_id")
    private Long courseId;

    private Integer term;

    private String pillar;

    private String code;

    private String subject;

    @Column(name = "enrolment_category")
    private String enrolmentCategory;

    private String link;

    @Column(name = "is_core")
    private Boolean isCore;

    @OneToMany
    @JoinColumn(name = "pre_requisites")
    private List<Course> preRequisites;

    private String remark;


//    instructors: string[];
//    slots: Slot[];
}
