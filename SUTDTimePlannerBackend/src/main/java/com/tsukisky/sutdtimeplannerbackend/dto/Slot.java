package com.tsukisky.sutdtimeplannerbackend.dto;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Entity
@Data
@Table(name = "slot")
public class Slot {
    @Id
    @Column(name = "slot_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer slotId;

    @Column(name = "type")
    private String type;

    @Column(name = "date")
    private String date;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    public Slot() {}
}
