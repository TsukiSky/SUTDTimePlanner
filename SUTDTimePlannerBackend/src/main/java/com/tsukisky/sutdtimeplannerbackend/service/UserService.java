package com.tsukisky.sutdtimeplannerbackend.service;

import com.tsukisky.sutdtimeplannerbackend.model.User;
import com.tsukisky.sutdtimeplannerbackend.repository.ClassRepository;
import com.tsukisky.sutdtimeplannerbackend.repository.CourseRepository;
import com.tsukisky.sutdtimeplannerbackend.repository.UserRepository;
import jakarta.annotation.Resource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Resource
    private UserRepository userRepository;

    @Resource
    private JavaMailSender javaMailSender;

    @Value("${base_url}")
    private String BASE_URL;

    public User checkUsernameExists(String username) {
        return userRepository.findUserByUsername(username);
    }

    public User checkEmailExists(String email) {
        return userRepository.findUserByEmail(email);
    }

    public Integer addUser(User user) throws MessagingException {
        User checkUser = checkEmailExists(user.getEmail());
        if (checkUser!=null && checkUser.getEmailVerified()){
            return 1;
        } else if (checkUsernameExists(user.getUsername())!=null) {
            return 2;
        } else {
//            send email verification to user
            if (checkUser!=null) {
                String token = UUID.randomUUID().toString();
                checkUser.setVerificationToken(token);
                MimeMessage mail = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mail, true);

                helper.setTo(checkUser.getEmail());
                helper.setSubject("Email verification for SUTD time planner");
                String content = "<html><body>" +
                        "<p>Please click the button below to verify your email:</p>" +
                        "<a href='" + BASE_URL + "/user/verify?token=" + token + "' style='background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;'>Verify Email</a>" +
                        "</body></html>";
                helper.setText(content, true);
                javaMailSender.send(mail);
                System.out.println("email sent");
                userRepository.save(checkUser);

            } else {
                String token = UUID.randomUUID().toString();
                user.setVerificationToken(token);
                MimeMessage mail = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mail, true);

                helper.setTo(user.getEmail());
                helper.setSubject("Email verification for SUTD time planner");
                String content = "<html><body>" +
                        "<p>Please click the button below to verify your email:</p>" +
                        "<a href='" + BASE_URL + "/user/verify?token=" + token + "' style='background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;'>Verify Email</a>" +
                        "</body></html>";
                helper.setText(content, true);
                javaMailSender.send(mail);
                System.out.println("email sent");
                userRepository.save(user);

            }

            return 0;
        }
    }

    public User checkLogin(User user) {
        User checkUser = userRepository.findUserByEmail(user.getEmail());
        if (checkUser==null) {
            return null;
        }
        if (Objects.equals(checkUser.getPassword(), user.getPassword()) && checkUser.getEmailVerified()){
            System.out.println(checkUser.getEnrolCourseIds());
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
            System.out.println(user.getEnrolCourseIds());
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
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.getStackTrace();
            return false;
        }
    }

    public boolean verifyEmail(String token) {
        User user = userRepository.findUserByVerificationToken(token);
        if (user!=null) {
            user.setEmailVerified(true);
            userRepository.save(user);
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject("Successful email verification");
            String text = "Hi " + user.getUsername() + ", your email has been verified. Enjoy your "+
                    "journey with SUTD Time Planner!";
            mailMessage.setText(text);
            javaMailSender.send(mailMessage);
            return true;
        } else {
            return false;
        }
    }
}
