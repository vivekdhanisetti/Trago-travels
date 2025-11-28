package klu.service;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import klu.model.User;
import klu.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender; // for sending OTP emails

    // Store OTP temporarily in memory
    private Map<String, String> otpStorage = new HashMap<>();

    /** Step 1: Send OTP to user's email **/
    public ResponseEntity<String> sendOtp(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("Email not found!");
        }

        String otp = generateOtp();
        otpStorage.put(email, otp);

        // send email
        sendEmail(email, "Password Reset OTP", "Your OTP is: " + otp);

        return ResponseEntity.ok("OTP sent to email!");
    }

    /** Step 2: Verify OTP **/
    public ResponseEntity<String> verifyOtp(String email, String otp) {
        String storedOtp = otpStorage.get(email);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email); // remove after successful verification
            return ResponseEntity.ok("OTP verified");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired OTP");
        }
    }

    /** Step 3: Reset Password **/
    public ResponseEntity<String> resetPassword(String email, String newPassword) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(newPassword); // ideally, hash password
            userRepository.save(user);
            return ResponseEntity.ok("Password reset successful!");
        } else {
            return ResponseEntity.badRequest().body("Email not found!");
        }
    }

    /** Utility: Generate 6-digit OTP **/
    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    /** Utility: Send email **/
    /** Utility: Send email **/
    private void sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("manideepbalabhaadruni@gmail.com"); // ✅ specify sender
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            mailSender.send(message);

            System.out.println("✅ Mail sent successfully to: " + to);
        } catch (Exception e) {
            System.out.println("❌ Mail sending failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
