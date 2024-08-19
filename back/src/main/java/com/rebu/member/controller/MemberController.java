package com.rebu.member.controller;

import com.rebu.auth.exception.EmailNotVerifiedException;
import com.rebu.auth.exception.PasswordNotVerifiedException;
import com.rebu.auth.exception.PhoneNotVerifiedException;
import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.constants.RedisSessionConstants;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.member.controller.dto.MemberJoinRequest;
import com.rebu.member.controller.dto.ChangePasswordRequest;
import com.rebu.member.dto.FindEmailDto;
import com.rebu.member.service.MemberService;
import com.rebu.member.validation.annotation.Email;
import com.rebu.member.validation.annotation.EmailCheckPurpose;
import com.rebu.member.validation.annotation.Name;
import com.rebu.profile.enums.Type;
import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.profile.validation.annotation.Phone;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<?> join(@Valid @RequestBody MemberJoinRequest memberJoinRequest,
                                  HttpSession session) {
        memberService.join(memberJoinRequest.toMemberJoinDto(), memberJoinRequest.toProfileGenerateDto(), session);
        session.invalidate();
        return ResponseEntity.ok(new ApiResponse<>("1B00", null));
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@Email @RequestParam String email,
                                        @EmailCheckPurpose @RequestParam String purpose,
                                        HttpSession session) {
        Boolean isExist = memberService.checkEmailDuplicated(email);
        if (!isExist) {
            session.setAttribute(RedisSessionConstants.CHECK_EMAIL + purpose, email);
        }
        return ResponseEntity.ok(new ApiResponse<>("1B01", isExist));
    }

    @PatchMapping("/{email}/password")
    public ResponseEntity<?> changePassword(@PathVariable String email,
                                            @Valid @RequestBody ChangePasswordRequest changePasswordRequest,
                                            @SessionAttribute(name = RedisSessionConstants.AUTH_EMAIL + "changePassword", required = false) String authEmail) {
        if (authEmail == null || !authEmail.equals(email)) {
            throw new EmailNotVerifiedException();
        }
        memberService.changePassword(changePasswordRequest.toDto(email));
        return ResponseEntity.ok(new ApiResponse<>("1B02", null));
    }

    @GetMapping("/find-email")
    public ResponseEntity<?> findEmail(@Name @RequestParam String name,
                                       @Phone @RequestParam String phone,
                                       @SessionAttribute(name = RedisSessionConstants.AUTH_PHONE + "findEmail", required = false) String authPhone) {
        if (authPhone == null || !authPhone.equals(phone)) {
            throw new PhoneNotVerifiedException();
        }
        String email = memberService.findEmail(new FindEmailDto(name, phone));
        return ResponseEntity.ok(new ApiResponse<>("1B03", email));
    }

    @Authorized(allowed = Type.COMMON)
    @DeleteMapping
    public ResponseEntity<?> delete(@Nickname @RequestParam String nickname,
                                    @SessionAttribute(name = RedisSessionConstants.AUTH_PASSWORD + "withdrawal", required = false) String authPassword) {
        if (authPassword == null || !authPassword.equals(nickname)) {
            throw new PasswordNotVerifiedException();
        }
        memberService.withdraw(nickname);
        return ResponseEntity.ok(new ApiResponse<>("1B04", null));
    }
}
