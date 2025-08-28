package org.ntg.learn2code;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class Learn2codeApplication {
    public static void main(String[] args) {
        SpringApplication.run(Learn2codeApplication.class, args);
    }
}