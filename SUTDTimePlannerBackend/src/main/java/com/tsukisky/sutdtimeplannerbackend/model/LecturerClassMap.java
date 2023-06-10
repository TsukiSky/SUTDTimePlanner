package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "lecturer_class_map")
public class LecturerClassMap {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Integer id;

    @Column(name = "lecturer_id")
    private Integer lecturerId;

    @Column(name = "class_id")
    private Integer classId;
}
