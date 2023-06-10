package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "slot")
public class Slot {
    @Id
    @Column(name = "slot_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer slotId;

    @Column(name = "class_id")
    private Integer classId;

    @Column(name = "type")
    private String type;

    public Slot() {}
}
