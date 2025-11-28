package klu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import klu.model.FlightsBooking;
import klu.repository.FlightsBookingRepository;

@Service
public class FlightsBookingService {

    @Autowired
    private FlightsBookingRepository repository;

    public FlightsBooking saveBooking(FlightsBooking booking) {
        return repository.save(booking);
    }
}
