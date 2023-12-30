package com.tsukisky.sutdtimeplannerbackend.controller;

import com.tsukisky.sutdtimeplannerbackend.common.RequestUsernameCourseName;
import com.tsukisky.sutdtimeplannerbackend.model.Course;
import com.tsukisky.sutdtimeplannerbackend.model.User;
import com.tsukisky.sutdtimeplannerbackend.service.UserService;
import jakarta.annotation.Resource;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/user")
@CrossOrigin
public class UseController {
    @Resource
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        System.out.println(user);
        int success = userService.addUser(user);
        if (success==0) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else if (success==1) {
            return new ResponseEntity<>("The email has exists", HttpStatus.CONFLICT);
        } else if (success==2) {
            return new ResponseEntity<>("The username has exists", HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>("unknown error", HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PostMapping("login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User checkUser = userService.checkLogin(user);
        if (checkUser!=null) {
            return new ResponseEntity<>(checkUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null,HttpStatus.OK);
        }
    }

    @PostMapping("/get_course")
    public List<Course> getCourses(@RequestBody String username) {
        return userService.getCoursesByUsername(username);
    }

    @PostMapping("add_course")
    public boolean addCourse(@RequestBody RequestUsernameCourseName requestUsernameCourseName) {
        return userService.addCourseToUser(requestUsernameCourseName.getUsername(), requestUsernameCourseName.getCourseName());
    }

}
