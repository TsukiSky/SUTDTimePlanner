package com.tsukisky.sutdtimeplannerbackend.common;

import lombok.Data;

@Data
public class RequestUsernameCourseIdClassId {
    String username;
    Integer courseId;
    Integer classId;
}
