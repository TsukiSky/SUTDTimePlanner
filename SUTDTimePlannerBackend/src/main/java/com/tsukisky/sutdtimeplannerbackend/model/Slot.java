package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Slot {
    @Id
    private Long id;
    private String type;
    private String date;
    private Long courseId;
    private Integer timeHour;
    private Integer timeMinute;
}
