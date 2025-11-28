package klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import klu.model.User;
import klu.repository.UserRepository;
import klu.service.UserService;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already exists!";
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already exists!";
        }

        userRepository.save(user);
        return "Signup successful!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        // ✅ findByEmail() returns Optional<User>
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            // Check password
            if (existingUser.get().getPassword().equals(user.getPassword())) {
                return "Login successful!";
            } else {
                return "Invalid email or password!";
            }
        } else {
            return "Invalid email or password!";
        }
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        return userService.sendOtp(email);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        return userService.verifyOtp(email, otp);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");
        return userService.resetPassword(email, newPassword);
    }

}
