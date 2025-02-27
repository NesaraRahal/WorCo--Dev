package com.example.UserService.config;

import com.example.UserService.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        String contextPath = request.getContextPath(); // This gives "/worco"

        // Remove "/worco" from requestURI
        String strippedURI = requestURI.replaceFirst(contextPath, "");

        logger.info("Incoming request to: {}", strippedURI);

        // Skip JWT filter for login and user registration
        if (strippedURI.equals("/login") || strippedURI.equals("/users")) {
            logger.info("Skipping JWT filter for public endpoint: {}", strippedURI);
            filterChain.doFilter(request, response);
            return;
        }

        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            logger.warn("Invalid or missing Bearer token.");
            filterChain.doFilter(request, response);
            return;
        }

        token = token.substring(7);
        try {
            String userEmail = jwtUtil.extractUsername(token);
            logger.info("Extracted Username from JWT: {}", userEmail);

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userEmail, null, null);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                logger.info("User authenticated: {}", userEmail);
            }
        } catch (Exception e) {
            logger.error("JWT validation failed: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("Invalid or expired JWT token");
            return;
        }

        filterChain.doFilter(request, response);
    }

}
