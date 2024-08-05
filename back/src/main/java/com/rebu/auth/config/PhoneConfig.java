package com.rebu.auth.config;

import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PhoneConfig {
    @Value("${sms.api.key}")
    private String apiKey;
    @Value("${sms.api.secret}")
    private String apiSecret;
    @Value("${sms.api.url}")
    private String url;

    @Bean
    public DefaultMessageService messageService() {
        return new DefaultMessageService(apiKey, apiSecret, url);
    }
}
