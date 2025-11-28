package klu.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import klu.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<User> findByEmail(String email);


}
