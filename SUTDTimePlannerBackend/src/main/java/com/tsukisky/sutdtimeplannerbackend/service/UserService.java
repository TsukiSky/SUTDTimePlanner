package com.tsukisky.sutdtimeplannerbackend.service;

import com.tsukisky.sutdtimeplannerbackend.model.Course;
import com.tsukisky.sutdtimeplannerbackend.model.User;
import com.tsukisky.sutdtimeplannerbackend.repository.CourseRepository;
import com.tsukisky.sutdtimeplannerbackend.repository.UserRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {
    @Resource
    private UserRepository userRepository;
    @Resource
    private CourseRepository courseRepository;

    public List<Course> getCoursesByUsername(String username) {
        User user = userRepository.findUserByUsername(username);
        return user.getCourses();
    }

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
            return user;
        } else {
            return null;
        }
    }

    public boolean addCourseToUser(String username, String courseName) {
        try {
            User user = userRepository.findUserByUsername(username);
            Course course = courseRepository.findCourseByName(courseName);
            if (user.getCourses()==null){
                user.setCourses(new ArrayList<>());
            }
            user.getCourses().add(course);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.getStackTrace();
            return false;
        }

    }
}
