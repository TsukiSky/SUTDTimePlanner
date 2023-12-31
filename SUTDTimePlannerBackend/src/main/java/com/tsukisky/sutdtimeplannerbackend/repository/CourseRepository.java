package com.tsukisky.sutdtimeplannerbackend.repository;

import com.tsukisky.sutdtimeplannerbackend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, String> {
    List<Course> findCoursesByTerms_term(Integer term);

    List<Course> findCoursesByName(String name);

    List<Course> findCoursesByPillar(String pillar);
    Course findCourseByName(String name);
    Course findCourseByCourseId(Integer id);
    List<Course> findAllByCourseIdIn(List<Integer> ids);

}
