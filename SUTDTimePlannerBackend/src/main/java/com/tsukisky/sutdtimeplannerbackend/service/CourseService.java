package com.tsukisky.sutdtimeplannerbackend.service;

import com.tsukisky.sutdtimeplannerbackend.exception.CourseNotFoundException;
import com.tsukisky.sutdtimeplannerbackend.model.Course;
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

    public Course findCourseById(Long id) throws CourseNotFoundException {
        return courseRepository.findCourseByCourseId(id).orElseThrow(() -> new CourseNotFoundException("Course with id "+ id + " was not found"));
    }

    public List<Course> findCoursesByPillar(String pillar) {
        return courseRepository.findAllCourseByPillar(pillar);
    }

    public List<Course> findAllCourses() {
        return courseRepository.findAll();
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteCourseByCourseId(id);
    }

    public void  insertCourse(Course course) {
        courseRepository.save(course);
    }
}
