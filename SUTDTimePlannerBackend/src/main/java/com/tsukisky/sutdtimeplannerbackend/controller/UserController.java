package com.tsukisky.sutdtimeplannerbackend.controller;

import com.tsukisky.sutdtimeplannerbackend.common.*;
import com.tsukisky.sutdtimeplannerbackend.model.User;
import com.tsukisky.sutdtimeplannerbackend.service.UserService;
import jakarta.annotation.Resource;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Resource
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> addUser(@RequestBody User user) throws MessagingException {
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

    @PostMapping("/login")
    public User login(@RequestBody User user) {
//        System.out.println(userService.checkLogin(user));
        User u = userService.checkLogin(user);
        System.out.println("u: "+ u);
        return u;
    }


    @PostMapping("/add_star_course")
    public boolean addStarCourse(@RequestBody RequestUsernameCourseId requestUsernameCourseId) {
        return userService.addStarCourseToUser(requestUsernameCourseId.getUsername(), requestUsernameCourseId.getCourseId());
    }
    @PostMapping("/add_enrol_course")
    public boolean addEnrolCourse(@RequestBody RequestUsernameCourseIdClassId requestUsernameCourseIdClassId) {
        System.out.println(requestUsernameCourseIdClassId);
        return userService.addEnrolCourseToUser(requestUsernameCourseIdClassId.getUsername(), requestUsernameCourseIdClassId.getCourseId(), requestUsernameCourseIdClassId.getClassId());
    }

    @PostMapping("/remove_star_course")
    public boolean removeStarCourse(@RequestBody RequestUsernameCourseId requestUsernameCourseId) {
        return userService.removeStarCourse(requestUsernameCourseId.getUsername(), requestUsernameCourseId.getCourseId());
    }

    @PostMapping("/drop_course")
    public boolean dropCourse(@RequestBody RequestUsernameCoursesClasses requestUsernameCoursesClasses) {
        return userService.dropClass(requestUsernameCoursesClasses.getUsername(), requestUsernameCoursesClasses.getCourseIds(), requestUsernameCoursesClasses.getClassIds());
    }

    @PostMapping("/alter_class")
    public boolean alterClass(@RequestBody RequestOldClassIdNewClassId requestOldClassIdNewClassId) {
        return userService.alterClass(requestOldClassIdNewClassId.getUsername(), requestOldClassIdNewClassId.getOldClassId(), requestOldClassIdNewClassId.getNewClassId());
    }

    @GetMapping("/verify")
    public boolean verify(@RequestParam("token") String token) {
        return userService.verifyEmail(token);
    }

}
