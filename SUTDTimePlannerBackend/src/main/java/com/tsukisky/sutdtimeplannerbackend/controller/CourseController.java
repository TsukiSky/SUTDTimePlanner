package com.tsukisky.sutdtimeplannerbackend.controller;

import com.tsukisky.sutdtimeplannerbackend.exception.CourseNotFoundException;
import com.tsukisky.sutdtimeplannerbackend.model.Course;
import com.tsukisky.sutdtimeplannerbackend.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.findAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/find/{courseId}")
    public ResponseEntity<Course> getCourseByCourseId(@PathVariable("courseId") String courseId) throws CourseNotFoundException {
        Course course = courseService.findCourseByCourseId(courseId);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

//    @GetMapping("/find/{pillar}")
//    public ResponseEntity<List<Course>> getCourseByPillar(@PathVariable("pillar") String pillar) {
//        List<Course> course = courseService.(pillar);
//        return new ResponseEntity<>(course, HttpStatus.OK);
//    }

    @PostMapping("/addCourse")
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        courseService.insertCourse(course);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }
}
