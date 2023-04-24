package com.tsukisky.sutdtimeplannerbackend.repository;

import com.tsukisky.sutdtimeplannerbackend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {
    void deleteCourseByCourseId(Long id);

    Optional<Course> findCourseByCourseId(Long id);

    List<Course> findAllCourseByPillar(String pillar);


}
