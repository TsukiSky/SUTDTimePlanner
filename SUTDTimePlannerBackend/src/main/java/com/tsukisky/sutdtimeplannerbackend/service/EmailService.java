package com.tsukisky.sutdtimeplannerbackend.service;

import jakarta.annotation.Resource;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.MailMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Resource
    private JavaMailSender javaMailSender;

    @Async
    public void sendMail(SimpleMailMessage message) {
        javaMailSender.send(message);
    }

    @Async
    public void sendMail(MimeMessage message) {
        javaMailSender.send(message);
    }

    public MimeMessage createMimeMessage() {
        return javaMailSender.createMimeMessage();
    }
}
