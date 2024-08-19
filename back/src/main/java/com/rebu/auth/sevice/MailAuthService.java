package com.rebu.auth.sevice;

import com.rebu.auth.dto.MailAuthDto;
import com.rebu.auth.dto.MailSendDto;
import com.rebu.auth.exception.MailCodeMismatchException;
import com.rebu.auth.exception.MailSendException;
import com.rebu.auth.exception.MailSessionNotFoundException;
import com.rebu.common.constants.RedisConstants;
import com.rebu.common.service.RedisService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MailAuthService {

    private final JavaMailSender javaMailSender;
    private final RedisService redisService;
    private final ResourceLoader resourceLoader;
    private static final String senderEmail = "rebu.glodenratio@gmail.com";

    private String createCode() {
        int leftLimit = 48;
        int rightLimit = 122;
        int targetStringLength = 6;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 | i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    private String getHtmlTemplate(String purpose) {
        String filePath = "classpath:/email/form/" + purpose + ".html";
        Resource resource = resourceLoader.getResource(filePath);

        try (var inputStream = resource.getInputStream()) {
            return new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                    .lines()
                    .collect(Collectors.joining("\n"));
        } catch (IOException e) {
            throw new MailSendException();
        }
    }

    private String setContext(String htmlTemplate, String code) {
        return htmlTemplate.replace("{{authCode}}", code);
    }

    private MimeMessage createEmailForm(String email, String purpose)  {
        String authCode = createCode();
        String htmlTemplate = getHtmlTemplate(purpose);
        String emailContent = setContext(htmlTemplate, authCode);

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            message.addRecipients(MimeMessage.RecipientType.TO, email);
            message.setSubject("REBU 인증번호");
            message.setFrom(senderEmail);
            message.setText(emailContent, "utf-8", "html");
            redisService.setDataExpire(generatePrefixedKey(email, purpose), authCode, 60 * 5 * 1000L);
            return message;
        } catch (Exception e) {
            throw new MailSendException();
        }
    }

    public void sendMail(MailSendDto mailSendDto) {

        if (redisService.existData(generatePrefixedKey(mailSendDto.getEmail(), mailSendDto.getPurpose()))) {
            redisService.deleteData(generatePrefixedKey(mailSendDto.getEmail(), mailSendDto.getPurpose()));
        }
        MimeMessage emailForm = createEmailForm(mailSendDto.getEmail(), mailSendDto.getPurpose());
        javaMailSender.send(emailForm);
    }

    public Boolean verifyEmailCode(MailAuthDto mailAuthDto) {
        String issuedCode = redisService.getData(generatePrefixedKey(mailAuthDto.getEmail(), mailAuthDto.getPurpose()));
        if (issuedCode == null) {
            throw new MailSessionNotFoundException();
        }

        if (!issuedCode.equals(mailAuthDto.getVerifyCode())) {
            throw new MailCodeMismatchException();
        }
        redisService.deleteData(generatePrefixedKey(mailAuthDto.getEmail(), mailAuthDto.getPurpose()));
        return true;
    }

    private String generatePrefixedKey(String email, String purpose) {
        return RedisConstants.AUTH_CODE + purpose + ":" + email;
    }

}
