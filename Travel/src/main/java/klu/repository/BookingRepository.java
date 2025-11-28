package klu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import klu.model.Booking;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByEmail(String email);

  Optional<Booking> findByEmailAndTrainNameAndTravelDate(String email, String trainName, String travelDate);
}