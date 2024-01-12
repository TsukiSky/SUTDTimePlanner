package com.tsukisky.sutdtimeplannerbackend.common;


import lombok.Data;

import java.util.List;

@Data
public class RequestUsernameCoursesClasses {
    private String username;
    private List<Integer> courseIds;
    private List<Integer> classIds;
}
