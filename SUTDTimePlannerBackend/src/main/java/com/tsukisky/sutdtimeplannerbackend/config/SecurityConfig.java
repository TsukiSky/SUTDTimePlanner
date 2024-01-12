package com.tsukisky.sutdtimeplannerbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF protection
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests.anyRequest().permitAll() // Permit all requests without authentication
                )
                .httpBasic().disable(); // Disable HTTP Basic Authentication

        return http.build();
    }
}