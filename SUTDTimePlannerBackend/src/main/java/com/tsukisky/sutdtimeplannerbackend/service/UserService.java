package com.tsukisky.sutdtimeplannerbackend.service;

import com.tsukisky.sutdtimeplannerbackend.model.User;
import com.tsukisky.sutdtimeplannerbackend.repository.ClassRepository;
import com.tsukisky.sutdtimeplannerbackend.repository.CourseRepository;
import com.tsukisky.sutdtimeplannerbackend.repository.UserRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Resource
    private UserRepository userRepository;
    @Resource
    private CourseRepository courseRepository;
    @Resource
    private ClassRepository classRepository;

    public boolean checkUsernameExists(String username) {
        User user = userRepository.findUserByUsername(username);
        return user != null;
    }

    public boolean checkEmailExists(String email) {
        User user = userRepository.findUserByEmail(email);
        return user != null;
    }

    public Integer addUser(User user) {
        if (checkEmailExists(user.getEmail())){
            return 1;
        } else if (checkUsernameExists(user.getUsername())) {
            return 2;
        } else {
            userRepository.save(user);
            return 0;
        }
    }

    public User checkLogin(User user) {
        User checkUser = userRepository.findUserByEmail(user.getEmail());
        if (checkUser==null) {
            return null;
        }
        if (Objects.equals(checkUser.getPassword(), user.getPassword())){
            return checkUser;
        } else {
            return null;
        }
    }

    public boolean addStarCourseToUser(String username, Integer courseId) {
        try {
            User user = userRepository.findUserByUsername(username);
            if (user.getStarCourseIds()==null){
                user.setStarCourseIds(new ArrayList<>());
            }
            if (!user.getStarCourseIds().contains(courseId)) {
                user.getStarCourseIds().add(courseId);
                userRepository.save(user);
            }

            return true;
        } catch (Exception e) {
            e.getStackTrace();
            return false;
        }
    }

    public boolean removeStarCourse(String username, Integer courseId) {
        try {
            User user = userRepository.findUserByUsername(username);
            if (user.getStarCourseIds()==null){
                user.setStarCourseIds(new ArrayList<>());
            }
            user.getStarCourseIds().remove(courseId);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.getStackTrace();
            return false;
        }
    }

    public boolean addEnrolCourseToUser(String username, Integer courseId, Integer classId) {
        try {
            User user = userRepository.findUserByUsername(username);
            if (user.getEnrolCourseIds()==null){
                user.setEnrolCourseIds(new ArrayList<>());
            }
            if (user.getClassesIds()==null) {
                user.setClassesIds(new ArrayList<>());
            }

            if (!user.getEnrolCourseIds().contains(courseId)) {
                user.getEnrolCourseIds().add(courseId);
                user.getClassesIds().add(classId);
                userRepository.save(user);
            }

            return true;
        } catch (Exception e) {
            e.getStackTrace();
            return false;
        }
    }

    public boolean dropClass(String username, List<Integer> courseIds, List<Integer> classIds) {
        try {
            User user = userRepository.findUserByUsername(username);
            if (user.getEnrolCourseIds()==null){
                user.setEnrolCourseIds(new ArrayList<>());
            }
            user.setEnrolCourseIds(user.getEnrolCourseIds().stream()
                    .filter(obj -> !courseIds.contains(obj))
                    .collect(Collectors.toList()));
            user.setClassesIds(user.getClassesIds().stream()
                    .filter(obj -> !classIds.contains(obj))
                    .collect(Collectors.toList()));
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.getStackTrace();
            return false;
        }
    }

    public boolean alterClass(String username, Integer oldClassId, Integer newClassId) {
        try {
            User user = userRepository.findUserByUsername(username);
            if (user.getClassesIds()==null){
                user.setClassesIds(new ArrayList<>());
            }
            user.getClassesIds().remove(oldClassId);
            if (!user.getClassesIds().contains(newClassId)) {
                user.getClassesIds().add(newClassId);
            }
            System.out.println(oldClassId+" "+ newClassId);
            System.out.println(user.getClassesIds());
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.getStackTrace();
            return false;
        }
    }
}
