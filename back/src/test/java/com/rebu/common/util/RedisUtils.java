package com.rebu.common.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisUtils {
    private final StringRedisTemplate template;

    public String getData(String key) {
        ValueOperations<String, String> ops = template.opsForValue();
        return ops.get(key);
    }

    public boolean existData(String key) {
        return Boolean.TRUE.equals(template.hasKey(key));
    }

    public void setDataExpire(String key, String value, long duration) {
        ValueOperations<String, String> ops = template.opsForValue();
        Duration expireDuration = Duration.ofMillis(duration);
        ops.set(key, value, expireDuration);
    }

    public void deleteData(String key) {
        template.delete(key);
    }
}
