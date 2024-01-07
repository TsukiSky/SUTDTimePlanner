package com.tsukisky.sutdtimeplannerbackend.repository;

import com.tsukisky.sutdtimeplannerbackend.model.Class;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRepository extends JpaRepository<Class, String> {
    Class findClassByClassId(Integer id);
    List<Class> findAllByClassIdIn(List<Integer> ids);
}
