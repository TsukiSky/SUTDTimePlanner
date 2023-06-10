package com.tsukisky.sutdtimeplannerbackend.repository;

import com.tsukisky.sutdtimeplannerbackend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, String> {
    void deleteCourseByCourseId(String courseId);

    Optional<Course> findCourseByCourseId(String courseId);

    List<Course> findCoursesBy(String pillar);

}
