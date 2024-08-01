package com.rebu.auth.test;

import com.rebu.auth.sevice.LicenseNumAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LicenseNumAuthServiceTest {
    @Autowired
    private LicenseNumAuthService licenseNumAuthService;

//    @DisplayName("사업자 번호 인증")
//    @Test
//    public void LicenceNumAuthServiceTest() {
//        // given
//        LicenseNumSendDto licenseNumSendDto = new LicenseNumSendDto("2208162517");
//
//        // when
//        LicenseNumAuthResult result = licenseNumAuthService.verifyLicenceNum(licenseNumSendDto);
//
//        // then
//        assertThat(result.getShopName()).isEqualTo("피닉스");
//    }
}
