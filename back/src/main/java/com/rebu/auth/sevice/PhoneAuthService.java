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

    private static final String PREFIX = "PhoneAuth:";
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
        if (redisService.existData(generatePrefixedKey(phoneSendDto.getPhone()))) {
            redisService.deleteData(generatePrefixedKey(phoneSendDto.getPhone()));
        }
        String authCode = createCode();
        Message message = new Message();
        message.setFrom(senderPhone);
        message.setTo(phoneSendDto.getPhone());
        message.setText(authCode);
        redisService.setDataExpire(generatePrefixedKey(phoneSendDto.getPhone()), authCode, 60 * 5 * 1000L);

        messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public Boolean verifyMessageCode(PhoneAuthDto phoneAuthDto) {
        String issuedCode = redisService.getData(generatePrefixedKey(phoneAuthDto.getPhone()));
        if (issuedCode == null) {
            throw new PhoneSessionNotFoundException();
        }

        if (!issuedCode.equals(phoneAuthDto.getVerifyCode())) {
            throw new PhoneCodeMismatchException();
        }
        redisService.deleteData(generatePrefixedKey(phoneAuthDto.getPhone()));

        redisService.setDataExpire(generateForAuthKey(phoneAuthDto), "sucess", 60 * 15 * 1000L);
        return true;
    }

    public Boolean checkPhoneAuthState(String purpose, String phone) {
        String key = purpose + ":PhoneAuth:" + phone;
        return redisService.existData(key);
    }

    private String generatePrefixedKey(String key) {
        return PREFIX + key;
    }

    private String generateForAuthKey(PhoneAuthDto phoneAuthDto) {
        return phoneAuthDto.getPurpose() + ":PhoneAuth:" + phoneAuthDto.getPhone();
    }
}
