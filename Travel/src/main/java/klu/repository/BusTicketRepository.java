package klu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import klu.model.BusTicket;
import java.time.LocalDate;

@Repository
public interface BusTicketRepository extends JpaRepository<BusTicket, Long> {
    boolean existsBySeatNumbersAndTravelDateAndFromCityAndToCity(
        String seatNumbers, LocalDate travelDate, String fromCity, String toCity
    );
}
