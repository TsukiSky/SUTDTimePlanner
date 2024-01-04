package com.tsukisky.sutdtimeplannerbackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "user_id")
    private Integer Id;

    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private Boolean emailVerified = false;
    private String verificationToken;


    @ElementCollection
    private List<Integer> starCourseIds;

    @ElementCollection
    private List<Integer> enrolCourseIds;

    @ElementCollection
    private List<Integer> classesIds;



}
