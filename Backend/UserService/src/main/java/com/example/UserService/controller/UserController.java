package com.example.UserService.controller;

import com.example.UserService.data.User;
import com.example.UserService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Replace with your frontend URL
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/users")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        // Handle the registration logic here
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest){
        User user = userService.getUserByEmail(loginRequest.getEmail());


        if(user == null || !userService.checkPassword(loginRequest.getPasswordHash(), user.getPasswordHash())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


}
