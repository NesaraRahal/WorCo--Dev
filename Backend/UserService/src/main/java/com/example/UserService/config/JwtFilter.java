package com.example.UserService.config;

import com.example.UserService.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = request.getHeader("Authorization"); // Get token from request header

        if (token != null && token.startsWith("Bearer ")) { // Check if token exists and starts with "Bearer "
            token = token.substring(7); // Remove "Bearer " prefix to extract actual token

            String userEmail = jwtUtil.extractUsername(token); // Extract username from token

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // If token is valid and user is not already authenticated, set authentication context
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(userEmail, null, null)
                );
            }
        }

        filterChain.doFilter(request, response); // Continue request processing
    }
}
