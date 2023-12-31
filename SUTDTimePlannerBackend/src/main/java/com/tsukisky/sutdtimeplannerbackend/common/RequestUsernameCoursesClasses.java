package com.tsukisky.sutdtimeplannerbackend.common;


import com.tsukisky.sutdtimeplannerbackend.model.Class;
import com.tsukisky.sutdtimeplannerbackend.model.Course;
import lombok.Data;

import java.util.List;

@Data
public class RequestUsernameCoursesClasses {
    private String username;
    private List<Integer> courseIds;
    private List<Integer> classIds;
}
