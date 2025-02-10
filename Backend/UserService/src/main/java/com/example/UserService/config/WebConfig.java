package com.example.UserService.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow requests from your frontend (localhost:5173)
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Replace with your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Adjust the allowed methods as needed
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
