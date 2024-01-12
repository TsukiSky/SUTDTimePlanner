package com.tsukisky.sutdtimeplannerbackend.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "term")
public class Term {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Integer id;

    @Column(name = "term")
    private Integer term;

    @Column(name = "period")
    private String period;
}
