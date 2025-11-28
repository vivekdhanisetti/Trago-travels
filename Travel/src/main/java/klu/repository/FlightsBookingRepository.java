package klu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import klu.model.FlightsBooking;

@Repository
public interface FlightsBookingRepository extends JpaRepository<FlightsBooking, Long> {}
