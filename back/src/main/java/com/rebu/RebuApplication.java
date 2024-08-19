package com.rebu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@EnableJpaAuditing
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 900)
@SpringBootApplication
public class RebuApplication {

	public static void main(String[] args) {
		SpringApplication.run(RebuApplication.class, args);
	}

}
