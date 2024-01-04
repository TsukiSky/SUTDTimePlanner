package com.tsukisky.sutdtimeplannerbackend.repository;

import com.tsukisky.sutdtimeplannerbackend.model.Course;
import com.tsukisky.sutdtimeplannerbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    User findUserByUsername(String username);
    User findUserByEmail(String email);

    User findUserByVerificationToken(String token);

}
