package org.example.cloudauthsystem.controllers;

import org.example.cloudauthsystem.config.SecurityConfig;
import org.example.cloudauthsystem.models.User;
import org.example.cloudauthsystem.repositories.UserRepository;
import org.example.cloudauthsystem.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


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
            return jwtUtil.generateToken(loginRequest.getUsername());
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
    @GetMapping("/profile")
    public ResponseEntity<Map<String, String>> getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Map<String, String> profile = new HashMap<>();
            profile.put("username", userDetails.getUsername());
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "User not authenticated"));
        }
    }

}
