package com.rebu.auth.sevice;

import com.rebu.auth.dto.PhoneAuthDto;
import com.rebu.auth.dto.PhoneSendDto;
import com.rebu.auth.exception.PhoneCodeMismatchException;
import com.rebu.auth.exception.PhoneSessionNotFoundException;
import com.rebu.common.service.RedisService;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class PhoneAuthService {

    private final DefaultMessageService messageService;
    private final RedisService redisService;

    private static final String senderPhone = "01085914442";

    private String createCode() {
        int leftLimit = 48; // number '0'
        int rightLimit = 122; // alphabet 'z'
        int targetStringLength = 6;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 | i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public void sendMessage(PhoneSendDto phoneSendDto) {
        if (redisService.existData(generatePrefixedKey(phoneSendDto.getPhone(), phoneSendDto.getPurpose()))) {
            redisService.deleteData(generatePrefixedKey(phoneSendDto.getPhone(), phoneSendDto.getPurpose()));
        }
        String authCode = createCode();
        Message message = new Message();
        message.setFrom(senderPhone);
        message.setTo(phoneSendDto.getPhone());
        message.setText(authCode);
        redisService.setDataExpire(generatePrefixedKey(phoneSendDto.getPhone(), phoneSendDto.getPurpose()), authCode, 60 * 5 * 1000L);

        messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public Boolean verifyMessageCode(PhoneAuthDto phoneAuthDto) {
        String issuedCode = redisService.getData(generatePrefixedKey(phoneAuthDto.getPhone(), phoneAuthDto.getPurpose()));
        if (issuedCode == null) {
            throw new PhoneSessionNotFoundException();
        }

        if (!issuedCode.equals(phoneAuthDto.getVerifyCode())) {
            throw new PhoneCodeMismatchException();
        }
        redisService.deleteData(generatePrefixedKey(phoneAuthDto.getPhone(),  phoneAuthDto.getPurpose()));
        return true;
    }

    private String generatePrefixedKey(String phone, String purpose) {
        return "AuthCode:" + purpose + ":" + phone;
    }

}
