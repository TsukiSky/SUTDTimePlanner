package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.io.Serializable;

@Entity
public class test implements Serializable {
    @Id
    private Long id;
    private String name;
}
