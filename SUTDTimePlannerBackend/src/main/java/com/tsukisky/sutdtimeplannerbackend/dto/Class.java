package com.tsukisky.sutdtimeplannerbackend.dto;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "class")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "class_id")
    private Integer classId;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "class_id", referencedColumnName = "class_id")
    private List<Slot> slots;

    // @OneToMany(cascade = CascadeType.ALL)
    // @JoinColumn(name = "class_id", referencedColumnName = "class_id")
    // private List<Lecturer> lecturers;

    public Class() {}
}
