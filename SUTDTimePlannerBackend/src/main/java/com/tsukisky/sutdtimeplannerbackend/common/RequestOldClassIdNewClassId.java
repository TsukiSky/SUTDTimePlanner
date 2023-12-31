package com.tsukisky.sutdtimeplannerbackend.common;

import lombok.Data;

@Data
public class RequestOldClassIdNewClassId {
    private String username;
    private Integer oldClassId;
    private Integer newClassId;
}
