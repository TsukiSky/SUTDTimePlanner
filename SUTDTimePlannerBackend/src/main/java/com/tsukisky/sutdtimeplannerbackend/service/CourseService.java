package com.tsukisky.sutdtimeplannerbackend.service;

import com.tsukisky.sutdtimeplannerbackend.exception.CourseNotFoundException;
import com.tsukisky.sutdtimeplannerbackend.model.Course;
import com.tsukisky.sutdtimeplannerbackend.model.Term;
import com.tsukisky.sutdtimeplannerbackend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> findAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> findCoursesByTerm(Integer term) {
        return courseRepository.findCoursesByTerms_term(term);
    }

    public List<Course> findCoursesByName(String name) {
        return courseRepository.findCoursesByName(name);
    }

    public List<Course> findCoursesByPillar(String pillar) {
        return courseRepository.findCoursesByPillar(pillar);
    }

    public void  addCourse(Course course) {
        courseRepository.save(course);
    }

    public void addCourses(List<Course> courses) {
        for (Course course: courses) {
            addCourse(course);
        }
    }
}
