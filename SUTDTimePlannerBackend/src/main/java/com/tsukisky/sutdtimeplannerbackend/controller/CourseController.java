package com.tsukisky.sutdtimeplannerbackend.controller;

import com.tsukisky.sutdtimeplannerbackend.common.RequestCourseIdComment;
import com.tsukisky.sutdtimeplannerbackend.dto.Course;
import com.tsukisky.sutdtimeplannerbackend.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.findAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/find/byPillar/{pillar}")
    public ResponseEntity<List<Course>> getCoursesByPillar(@PathVariable("pillar") String pillar) {
        List<Course> courses = courseService.findCoursesByPillar(pillar);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/find/byTerm/{term}")
    public ResponseEntity<List<Course>> getCoursesByTerm(@PathVariable("term") Integer termId) {
        List<Course> courses = courseService.findCoursesByTerm(termId);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/find/byName/{name}")
    public ResponseEntity<List<Course>> getCoursesByName(@PathVariable("name") String name) {
        List<Course> courses = courseService.findCoursesByName(name);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @PostMapping("/addCourse")
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        courseService.addCourse(course);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @PostMapping("/addCourses")
    public ResponseEntity<List<Course>> addCourses(@RequestBody List<Course> courses) {
        courseService.addCourses(courses);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @PostMapping("/add_comment")
    public boolean addComment(@RequestBody RequestCourseIdComment requestCourseIdComment) {
        System.out.println(requestCourseIdComment);
        return courseService.addComment(requestCourseIdComment.getUsername(), requestCourseIdComment.getContent(), requestCourseIdComment.getCourseId(), requestCourseIdComment.getIsAnonymous());
    }
}
