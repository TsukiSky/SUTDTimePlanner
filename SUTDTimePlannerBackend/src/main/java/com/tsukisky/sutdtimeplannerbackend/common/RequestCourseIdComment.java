package com.tsukisky.sutdtimeplannerbackend.common;

import lombok.Data;

@Data
public class RequestCourseIdComment {
    String username;
    String content;
    Integer courseId;
    Boolean isAnonymous;
}
