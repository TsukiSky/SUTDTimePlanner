package com.tsukisky.sutdtimeplannerbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "term")
public class Term {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "term_id")
    private Integer term_id;

    @Column(name = "period")
    private String period;
}
