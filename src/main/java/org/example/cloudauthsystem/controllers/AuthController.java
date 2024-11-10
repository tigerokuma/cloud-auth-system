package org.example.cloudauthsystem.controllers;

import org.example.cloudauthsystem.config.SecurityConfig;
import org.example.cloudauthsystem.models.User;
import org.example.cloudauthsystem.repositories.UserRepository;
import org.example.cloudauthsystem.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public String authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            return "Authenticated successfully";
        } catch (AuthenticationException e) {
            return "Error: Invalid credentials";
        }
    }
    @PostMapping("/register")
    public String registerUser(@RequestBody LoginRequest loginRequest) {
        if (userRepository.findByUsername(loginRequest.getUsername()).isPresent()) {
            return "Error: Username is already taken";
        }

        // Encode the password
        String encodedPassword = passwordEncoder.encode(loginRequest.getPassword());

        // Create and save the user
        User user = new User();
        user.setUsername(loginRequest.getUsername());
        user.setPassword(encodedPassword);
        userRepository.save(user);

        return "User registered successfully";
    }


}
