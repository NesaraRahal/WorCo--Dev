package com.example.UserService.service;

import com.example.UserService.data.User;
import com.example.UserService.data.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepo;

    @InjectMocks  // Fix: Correct annotation to inject mocked dependencies
    private UserService userServ;

    private User user1, user2;

    @BeforeEach
    void setup() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        user1 = new User(
                1,
                "John",
                "Doe",
                "John Doe",
                "john.d@ample.com",
                "hashed_password_here",
                User.UserType.User,
                LocalDateTime.parse("2025-02-06 19:30:45", formatter)
        );

        user2 = new User(
                2,
                "Jane",
                "Smith",
                "Jane Smith",
                "jane.s@ample.com",
                "another_hashed_password",
                User.UserType.Worker,
                LocalDateTime.parse("2025-02-06 19:35:00", formatter)
        );
    }

    @Test
    void testRegisterUser() {  // Fix: Renamed to follow naming conventions
        when(userRepo.save(user1)).thenReturn(user1);

        User savedUser = userServ.registerUser(user1);

        assertNotNull(savedUser);
        assertEquals(1, savedUser.getId());
    }
}
